const srcPath = require('./srcPath');
const path = require('path');

const {
  resolveToApp,
  resolveToComponents
} = require('../lib/resolvePath');

// map of all paths
module.exports = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  scss: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.resolve(srcPath, './index.html')
  ],
  entry: [
    'babel-polyfill',
    path.resolve(srcPath, './app/app.js')
  ],
  output: srcPath,
  blankTemplates: path.resolve('generator', 'component/**/*.**'),
  dest: path.resolve('dist')
};
