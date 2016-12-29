'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import yargs    from 'yargs';
import gutil    from 'gulp-util';
import del      from 'del';
import colorsSupported      from 'supports-color';

import paths from './config/paths';
import {
  resolveToComponents,
} from './lib/resolvePath';

gulp.task('clean', () => del([paths.dest])
  .then(removedPaths => {
    if (removedPaths.length) {
      gutil.log("[clean] removed", removedPaths);
    } else {
      gutil.log("[clean] nothing to be removed");
    }
  })
);

// use webpack.config.js to build modules
gulp.task('webpack', gulp.series(
  'clean',
  (cb) => {
    const config = require('./webpack.dist.config');
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
      if (err) {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("[webpack]", stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
      }));

      cb();
    });
  })
);

// TODO: use plot
// SEE: https://github.com/AngularClass/NG6-starter/pull/191/files
gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
