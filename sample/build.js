var MoonbootsStatic = require('..');

// A flag to sample what happens with long before build functions
var complex = process.argv.join(' ').indexOf('--complex') > -1;
var cofig = require('./config')(complex);

var moonboots = new MoonbootsStatic(cofig);

moonboots.on('log', console.log);
