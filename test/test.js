var Lab = require('lab');
var MoonbootsStatic = require('..');
var mainSample = __dirname + '/../sample';
var config = require(mainSample + '/config.js')();


Lab.experiment('Init', function () {
    Lab.test('Moonboots instance gets ready', function (done) {
        var moonboots = new MoonbootsStatic(config);

        moonboots.on('ready', function () {
            Lab.expect(typeof moonboots).to.equal('object');
            done();
        });
    });

    Lab.test('Errors with no objects', function (done) {
        function noOptions() {
            new MoonbootsStatic();
        }

        Lab.expect(noOptions).to.throw(Error);
        done();
    });
});