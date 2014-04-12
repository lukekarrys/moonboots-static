#! /usr/bin/env node

var MoonbootsStatic = require('./lib/moonboots-static');
var path = require('path');
var configPath, config, moonboots;


if (module.parent) {
    module.exports = MoonbootsStatic;
} else {
    configPath = path.join(__dirname, process.argv[2]);
    config = require(configPath);
    if (typeof config === 'function') config = config();
    config.timingMode = true;
    moonboots = new MoonbootsStatic(config);
    moonboots.on('log', console.log);
}
