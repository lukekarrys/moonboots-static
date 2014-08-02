#! /usr/bin/env node

var MoonbootsStatic = require('./lib/moonboots-static');

// If this file is required then export our constructor
if (module.parent) {
    module.exports = MoonbootsStatic;
    return;
}

// Otherwise run it from the command line
var path = require('path');
var configPath = path.join(__dirname, process.argv[2]);
var config = require(configPath);
var _ = require('underscore');
require('colors');

function timingString(ms) {
    ms = ms + '';
    var ws = new Array(4 - ms.length).join(' ');
    return (ws + ms + 'ms').red + ' | ';
}

if (typeof config === 'function') {
    config = config();
}

// Turn on timing logs in moonboots
config.moonboots.timingMode = process.argv.join(' ').indexOf('--quiet') === -1;

var initialTime = Date.now();
var lastTime = initialTime;

new MoonbootsStatic(config).on('log', function () {
    var timing = arguments[2];
    var message = arguments[1];

    if (_.last(message.split(' ')) === 'finish') {
        console.log(timingString(timing - lastTime) + message.replace('finish', ''));
        lastTime = timing;
    }
    else if (message === 'built') {
        console.log('-----------------------');
        console.log(timingString(timing - initialTime) + 'Complete'.blue);
    }
});
