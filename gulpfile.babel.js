'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import del from 'del';
import colorsSupported from 'supports-color';

import paths from './config/paths';

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
  done => {
    webpack(require('./webpack.dist.config'), (err, stats) => {
      if (err) {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("[webpack]", stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
      }));

      done();
    });
  })
);
