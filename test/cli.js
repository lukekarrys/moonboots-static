var Lab = require('lab');
var sh = require('execSync');


Lab.experiment('CLI', function () {
    Lab.test('Exits with 0', function (done) {
        var r = sh.run('node ./index.js sample/config.js --quiet');
        Lab.expect(r).to.equal(0);
        done();
    });

    Lab.test('Exits with non 0', function (done) {
        var r = sh.run('node ./index.js sample/cong.js 2>/dev/null');
        Lab.expect(r).to.not.equal(0);
        done();
    });
});