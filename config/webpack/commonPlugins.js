const srcPath = require('../srcPath');

const ComponentExternalContextWebpackPlugin = require('../../lib/webpack/' +
  'componentExternalContext/plugin/ComponentExternalContextWebpackPlugin');

module.exports = {
  plugins: [
    new ComponentExternalContextWebpackPlugin({
      root: srcPath,

      /* eslint-disable spellcheck/spell-checker */
      componentsPattern: '**/*.componentrc',
      endpointUriTemplate: 'https://gist.githubusercontent.com/jrencz/' +
        '6bcc5972b2b29575e023ba7f9e1d8876/raw/componentdata.json{?params*}',
    }),
  ],
};
