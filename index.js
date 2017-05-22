'use strict';

const
  path = require('path'),
  fs = require('fs')

module.exports = (environment, configDirectory = __dirname) => {   

  const fullConfig = _crawlConfigDirectory(configDirectory)

  if(environment) {
    if(fullConfig.hasOwnProperty(environment)) {
      return fullConfig[environment]
    } else {
      throw `Environment was not found: ${environment}`
    }
  } else {
    return fullConfig
  }

  function _crawlConfigDirectory(directory) {
    return fs.readdirSync(directory).reduce((accumulator, current) => {
      const currentPath = path.join(directory, current)
      const fileStat = fs.lstatSync(currentPath)
      if(fileStat.isDirectory()) {
        accumulator[current] = _crawlConfigDirectory(currentPath)
      } else if (fileStat.isFile()) {
        const propertyName = path.basename(current, path.extname(current))
        accumulator[propertyName] = require(currentPath)
      }
      return accumulator
    }, {})
  }
}