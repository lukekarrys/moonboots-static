/* global window, $ */
var code = require('./code');
var wtf = require('./wtf');

module.exports = {
    launch: function () {
        window.app = this;
        code.docWrite('Woo! View source to see what rendered me.');
    }
};

$(function () {
    module.exports.launch();
});
