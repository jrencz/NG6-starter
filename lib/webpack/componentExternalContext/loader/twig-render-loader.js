// This loader is based on webpack-twig-loader but instead of compiling it renders

const Twig = require('twig');
const path = require('path');
const loaderUtils = require('loader-utils');
const ComponentExternalContextWebpackPlugin =
  require('../plugin/ComponentExternalContextWebpackPlugin');

Twig.cache(false);

let context;

module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  const id = loaderUtils.stringifyRequest(this,
    path.relative(process.cwd(), this.resource));

  // Context is shared for all files.
  if (!context) {
    context = this
      .options
      .plugins
      .filter(plugin => plugin instanceof ComponentExternalContextWebpackPlugin)

      // Extract context out of plugin instance
      .map(plugin => plugin.context)

      // Take 1st
      .shift()

      // Transform context stored in plugin into context suitable for rendering
      // (array -> object)
      .reduce((context, {name, data}) => Object.assign(context, {
        [name]: data,
      }), {});
  }

  const callbackFn = this.async();
  const rendered = Twig
    .twig({
      id,
      data: source,
      allowInlineIncludes: true,
    })
    .render(context);

  callbackFn(null, `module.exports = ${ JSON.stringify(rendered) }`, map);
};
