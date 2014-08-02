var MoonbootsStatic = require('../index');
var cofig = require('./config')({
    cb: function (err) {
        console.log(err || 'Done!');
    }
});

new MoonbootsStatic(cofig);
