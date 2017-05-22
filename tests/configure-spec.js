'use strict'

const 
  path = require('path'),
  configure = require('../')

const exampleConfigDirectory = './tests/fixtures'

describe('config directory reader', () => {

  it('reads all configs from directory', () => {

    const config = configure(null, exampleConfigDirectory)

    const expected = {
      env1: {
        data: {
          record: {
            uri: 'xyz'
          }
        },
        service: {
          port: 3000
        }
      }, 
      env2: {}
    }

    expect(config).toEqual(expected)
  })

  it('returns only requested environment config', () => {
    const config = configure('env1', exampleConfigDirectory)

    const env1 = {
      data: {
        record: {
          uri: 'xyz'
        }
      },
      service: {
        port: 3000
      }
    }

    expect(config).toEqual(env1)
  })

  it('throws if trying to access environment that does not exist', () => {
    
    expect(() => configure('env3', exampleConfigDirectory))
      .toThrow(jasmine.stringMatching(/env3/))
  })

})