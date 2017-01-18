const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer-directory');
const _ = require('lodash');
const pkg = require('./package.json');

const generatorPaths = [
  './generator',
];

module.exports = plop => {
  // TODO: don't replicate plop packs. Learn how to do them.
  // https://github.com/amwmedia/plop/blob/master/plop-load.md
  const autoloadGeneratorPath = generatorPath => {
    fs
      .readdirSync(generatorPath)
      .forEach(generatorName => {
        try {
          const generatorFactory =
            require(path.resolve(generatorPath, `./${ generatorName }`));

          plop.setGenerator(generatorName, generatorFactory(plop));
        } catch (error) {
          console.warn(`Can't load generator \`${ generatorName }\``);
          console.error(error);
        }
      });
  };

  plop.addPrompt('directory', inquirer);

  // Helper named pkg can't do property paths by default.
  plop.addHelper('pkg', propertyPath => _.get(pkg, propertyPath));

  generatorPaths.forEach(autoloadGeneratorPath);
};
