#!/usr/bin/env node

const pkg = require('../../package.json');
const npm = require('npm');
const path = require('path');
const fs = require('fs');
const {isLink} = require('fs-utils');
const {
  magenta,
  cyan,
  red,
  green,
} = require('colors');

const prefix = cyan('[localdev:link]');

const log = (...msgs) => {
  console.log(prefix, ...msgs);
};

npm.load(pkg, (err, npm) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  Object
    .keys(pkg.localLink)
    .forEach(pkgName => {
      const pkgAbsPath = path.resolve('./node_modules/', pkgName);
      const wcRelPath = pkg.localLink[pkgName];
      const wcAbsPath = path.resolve(wcRelPath);

      if (fs.existsSync(wcAbsPath)) {
        if (isLink(pkgAbsPath)) {
          log(`package ${ magenta(pkgName) } IS ALREADY LINKED. Leaving as is.`);
        } else {
          log(`package ${ magenta(pkgName) } WILL BE LINKED. It was found locally under ${ cyan(wcAbsPath) }`);

          npm.link(wcRelPath, (err) => {
            if (err) {
              log(`package ${ magenta(pkgName) } LOCAL LINKING ${ red('FAILED') }.`);
            }

            log(`package ${ magenta(pkgName) } LOCAL LINKING ${ green('DONE') }.`);
          });
        }
      } else {
        if (isLink(pkgAbsPath)) {
          log(`package ${ magenta(pkgName) } WILL BE UNLINKED. It no longer exists under ${ cyan(wcRelPath) }`);

          npm.unlink(pkgName, (err) => {
            if (err) {
              log(`package ${ magenta(pkgName) } LOCAL UNLINKING ${ red('FAILED') }.`);
              return;
            }

            log(`package ${ magenta(pkgName) } LOCAL UNLINKING ${ green('DONE') }.`);
            log(`package ${ magenta(pkgName) } Will now be installed.`);

            npm.install(pkgName, (err) => {
              if (err) {
                log(`package ${ magenta(pkgName) } INSTALL ${ red('FAILED') }.`);
                return;
              }

              log(`package ${ magenta(pkgName) } INSTALL ${ green('DONE') }.`);
            })
          });
        } else if (fs.existsSync(pkgAbsPath)) {
          log(`package ${ magenta(pkgName) } IS INSTALLED. No local working copy exists.`);
        } else {
          log(`package ${ magenta(pkgName) } is NOT installed.`);
        }
      }
    });

});

