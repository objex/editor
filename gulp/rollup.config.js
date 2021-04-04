const {nodeResolve} = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('@rollup/plugin-commonjs');
const path = require('path');

const {inputDir, outputDir} = require('./_config')


const inputOptions = [
  {
    input: path.join(inputDir, 'renderer.ts'),
    external: ['./build/pyodide.js'],
    plugins: [
      postcss(),
      nodeResolve(),
      commonjs(),
      typescript(),
    ],
  },
  // {
  //   input: path.join(inputDir, 'main.js'),
  //   outputFileName: 'main.js',
  //   plugins: [
  //     nodeResolve(),
  //     typescript(),
  //   ],
  // }
]

const watchOptions = inputOptions.map((input) => {
  return {
    ...input,
    output: {
      dir: outputDir,
      format: 'esm',
      globals: {
        './build/pyodide': './pyodide/pyodide.js'
      },
    },
    watch: {
      include: 'src/**/*',
    },
  }
});

module.exports = {
  inputOptions,
  watchOptions,
};
