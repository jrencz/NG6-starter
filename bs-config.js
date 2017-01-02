const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');
const colorsSupported = require('supports-color');
const srcPath = require('./config/srcPath');
const paths = require('./config/paths');

const config = require('./webpack.dev.config');
config.entry.app = [
  // this modules required to make HRM working
  // it responsible for all this webpack magic
  'webpack-hot-middleware/client?reload=true',
  // application entry point
].concat(paths.entry);

const compiler = webpack(config);

module.exports = {
  port: process.env.PORT || process.env.npm_package_config_port,
  open: false,
  server: {baseDir: srcPath},
  middleware: [
    historyApiFallback(),
    webpackDevMiddleware(compiler, {
      stats: {
        colors: colorsSupported,
        chunks: false,
        modules: false
      },
      publicPath: config.output.publicPath
    }),
    webpackHotMiddleware(compiler)
  ]
};
