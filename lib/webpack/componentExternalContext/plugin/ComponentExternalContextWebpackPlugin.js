const fetchComponentData = require('../util/fetchComponentData');

function ComponentExternalContextWebpackPlugin (config) {
  this.componentsPattern = config.componentsPattern;
  this.endpointUriTemplate = config.endpointUriTemplate;
}

ComponentExternalContextWebpackPlugin.prototype.apply = function (compiler) {
  const run = (__compiler, callback)  => {
    fetchComponentData({
      componentsPattern: this.componentsPattern,
      endpointUriTemplate: this.endpointUriTemplate,
    })
      .then(context => {
        Object.assign(this, {context});
      })
      .then(callback, callback)
  };

  compiler.plugin('watch-run', run);
  compiler.plugin('run', run);
};

module.exports = ComponentExternalContextWebpackPlugin;
