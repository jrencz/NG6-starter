var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
const paths = require('./config/paths');

config.entry.app = paths.entry;

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  //
  // Mind that browserslist config may affect how the sources are transpiled.
  // If some unsupported by UglifyJS ES2015+ feature makes it through transpilation then this optimization may fail.
  // Off course ES2015+ support in UglifyJS may happen earlier, see: https://github.com/mishoo/UglifyJS2/issues/448).
  // In that case please consider manually enabling (https://github.com/babel/babel-preset-env#include) babel plugins
  // that will resume UglifyJS working properly.
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
