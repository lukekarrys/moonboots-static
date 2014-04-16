var _ = require('underscore');


module.exports = function (obj) {
    return _.extend({
        developmentMode: true,
        main: __dirname + '/app/app.js',
        timingMode: true,
        libraries: [
            __dirname + '/libraries/jquery-2.1.0.js'
        ],
        stylesheets: [
            __dirname + '/stylesheets/style.css'
        ],
        resourcePrefix: '/'
    }, obj);
};
