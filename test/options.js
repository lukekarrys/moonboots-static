var Lab = require('lab');
var Code = require('code');
var MoonbootsStatic = require('../lib/moonboots-static');
var path = require('path');
var mainSample = path.resolve(__dirname + '/../sample');
var buildPath = path.resolve(mainSample + '/_build');
var config = require(mainSample + '/config.js');
var _ = require('underscore');
var fs = require('fs');
var lab = exports.lab = Lab.script();


lab.experiment('Options', function () {
    lab.test('Writes to dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            htmlSource: null
        }));

        moonboots.on('ready', function () {
            Code.expect(fs.existsSync(buildPath + '/app.nonCached.js')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/styles.nonCached.css')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/CNAME')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/assets/data.js')).to.equal(true);
            Code.expect(fs.readFileSync(buildPath + '/index.html', 'utf8').indexOf('<!DOCTYPE html>')).to.equal(0);
            done();
        });
    });

    lab.test('Writes to assets dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            moonboots: {resourcePrefix: '/assets/'}
        }));

        moonboots.on('ready', function () {
            Code.expect(fs.existsSync(buildPath + '/assets/app.nonCached.js')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            done();
        });
    });

    lab.test('Writes other HTML', function (done) {
        var moonboots = new MoonbootsStatic(config({
            htmlSource: function () {
                return 'test';
            }
        }));

        moonboots.on('ready', function () {
            Code.expect(fs.readFileSync(buildPath + '/index.html', 'utf8')).to.equal('test');
            done();
        });
    });

    lab.test('Copies from public dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            public: null
        }));

        moonboots.on('ready', function () {
            Code.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/CNAME')).to.equal(false);
            done();
        });
    });

    lab.test('Doesnt write css', function (done) {
        var moonboots = new MoonbootsStatic(config({
            htmlSource: null,
            moonboots: { stylesheets: [] }
        }));

        moonboots.on('ready', function () {
            Code.expect(fs.existsSync(buildPath + '/app.nonCached.js')).to.equal(true);
            Code.expect(fs.existsSync(buildPath + '/styles.nonCached.css')).to.equal(false);
            Code.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            var index = fs.readFileSync(buildPath + '/index.html', 'utf8');
            Code.expect(index.indexOf('<!DOCTYPE html>')).to.equal(0);
            Code.expect(index.indexOf('styles.nonCached.css')).to.equal(-1);
            done();
        });
    });

    lab.test('Calls callback', function (done) {
        var moonboots = new MoonbootsStatic(config({
            cb: function (err) {
                Code.expect(!!err).to.equal(false);
                done();
            }
        }));
    });

    lab.test('Can be verbose', function (done) {
        var moonboots = new MoonbootsStatic(config({
            verbose: true
        }));

        moonboots.on('ready', function () {
            done();
        });
    });

    lab.test('Can log errors', function (done) {
        var moonboots = new MoonbootsStatic(config({
            moonboots: {main: path.resolve(__dirname, '..', 'sample/app/badApp.js')}
        }));

        moonboots.on('ready', function () {
            done();
        });
    });
});