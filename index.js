'use strict';

const
  path = require('path'),
  fs = require('fs')

module.exports = (configDirectory, environment) => {   

  const fullConfig = _crawlConfigDirectory(configDirectory)

  if(environment) {
    if(fullConfig.hasOwnProperty(environment)) {
      return fullConfig[environment]
    } else {
      throw `Environment was not found: ${environment}`
    }
  } else {
    return (env) => (fullConfig[env])
  }

  function _crawlConfigDirectory(directory) {
    return fs.readdirSync(directory).reduce((accumulator, current) => {
      const currentPath = path.join(directory, current)
      const fileStat = fs.lstatSync(currentPath)
      if(fileStat.isDirectory()) {
        accumulator[current] = _crawlConfigDirectory(currentPath)
      } else if (fileStat.isFile() && _isJsonFile(current)) {
        const propertyName = path.basename(current, path.extname(current))
        const content = fs.readFileSync(currentPath).toString()
        accumulator[propertyName] = JSON.parse(content)
      }
      return accumulator
    }, {})
  }

  function _isJsonFile(filePath) {
    return path.extname(filePath) === '.json'
  }
}