var MoonbootsStatic = require('..');
var cofig = require('./config')();
var moonboots = new MoonbootsStatic(cofig);


moonboots.on('log', console.log);
