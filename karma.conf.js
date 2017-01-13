const commonWebpackLoadersConfig = require('./config/webpack/commonLoaders');
const commonWebpackPluginsConfig = require('./config/webpack/commonPlugins');

const {
  suite
} = require('yargs')
  .default('suite', 'spec.bundle.js')
  .argv;


module.exports = function (config) {
  const configuration = {
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'jasmine-matchers',
    ],

    // list of files/patterns to load in the browser
    files: [{ pattern: suite, watched: false }],

    // files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { [suite]: ['webpack', 'sourcemap'] },

    webpack: Object.assign({}, commonWebpackLoadersConfig, {
      devtool: 'inline-source-map',
      eslint: {
        cache: true,
        // Note: it will exclude the failing spec file entirely. Others will run.
        failOnError: true,
        configFile: './.eslintrc-spec.js',
      },
      plugins: [
        ...commonWebpackPluginsConfig.plugins,
      ],
      module: Object.assign({}, commonWebpackLoadersConfig.module, {
        loaders: commonWebpackLoadersConfig.module.loaders,
      })
    }),

    webpackServer: {
      // @see https://webpack.js.org/configuration/watch/#watchoptions
      watchOptions: {
        aggregateTimeout: 500,
      },
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'longest',
      'progress',
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true
  };

  if(process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
