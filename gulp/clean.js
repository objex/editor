const config = require('./_config');
const del = require('del');

const clean = () => {
  return del([
    config.outputDir + '/**/*',
  ]);
};

module.exports = clean;
