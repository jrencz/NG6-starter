const glob = require('glob');
const fs = require('fs');
const path = require('path');
const json5 = require('json5');

const findComponents = ({
  root = process.cwd(),
  pattern = '**/*.componentrc',
} = {}) => glob
  .sync(pattern, {
    dot: true,
    root,
  })
  .map(componentRcPath => path.resolve(root, componentRcPath))
  .filter(path => fs.existsSync(path))
  .map(cwdPath => json5.parse(fs.readFileSync(cwdPath)).name);

module.exports = findComponents;
