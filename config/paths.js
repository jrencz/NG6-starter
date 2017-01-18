const srcPath = require('./srcPath');
const path = require('path');

const {
  resolveToApp,
  resolveToComponents,
} = require('../lib/resolvePath');

// Map of all paths
module.exports = {
  // Exclude spec files
  js: resolveToComponents('**/*!(.spec.js).js'),

  // Stylesheets
  scss: resolveToApp('**/*.scss'),
  html: [
    resolveToApp('**/*.html'),
    path.resolve(srcPath, './index.html'),
  ],
  entry: [
    'babel-polyfill',
    path.resolve(srcPath, './app/app.js'),
  ],
  output: srcPath,
  blankTemplates: path.resolve('generator', 'component/**/*.**'),
  dest: path.resolve('dist'),
};
