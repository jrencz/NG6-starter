require('json5/lib/require');

var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const ComponentExternalContextWebpackPlugin =
  require('./lib/webpack/componentExternalContext/plugin/ComponentExternalContextWebpackPlugin');

const commonWebpackLoadersConfig = require('./config/webpack/commonLoaders');

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

    new ComponentExternalContextWebpackPlugin({
      root: srcPath,
      componentsPattern: '**/*.componentrc',
      endpointUriTemplate: 'https://gist.githubusercontent.com/jrencz/6bcc5972b2b29575e023ba7f9e1d8876/raw/39cb8101f9eaa5b7852817e57b37f451bb9ff600/componentdata.json{?params*}'
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
