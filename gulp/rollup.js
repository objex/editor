const rollup = require('rollup');
const {inputOptions, watchOptions} = require('./rollup.config');
const path = require('path');
const {terser} = require('rollup-plugin-terser');
const {outputDir} = require('./_config');

async function jsDevelopment() {
  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {
    if (event.code === 'ERROR') return console.log(event);
  });
}

function jsProduction() {
  return Promise.all(
      inputOptions.map(async (input) => {
        const outputFileName = input.outputFileName;
        let inputOptions = {...input};
        delete inputOptions.outputFileName;
        const bundle = await rollup.rollup(inputOptions);

        await bundle.write({
          file: path.join(outputDir, outputFileName),
          format: 'iife',
          sourcemap: true,
          plugins: [terser({format: {comments: false}})],
        });
        await bundle.close();
      })
  );
}

module.exports = {
  jsDevelopment,
  jsProduction,
}
