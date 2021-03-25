const {nodeResolve} = require('@rollup/plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const path = require('path');

const {inputDir, outputDir} = require('./_config')


const inputOptions = [
  {
    input: path.join(inputDir, 'renderer.ts'),
    outputFileName: 'app.js',
    plugins: [
      nodeResolve(),
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
  const outputFileName = input.outputFileName;
  let inputOptions = {...input};
  delete inputOptions.outputFileName;
  return {
    ...inputOptions,
    output: {
      file: path.join(outputDir, outputFileName),
      format: 'iife',
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
