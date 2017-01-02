require('json5/lib/require');

var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const commonWebpackLoadersConfig = require('./config/webpack/commonLoaders');
const {
  path: twigPreTemplatesContextFilePath
} = require('./config/templateConstants/config');

const srcPath = require('./config/srcPath');

module.exports = Object.assign({
  devtool: 'source-map',
  entry: {},
  // @see https://webpack.github.io/docs/resolving.html#aliasing
  // This is a way of using bundled versions of reusable, NPM-installed, standalone components in drop-in bundled form.
  // resolve: {
  //   alias: {
  //     "test-standalone-component": require.resolve('test-standalone-component').replace('.js', '-bundled.js')
  //   }
  // },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: `!!twig!${ srcPath }/index.twig`,
      inject: 'body',
      hash: true
    }),

    new StylelintWebpackPlugin({
      files: [
        `${ srcPath }/**/*.scss`,
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
        `./scripts/get-template-constants about,home,hero ${ twigPreTemplatesContextFilePath }`,
      ]
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, srcPath)) === -1;
      }
    })
  ]
}, commonWebpackLoadersConfig);
