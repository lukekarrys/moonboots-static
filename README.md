moonboots-static
================

**A static build plugin for moonboots.**

[![NPM](https://nodei.co/npm/moonboots-static.png)](https://nodei.co/npm/moonboots-static/)

**A static build plugin for moonboots.**

Just like [Moonboots](https://github.com/HenrikJoreteg/moonboots) but it will put all the built files into a directory ready to be served statically.


## Install

To use as a module: `npm install moonboots-static --save`

Or to use it as a global CLI: `npm install moonboots-static -g`

## Module Usage

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
    directory: __dirname + '/_build',
    // Log build items
    verbose: true
});

moonboots.on('ready', function (err) {
    if (err) {
        // Oh no something went wrong
    } else {
        // Yay, we built our files!
    }
});
```

## CLI Usage

To use it from the command line, provide a path to a config file as the first argument. The config file can be a `.json` file or a `.js` file that exports either an object or function that returns an object.

```
moonboots config.js
```

`--quiet` Turn off any logging. It is on by default.



## API

- `verbose`: Whether you want to log everything. Defaults to `false`. Even if you don't turn this on you can still listen to the emitted `log` events with `.on('log')`.
- `directory`: The directory where you want to write your files.
- `public`: A directory where the contents will be `cp -r`'d into the `directory` after everything else is built.
- `htmlSource`: A function with the signature `(context)` that should return the HTML you wish to write to your HTML file. It will have `resourcePrefix`, `cssFileName`, and `jsFileName` set on `context`. By default this will just use the [default Moonboots HTML source](https://github.com/HenrikJoreteg/moonboots/blob/master/index.js#L176-L180).
- `cb`: A callback that will be run after the build is complete. If there is an `err` it will be the first argumentt. If this `cb` is not provided, `moonboots-static` will emit a `ready` event instead.
- `moonboots`: This is an object that is passed directly to [Moonboots](https://github.com/HenrikJoreteg/moonboots). See the [documentation](https://github.com/HenrikJoreteg/moonboots#options) for what options are available.


## Test

Run `npm test`.


## Sample

Run `npm start` to see what files are built to `sample/_build` using the `sample/config.js` config file.


#License

MIT
