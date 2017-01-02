'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';

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
