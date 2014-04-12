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

    if (options.moonboots.buildDirectory) {
        console.warn('The moonboots.buildDirectory option will be ignored.');
        delete options.moonboots.buildDirectory;
    }

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
    var result = this.moonboots;
    var filename, source;

    if (type === 'html') {
        filename = 'index.html';
        source = function (cb) { cb(null, (self.htmlSource || result.htmlSource).call(result)); };
    } else {
        filename = path.join(this.moonboots.config.resourcePrefix, result[type + 'FileName']());
        source = result[type + 'Source'];
    }

    source.call(result, function (err, src) {
        fs.writeFile(path.join(self.dir, filename), src, cb);
    });
};

module.exports = MoonbootsStatic;
