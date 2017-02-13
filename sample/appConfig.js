var _ = require('underscore')
var p = require('path')

module.exports = function (obj) {
  return _.extend({
    developmentMode: true,
    main: p.join(__dirname, 'app', 'app.js'),
    timingMode: true,
    libraries: [
      p.join(__dirname, 'libraries', 'jquery-2.1.0.js')
    ],
    stylesheets: [
      p.join(__dirname, 'stylesheets', 'style.css')
    ],
    resourcePrefix: '/'
  }, obj)
}
