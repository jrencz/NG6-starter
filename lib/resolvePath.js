const srcPath = require('../config/srcPath');
const path = require('path');

// Helper method for resolving paths
// app/{glob}
const resolveToApp = (glob = '') => path.resolve(srcPath, 'app', glob);

// Helper method for resolving paths
// app/components/{glob}
const resolveToComponents = (glob = '') =>
  path.resolve(srcPath, 'app/components', glob);


module.exports = {
  resolveToApp,
  resolveToComponents,
};
