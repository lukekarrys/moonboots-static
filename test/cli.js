var Lab = require('lab');
var spawn = require('child_process').spawn;


Lab.experiment('CLI', function () {
    Lab.test('Exits with 0', function (done) {
        var test = spawn('node', ['index.js', 'sample/config.js', '--quiet']);
        test.on('close', function (code) {
            Lab.expect(code).to.equal(0);
            done();
        });
    });

    Lab.test('Exits with non 0', function (done) {
        var test = spawn('node', ['index.js', 'sample/cong.js', '2>/dev/null']);
        test.on('close', function (code) {
            Lab.expect(code).to.not.equal(0);
            done();
        });
    });
});