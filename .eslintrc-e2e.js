require('json5/lib/require');

const commonEslintrc = './.eslintrc.js';

const [
  commonSpellCheckReportingLevel,
  commonSpellCheckOptions
] = require(commonEslintrc).rules['spellcheck/spell-checker'];


module.exports = {
  extends: [
    commonEslintrc,
    'plugin:protractor/recommended',
  ],

  plugins: [
    'angular',
    'jasmine',
    'protractor'
  ],

  env: {
    node: false,
    browser: true,
    jasmine: true,
    protractor: true,
    'angular/angular': true
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
