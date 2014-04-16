var Moonboots = require('moonboots');
var Emitter = require('events').EventEmitter;
var path = require('path');
var sh = require('execSync');
var async = require('async');
var fs = require('fs');
var rmrf = require('rmrf');
var mkdirp = require('mkdirp');


function MoonbootsStatic(options) {
    if (options !== Object(options)) {
        throw new Error('Invalid options');
    }

    Emitter.call(this);

    this.moonboots = new Moonboots(options.moonboots);
    this.moonboots.on('ready', this.build.bind(this));
    this.moonboots.on('log', this.emitPassThrough.bind(this, 'log'));

    this.dir = options.directory;
    this.resourceDir = path.join(this.dir, this.moonboots.config.resourcePrefix);
    this.pubicDirectory = options.public;
    this.htmlSource = options.htmlSource;
    this.cb = options.cb;
}

MoonbootsStatic.prototype = Object.create(Emitter.prototype, {
    constructor: {
        value: MoonbootsStatic
    }
});

MoonbootsStatic.prototype.emitPassThrough = function () {
    this.emit.apply(this, arguments);
};

MoonbootsStatic.prototype.build = function () {
    var self = this;

    rmrf(this.dir);
    mkdirp.sync(this.dir);
    mkdirp.sync(this.resourceDir);

    async.parallel([
        this.writeFile.bind(this, 'html'),
        this.writeFile.bind(this, 'css'),
        this.writeFile.bind(this, 'js')
    ], function (err) {
        if (self.pubicDirectory) {
            sh.run('cp -r ' + self.pubicDirectory + '/* ' + self.dir);
        }
        self.moonboots.timing('built');
        self.cb ? self.cb(err) : self.emit('ready', err);
    });
};

MoonbootsStatic.prototype.writeFile = function (type, cb) {
    var self = this;
    var moonboots = this.moonboots;
    var filename, source;

    if (type === 'html') {
        filename = 'index.html';
        source = function (cb) {
            var context = moonboots.htmlContext();
            context.resourcePrefix = moonboots.config.resourcePrefix;
            var src;
            if (self.htmlSource) {
                src = self.htmlSource.call(moonboots, context);
            } else {
                src = moonboots.htmlSource();
            }
            cb(null, src);
        };
    } else {
        filename = path.join(this.moonboots.config.resourcePrefix, moonboots[type + 'FileName']());
        source = moonboots[type + 'Source'];
    }

    source.call(moonboots, function (err, src) {
        fs.writeFile(path.join(self.dir, filename), src, cb);
    });
};


module.exports = MoonbootsStatic;
