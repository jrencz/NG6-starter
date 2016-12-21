var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const twigPreTemplatesContextFilePath = './.tmp/templateconstants.json';

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       // Compile static files using twig. This is a static compilation
       { test: /\.twig/, exclude: [/app/], loader: 'twig' },
       // Use precompiled template for twig files in components
       { test: /\.twig/, include: [/app/], loader: path.resolve(__dirname, './lib/webpack/loader/twig-render-loader') },
       { test: /\.(scss|sass)$/, loader: 'style!css?importLoaders=1!postcss!sass' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  },
  twigRenderLoader: {
    contextFile: twigPreTemplatesContextFilePath,
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: '!!twig!client/index.twig',
      inject: 'body',
      hash: true
    }),

    new StylelintWebpackPlugin({
      files: [
        'client/**/*.s?(a|c)ss',
      ],
    }),

    /**
     * @Note: this is a workaround for compiling twigs into html files without a need for a custom
     *        twig loader which would RENDER templates instead of just COMPILING them
     */
    new WebpackShellPlugin({
      onBuildStart: [
        // TODO: list modules instead of hard-coding them
        // The main idea is to allow passing module names to fetch only the needed data
        // It's possible that the list can be compiled by webpack itself and that data
        // fetching can be batched, but I din't get that far in mastering loaders api
        `./scripts/gettemplateconstants about,home,hero ${ twigPreTemplatesContextFilePath }`,
      ]
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
