var _ = require('underscore')
var path = require('path')

module.exports = function (options) {
  options || (options = {})
  return _.extend({
    moonboots: require('./appConfig')(options.moonboots || {}),
    public: path.join(__dirname, 'public'),
    directory: path.join(__dirname, '_build'),
    htmlSource: function (ctx) {
      var rp = ctx.resourcePrefix
      return [
        '<!DOCTYPE html>',
        '<link href="' + rp + ctx.cssFileName + '" rel="stylesheet" type="text/css">',
        '<script src="' + rp + 'data.js' + '"></script>',
        '<script src="' + rp + ctx.jsFileName + '"></script>'
      ].join('\n')
    }
  }, _.omit(options, 'moonboots'))
}
