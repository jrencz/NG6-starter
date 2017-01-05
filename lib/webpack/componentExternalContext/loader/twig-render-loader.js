// This loader is based on webpack-twig-loader but instead of compiling it renders

const Twig = require("twig");
const fs = require("fs");
const path = require("path");
const loaderUtils = require("loader-utils");
const ComponentExternalContextWebpackPlugin = require('../plugin/ComponentExternalContextWebpackPlugin');

Twig.cache(false);

let context;

module.exports = function (source, map) {
  this.cacheable && this.cacheable();

  const id = loaderUtils.stringifyRequest(this, path.relative(process.cwd(), this.resource));

  // Context is shared for all files.
  if (!context) {
    context = this
      .options
      .plugins
      .filter(plugin => plugin instanceof ComponentExternalContextWebpackPlugin)
      // extract context out of plugin instance
      .map(plugin => plugin.context)
      // take 1st
      .shift()
      // transform context stored in plugin into context suitable for rendering (array -> object)
      .reduce((context, {name, data}) => Object.assign(context, {
        [name]: data,
      }), {});
  }

  const callback = this.async();
  const rendered = Twig
    .twig({
      id: id,
      data: source,
      allowInlineIncludes: true
    })
    .render(context);

  callback(null, `module.exports = ${ JSON.stringify(rendered) }`, map);
};
