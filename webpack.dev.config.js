var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'client')
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
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
