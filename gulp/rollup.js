const rollup = require('rollup');
const {inputOptions, watchOptions} = require('./rollup.config');
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
        const bundle = await rollup.rollup(input);

        await bundle.write({
          dir: outputDir,
          format: 'esm',
          sourcemap: true,
          plugins: [terser({format: {comments: false}})],
          // globals: {
          //   './build/pyodide': './pyodide/pyodide.js'
          // },
        });
        await bundle.close();
      })
  );
}

module.exports = {
  jsDevelopment,
  jsProduction,
}
