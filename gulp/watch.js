const {watch} = require('gulp');
const path = require('path');
const {inputDir} = require('./_config')

const postcss = require('./postcss');

const watcher = cb => {
  watch([
      path.join(inputDir, '**/*.css'),
      path.join(inputDir, '**/*.tsx'),
  ], postcss, cb);
}

module.exports = watcher;
