require('json5/lib/require');


module.exports = {
  root: true,

  env: {
    node: true,
    browser: false
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  plugins: [
    'spellcheck',
  ],

  rules: {
    'no-undef': ['error'],

    'spellcheck/spell-checker': ['error', {
      skipWords: [
        ...require('./config/spellcheck/skipWords/fileExtensions'),
        ...require('./config/spellcheck/skipWords/ownNames'),
        ...require('./config/spellcheck/skipWords/programmingJargon'),
        ...require('./config/spellcheck/skipWords/tests')
      ],
      skipIfMatch: require('./config/spellcheck/skipIfMatch'),
      lang: 'en_US',
    }]
  }
};
