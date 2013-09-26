
var os = require('os');
var env = process.env;
var impl = null;

switch(os.type()) {
  case 'Darwin':
    impl = function (id) {
      return env.HOME + '/Library/Caches/' + id;
    };
    break;
  case 'Linux':
    impl = function (id) {
      return env.HOME + '/.cache/' + id;
    };
    break;
  default:
    throw new Error('Your OS is currently not supported by node-cachedir.');
}

module.exports = exports = function (id) {
  if(typeof(id) != 'string') {
    throw new Error('Argument id should be a string');
  }
  if(id.length == 0) {
    throw new Error('Argument id cannot be empty');
  }
  if(/[ \n\r\t]/.test(id)) {
    throw new Error('Argument id cannot contain spaces');
  }
  return impl(id);
};
