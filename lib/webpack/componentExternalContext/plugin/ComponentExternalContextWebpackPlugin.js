const fetchComponentData = require('../util/fetchComponentData');

/**
 * Webpack plugin that fetches external configuration and then exposes it to a
 * loader.
 */
class ComponentExternalContextWebpackPlugin {
  /**
   * @param {string} componentsPattern
   * @param {string} endpointUriTemplate
   */
  constructor({
    componentsPattern,
    endpointUriTemplate,
  }) {
    this.componentsPattern = componentsPattern;
    this.endpointUriTemplate = endpointUriTemplate;
  }

  /**
   * @param {webpack.Compiler} compiler
   * @returns {undefined}
   */
  apply(compiler) {
    const run = (__compiler, done) => {
      fetchComponentData({
        componentsPattern: this.componentsPattern,
        endpointUriTemplate: this.endpointUriTemplate,
      })
        .then(context => {
          Object.assign(this, {context});
        })
        .then(done, done);
    };

    compiler.plugin('watch-run', run);
    compiler.plugin('run', run);
  }
}

module.exports = ComponentExternalContextWebpackPlugin;
