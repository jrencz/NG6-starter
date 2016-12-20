require('json5/lib/require');

const commonEslintrc = './.eslintrc.js';

const [
  commonSpellCheckReportingLevel,
  commonSpellCheckOptions
] = require(commonEslintrc).rules['spellcheck/spell-checker'];


module.exports = {
  extends: [
    commonEslintrc
  ],

  plugins: [
    'angular',
    'jasmine'
  ],

  env: {
    node: false,
    browser: true,
    jasmine: true,
    'angular/angular': true,
    'angular/mocks': true
  },

  rules: {
    'spellcheck/spell-checker': [commonSpellCheckReportingLevel, Object.assign(
      commonSpellCheckOptions,
      {
        'skipWords': [
          ...commonSpellCheckOptions.skipWords,
          ...require('./config/spellcheck/skipWords/tests'),
        ],
      }
    )],
  }
};
