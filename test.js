/* eslint-env mocha */

var os = require('os')
var assert = require('assert')
var proxyquire = require('proxyquire')

var home = os.homedir()
var platforms = [
  ['linux', home + '/.cache/linusu'],
  ['darwin', home + '/Library/Caches/linusu']
]

platforms.forEach(function (platform) {
  describe(platform[0], function () {
    var cachedir

    before(function () {
      var os = {
        platform: function () { return platform[0] }
      }

      cachedir = proxyquire('./', { os: os })
    })

    it('should give correct path', function () {
      var actual = cachedir('linusu')
      var expected = platform[1]

      assert.equal(actual, expected)
    })

    it('should throw on bad input', function () {
      assert.throws(function () { cachedir() })
      assert.throws(function () { cachedir('') })
      assert.throws(function () { cachedir({}) })
      assert.throws(function () { cachedir([]) })
      assert.throws(function () { cachedir(null) })
      assert.throws(function () { cachedir(1337) })
      assert.throws(function () { cachedir('test!!') })
      assert.throws(function () { cachedir(undefined) })
    })
  })
})
