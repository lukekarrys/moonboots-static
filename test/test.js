var Lab = require('lab');
var MoonbootsStatic = require('..');
var mainSample = __dirname + '/../sample';


Lab.experiment('Init', function () {
    Lab.test('Moonboots instance gets ready', function (done) {
        var moonboots = new MoonbootsStatic({
            moonboots: {
                main: mainSample + '/app/app.js',
                timingMode: true,
                libraries: [
                    mainSample + '/libraries/jquery-2.1.0.js'
                ],
                stylesheets: [
                    mainSample + '/stylesheets/style.css'
                ],
                resourcePrefix: '/assets/',
            },
            public: mainSample + '/public',
            directory: mainSample + '/_build',
            htmlSource: function () {
                var rp = this.config.resourcePrefix;
                var ctx = this.htmlContext();
                return [
                    '<!DOCTYPE html>',
                    '<link href="' + rp + ctx.cssFileName + '" rel="stylesheet" type="text/css">',
                    '<script src="' + rp + 'data.js' + '"></script>',
                    '<script src="' + rp + ctx.jsFileName + '"></script>'
                ].join('\n');
            }
        });

        moonboots.on('ready', function () {
            Lab.expect(typeof moonboots).to.equal('object');
            done();
        });
    });
});