require('json5/lib/require');

const path = require('path');
const sassConfig = require('../../sass.conf.js');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          /dist/,
          /node_modules/,
        ],
        loader: 'ng-annotate!babel',
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },

      // Compile static files using twig. This is a static compilation
      {
        test: /\.twig/,
        exclude: [
          /app/,
        ],
        loader: 'twig',
      },

      // Use precompiled template for twig files in components
      {
        test: /\.twig/,
        include: [
          /app/,
        ],
        loader: path.resolve(__dirname,
          '../../lib/webpack/componentExternalContext/loader/twig-render-loader'
        ),
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style!css?importLoaders=1!postcss!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  sassLoader: sassConfig,
};
