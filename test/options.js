var Lab = require('lab');
var MoonbootsStatic = require('../lib/moonboots-static');
var path = require('path');
var mainSample = path.resolve(__dirname + '/../sample');
var buildPath = path.resolve(mainSample + '/_build');
var config = require(mainSample + '/config.js');
var _ = require('underscore');
var fs = require('fs');


Lab.experiment('Options', function () {
    Lab.test('Writes to dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            htmlSource: null
        }));

        moonboots.on('ready', function () {
            Lab.expect(fs.existsSync(buildPath + '/app.nonCached.js')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/styles.nonCached.css')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/CNAME')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/assets/data.js')).to.equal(true);
            Lab.expect(fs.readFileSync(buildPath + '/index.html', 'utf8').indexOf('<!DOCTYPE html>')).to.equal(0);
            done();
        });
    });

    Lab.test('Writes to assets dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            moonboots: {resourcePrefix: '/assets/'}
        }));

        moonboots.on('ready', function () {
            Lab.expect(fs.existsSync(buildPath + '/assets/app.nonCached.js')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            done();
        });
    });

    Lab.test('Writes other HTML', function (done) {
        var moonboots = new MoonbootsStatic(config({
            htmlSource: function () {
                return 'test';
            }
        }));

        moonboots.on('ready', function () {
            Lab.expect(fs.readFileSync(buildPath + '/index.html', 'utf8')).to.equal('test');
            done();
        });
    });

    Lab.test('Copies from public dir', function (done) {
        var moonboots = new MoonbootsStatic(config({
            public: null
        }));

        moonboots.on('ready', function () {
            Lab.expect(fs.existsSync(buildPath + '/index.html')).to.equal(true);
            Lab.expect(fs.existsSync(buildPath + '/CNAME')).to.equal(false);
            done();
        });
    });

    Lab.test('Calls callback', function (done) {
        var moonboots = new MoonbootsStatic(config({
            cb: function (err) {
                Lab.expect(err).to.equal(undefined);
                done();
            }
        }));
    });
});