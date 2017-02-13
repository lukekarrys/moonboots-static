var MoonbootsStatic = require('../index')
var cofig = require('./config')({
  cb: function (err) {
    console.log(err || 'Done!')
  }
})

// eslint-disable-next-line no-new
new MoonbootsStatic(cofig)
