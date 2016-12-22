require('json5/lib/require');

const {
  path: twigPreTemplatesContextFilePath
} = require('../templateconstants/config');

const path = require('path');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      // Compile static files using twig. This is a static compilation
      { test: /\.twig/, exclude: [/app/], loader: 'twig' },
      // Use precompiled template for twig files in components
      { test: /\.twig/, include: [/app/], loader: path.resolve(__dirname, '../../lib/webpack/loader/twig-render-loader') },
      { test: /\.(scss|sass)$/, loader: 'style!css?importLoaders=1!postcss!sass' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  twigRenderLoader: {
    contextFile: twigPreTemplatesContextFilePath,
  },
};
