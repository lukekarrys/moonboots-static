var Moonboots = require('moonboots');
var Emitter = require('events').EventEmitter;
var path = require('path');
var ncp = require('ncp');
var async = require('async');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
require('colors');

var last = function (arr) { return arr[arr.length - 1]; };
function timingString(ms) {
    ms = ms + '';
    var ws = new Array(5 - ms.length).join(' ');
    return (ws + ms + 'ms').red + ' | ';
}


function MoonbootsStatic(options) {
    if (options !== Object(options)) {
        throw new Error('Invalid options');
    }

    Emitter.call(this);

    this.initialTime = Date.now();
    this.lastTime = this.initialTime;

    this.verbose = options.verbose;
    if (this.verbose) {
        options.moonboots.timingMode = true;
    }

    this.moonboots = new Moonboots(options.moonboots);
    this.moonboots.on('ready', this.build.bind(this));
    this.moonboots.on('log', this.emitPassThrough.bind(this, 'log'));

    this.dir = options.directory;
    this.resourceDir = path.join(this.dir, this.moonboots.config.resourcePrefix);
    this.publicDirectory = options.public;
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
    if (this.verbose) {
        this.timingLog.apply(this, arguments);
    }
};

MoonbootsStatic.prototype.timingLog = function () {
    var timing = arguments[3];
    var message = arguments[2];

    if( typeof message != 'object' ){

        if (last(message.split(' ')) === 'finish') {
            console.log(timingString(timing - this.lastTime) + message.replace('finish', ''));
            this.lastTime = timing;
        }
        else if (message === 'built') {
            console.log('-----------------------');
            console.log(timingString(timing - this.initialTime) + 'Complete'.blue);
        }

    } else {

        throw( message );
        
    }
};

MoonbootsStatic.prototype.build = function () {
    var self = this;
    var tasks = [
        this.writeFile.bind(this, 'html'),
        this.writeFile.bind(this, 'js')
    ];

    if (this.moonboots.config.stylesheets.length > 0) {
        tasks.push(this.writeFile.bind(this, 'css'));
    }

    async.series([
        function (cb) {
            rimraf(self.dir, cb);
        },
        function (cb) {
            mkdirp(self.dir, cb);
        },
        function (cb) {
            mkdirp(self.resourceDir, cb);
        }
    ], function (err) {
        async.parallel(tasks, function (err) {
            if (self.publicDirectory) {
                ncp(self.publicDirectory, self.dir, self.done.bind(self));
            } else {
                self.done(err);
            }
        });
    });
};

MoonbootsStatic.prototype.done = function (err) {
    this.moonboots.timing('built');
    this.cb ? this.cb(err) : this.emit('ready', err);
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
