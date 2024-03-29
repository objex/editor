const {series, parallel} = require('gulp');
const clean = require('./gulp/clean');
const postcss = require('./gulp/postcss');
const watch = require('./gulp/watch');
const pyodide = require('./gulp/pyodide');
const {jsDevelopment, jsProduction} = require('./gulp/rollup')

exports.clean = clean;
exports.postcss = postcss;
exports.jsdev = jsDevelopment;
exports.jsprod = jsProduction;

exports.default = series(
    clean,
    parallel(pyodide, jsDevelopment, postcss, watch),
)

exports.build = series(
    clean,
    parallel(jsProduction, postcss, pyodide),
)
