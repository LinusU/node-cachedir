var os = require('os')
var env = process.env

var implementation

switch (os.type()) {
  case 'Darwin':
    implementation = function (id) {
      return env.HOME + '/Library/Caches/' + id
    }
    break
  case 'Linux':
    implementation = function (id) {
      return env.HOME + '/.cache/' + id
    }
    break
  default:
    throw new Error('Your OS is currently not supported by node-cachedir.')
}

module.exports = function (id) {
  if (typeof id !== 'string') {
    throw new TypeError('id is not a string')
  }
  if (id.length === 0) {
    throw new Error('id cannot be empty')
  }
  if (/[^0-9a-zA-Z-]/.test(id)) {
    throw new Error('id cannot contain special characters')
  }

  return implementation(id)
}
