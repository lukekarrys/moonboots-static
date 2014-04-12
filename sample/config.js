module.exports = function (complex) {
    return {
        moonboots: {
            main: __dirname + '/app/app.js',
            developmentMode: !complex,
            timingMode: true,
            libraries: [
                __dirname + '/libraries/jquery-2.1.0.js'
            ],
            stylesheets: [
                __dirname + '/stylesheets/style.css'
            ],
            resourcePrefix: '/assets/',
            beforeBuildJS: function (cb) {
                if (complex) {
                    setTimeout(cb, 5000);
                } else {
                    cb();
                }
            },
            beforeBuildCSS: function (cb) {
                if (complex) {
                    setTimeout(cb, 5000);
                } else {
                    cb();
                }
            }
        },
        public: __dirname + '/public',
        directory: __dirname + '/_build',
        htmlSource: function (ctx) {
            var rp = ctx.resourcePrefix;
            return [
                '<!DOCTYPE html>',
                '<link href="' + rp + ctx.cssFileName + '" rel="stylesheet" type="text/css">',
                '<script src="' + rp + 'data.js' + '"></script>',
                '<script src="' + rp + ctx.jsFileName + '"></script>'
            ].join('\n');
        }
    };
};
