const gulp = require('gulp');
const path = require('path');

const {inputDir, outputDir} = require('./_config')

const src = path.join(inputDir, 'pyodide/build/**');
const outDir = path.join(outputDir, 'pyodide/build/');

const pyodide = () => {
  return gulp.src(src)
      .pipe(gulp.dest(outDir))
}

module.exports = pyodide;
