#!/usr/bin/env node

const pkg = require('../../package.json');
const path = require('path');
const fs = require('fs');
const {isLink} = require('fs-utils');
const {
  magenta,
  cyan,
  red,
} = require('colors');
const {spawn} = require('child_process');

const prefix = cyan('[localdev:start]');

const log = (...msgs) => {
  console.log(`${ prefix }`, ...msgs);
};

Object
  .keys(pkg.localLink)
  .forEach(pkgName => {
    const pkgAbsPath = path.resolve('./node_modules/', pkgName);
    const wcRelPath = pkg.localLink[pkgName];
    const wcAbsPath = path.resolve(wcRelPath);

    if (fs.existsSync(wcAbsPath)) {
      if (isLink(pkgAbsPath)) {
        const wcPackageJsonAbsPath = path.resolve(wcAbsPath, './package.json');
        const wcPackageJson = require(wcPackageJsonAbsPath);

        if ('localdev-start' in wcPackageJson.scripts) {
          log(`package ${ magenta(pkgName) } HAS \`${ cyan('localdev-start') }\`. Starting.`);

          const localDevProcess = spawn('npm', ['run', 'localdev-start'], {
            cwd: wcAbsPath,
          });

          localDevProcess.stdout.on('data', data => {
            log(`from ${ magenta(pkgName) }`, data.toString());
          });

          localDevProcess.on('error', data => {
            log(`package ${ magenta(pkgName) } localdev ${ red('PROBLEM') }`, data.toString());
          });

          localDevProcess.on('close', code => {
            log(`package ${ magenta(pkgName) } localdev ${ red('EXITED') } with code`, code);
          });

          process.on('exit', () => {
            localDevProcess.kill();
          })
        } else {
          log(`package ${ magenta(pkgName) } HAS NO \`${ cyan('localdev-start') }\`.`);
        }
      } else {
        log(`package ${ magenta(pkgName) } IS NOT LINKED. No watcher will be started.`);
      }
    } else {
      log(`package ${ magenta(pkgName) } is NOT installed.`);
    }
  });

