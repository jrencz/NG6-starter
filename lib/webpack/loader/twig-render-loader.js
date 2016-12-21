// This loader is based on webpack-twig-loader but instead of compiling it renders

const Twig = require("twig");
const fs = require("fs");
const path = require("path");
const loaderUtils = require("loader-utils");

Twig.cache(false);

const loaderName = 'twigRender';

/**
 * Check the loader query and webpack config for loader options. If an option is defined in both places,
 * the loader query takes precedence.
 *
 * Function taken from sass-loader
 * @see https://github.com/jtangelder/sass-loader/blob/f5a0e77ac30d757774d794b2291e50226a428815/index.js#L379-L394
 *
 * @param {Loader} loaderContext
 * @returns {Object}
 */
function getLoaderConfig(loaderContext) {
  var query = loaderUtils.parseQuery(loaderContext.query);
  var configKey = query.config || `${ loaderName }Loader`;
  var config = loaderContext.options[configKey] || {};

  delete query.config;

  return Object.assign({}, config, query);
}

module.exports = function(source, map) {
  const {
    contextFile
  } = getLoaderConfig(this);

  const id = loaderUtils
    .stringifyRequest(this, path.relative(process.cwd(), this.resource));

  this.cacheable && this.cacheable();

  const callback = this.async();

  fs.readFile(contextFile, 'utf8', function (err, content) {
    if (err) {
      return callback(err);
    }

    const context = JSON.parse(content);

    const rendered = Twig
      .twig({
        id: id,
        data: source,
        allowInlineIncludes: true
      })
      .render(context);

      callback(null, `module.exports = ${ JSON.stringify(rendered) }`, map);
  });
};
