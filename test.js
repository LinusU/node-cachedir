/* eslint-env mocha */

var assert = require('assert')
var homedir = require('os-homedir')
var proxyquire = require('proxyquire')

var platforms = [
  ['linux', homedir() + '/.cache/linusu'],
  ['darwin', homedir() + '/Library/Caches/linusu']
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
