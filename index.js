var os = require('os')
var path = require('path')

function linux (id) {
  return path.join(os.homedir(), '.cache', id)
}

function darwin (id) {
  return path.join(os.homedir(), 'Library', 'Caches', id)
}

var implementation = (function () {
  switch (os.platform()) {
    case 'linux': return linux
    case 'darwin': return darwin
    default: throw new Error('Your OS is currently not supported by node-cachedir.')
  }
}())

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
