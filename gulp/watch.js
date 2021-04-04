const {watch} = require('gulp');
const path = require('path');
const {inputDir} = require('./_config')

const postcss = require('./postcss');
const pyodide = require('./pyodide');

const watcher = (cb) => {
  watch([
      path.join(inputDir, '**/*.css'),
      path.join(inputDir, '**/*.tsx'),
  ], postcss, cb);

  watch([path.join(inputDir, 'pyodide/build/**'),], pyodide, cb);
}

module.exports = watcher;
