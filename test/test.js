var Lab = require('lab')
var Code = require('code')
var path = require('path')
var MoonbootsStatic = require('../lib/moonboots-static')
var mainSample = path.join(__dirname, '..', 'sample')
var config = require(path.join(mainSample, 'config.js'))
var lab = exports.lab = Lab.script()

lab.experiment('Init', function () {
  lab.test('Moonboots instance gets ready', function (done) {
    var moonboots = new MoonbootsStatic(config())

    moonboots.on('ready', function () {
      Code.expect(typeof moonboots).to.equal('object')
      done()
    })
  })

  lab.test('Errors with no objects', function (done) {
    function noOptions () {
      // eslint-disable-next-line no-new
      new MoonbootsStatic()
    }

    Code.expect(noOptions).to.throw(Error)
    done()
  })
})
