'use strict';

import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import del from 'del';

import paths from './config/paths';

gulp.task('clean', () => del([paths.dest])
  .then(removedPaths => {
    if (removedPaths.length) {
      gulpUtil.log("[clean] removed", removedPaths);
    } else {
      gulpUtil.log("[clean] nothing to be removed");
    }
  })
);
