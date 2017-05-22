'use strict'

const 
  path = require('path'),
  configure = require('../')

const exampleConfigDirectory = './tests/fixtures'

describe('config directory reader', () => {

  it('returns only requested environment config', () => {
    const config = configure(exampleConfigDirectory, 'env1')

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
    
    expect(() => configure(exampleConfigDirectory, 'env3'))
      .toThrow(jasmine.stringMatching(/env3/))
  })

  it('allows partial application', () => {

    const config = configure(exampleConfigDirectory)

    const expected = {
      data: {
        record: {
          uri: 'xyz'
        }
      },
      service: {
        port: 3000
      }
    }

    expect(config).toEqual(jasmine.any(Function))
    expect(config('env1')).toEqual(expected)
    expect(config('env2')).toEqual({})
  })

})