const srcPath = require('../config/srcPath');
const path = require('path');

// helper method for resolving paths
const resolveToApp = (glob = '') => {
  return path.resolve(srcPath, 'app', glob); // app/{glob}
};

const resolveToComponents = (glob = '') => {
  return path.resolve(srcPath, 'app/components', glob); // app/components/{glob}
};

module.exports = {
  resolveToApp,
  resolveToComponents
};
