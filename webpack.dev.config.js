const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const srcPath = require('./config/srcPath');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, srcPath),
};

const isJsLoader = ({loader}) => loader.includes('babel');

// Add eslint to *.js loaders.
config.module.loaders = config.module.loaders.map(loader => isJsLoader(loader) ?
  Object.assign(loader, {
    loader: `${ loader.loader }!eslint`,
  }) :
  loader
);

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin(),
]);

config.watchOptions = {
  aggregateTimeout: 500,
};

module.exports = config;
