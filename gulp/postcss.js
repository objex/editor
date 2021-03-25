const gulp = require('gulp');
const size = require('gulp-size');
const postcss = require('gulp-postcss');
const path = require('path');
const concatCss = require('gulp-concat-css');

const {inputDir, outputDir} = require('./_config')

const src = path.join(inputDir, '**/*.css');

const css = () => {
  return gulp.src(src)
      .pipe(postcss())
      .pipe(size({title: 'styles'}))
      .pipe(concatCss('styles.css'))
      .pipe(gulp.dest(outputDir))
}

module.exports = css;
