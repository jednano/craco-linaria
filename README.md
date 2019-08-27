# craco-linaria

[![Travis Build Status](https://travis-ci.com/jedmao/craco-linaria.svg?branch=master)](https://travis-ci.com/jedmao/craco-linaria)
[![codecov](https://codecov.io/gh/jedmao/craco-linaria/branch/master/graph/badge.svg)](https://codecov.io/gh/jedmao/craco-linaria)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A [craco](https://www.npmjs.com/package/@craco/craco) plugin to use [Linaria][]
zero-runtime CSS in JS library in a create react app.

## Installation

First, follow craco's
[installation instructions](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#installation).

Then, install `craco-linaria` and [Linaria][]:

```bash
$ npm install --save-dev craco-linaria linaria
```

## Usage

```js
/* craco.config.js */
const CracoLinariaPlugin = require('craco-linaria')

module.exports = {
  plugins: [
    {
      plugin: CracoLinariaPlugin,
      options: {
        // Linaria options
      },
    },
  ],
}
```

You can specify
[Linaria options](https://github.com/callstack/linaria/blob/master/docs/CONFIGURATION.md#options)
inline (as above) or it will be picked up from any of the
[supported configuration paths](https://github.com/callstack/linaria/blob/master/docs/CONFIGURATION.md#configuration).

## Git Ignore

This plugin stores [Linaria][] cache in `src/.linaria_cache`, so you might want
to add that path to your [`.gitignore`](https://git-scm.com/docs/gitignore)
file.

[linaria]: https://linaria.now.sh/
