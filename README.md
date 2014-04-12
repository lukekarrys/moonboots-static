moonboots-static
================

[![NPM](https://nodei.co/npm/moonboots-static.png)](https://nodei.co/npm/moonboots-static/)
[![Build Status](https://travis-ci.org/lukekarrys/moonboots-static.png?branch=master)](https://travis-ci.org/lukekarrys/moonboots-static)

**A static build plugin for moonboots.**

Just like [Moonboots](https://github.com/HenrikJoreteg/moonboots) but it will put all the built files into a directory ready to be served statically.

## Install

`npm install moonboots-static --save`

## Usage

```js
var Moonboots = require('moonboots-static');

var moonboots = new Moonboots({
    moonboots: {
        main: __dirname + '/app/app.js'
    },
    // Contents from the public directory
    // will be copied to the target directory 
    public: __dirname + '/public',
    // Directory to build files into
    directory: __dirname + '/_build'
});

moonboots.on('ready', function (err) {
    if (err) {
        // Oh no something went wrong
    } else {
        // Yay, we built our files!
    }
})
```