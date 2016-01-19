var Lab = require('lab');
var Code = require('code');
var spawn = require('child_process').spawn;
var lab = exports.lab = Lab.script();


lab.experiment('CLI', function () {
    lab.test('Exits with 0', function (done) {
        var test = spawn('node', ['index.js', 'sample/config.js', '--quiet']);
        test.on('close', function (code) {
            Code.expect(code).to.equal(0);
            done();
        });
    });

    lab.test('Exits with non 0', function (done) {
        var test = spawn('node', ['index.js', 'sample/cong.js', '2>/dev/null']);
        test.on('close', function (code) {
            Code.expect(code).to.not.equal(0);
            done();
        });
    });
});