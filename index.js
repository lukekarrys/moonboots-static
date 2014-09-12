#! /usr/bin/env node

var MoonbootsStatic = require('./lib/moonboots-static');

// If this file is required then export our constructor
if (module.parent) {
    module.exports = MoonbootsStatic;
    return;
}

// Otherwise run it from the command line
var path = require('path');
var configPath = path.join(process.cwd(), process.argv[2]);
var config = require(configPath);

if (typeof config === 'function') {
    config = config();
}

// Turn on timing logs in moonboots
config.verbose = process.argv.join(' ').indexOf('--quiet') === -1;

// Start it
new MoonbootsStatic(config);
