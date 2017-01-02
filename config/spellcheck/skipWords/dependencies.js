const npmls = require('npmls');
const builtinModules = require('builtin-modules');

module.exports = [
  ...builtinModules,
  ...npmls()
];
