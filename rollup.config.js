var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var sizeSnapshot = require('rollup-plugin-size-snapshot').sizeSnapshot;

module.exports = [
  {
    input: './match/index.js',
    output: {
      file: './umd/match/index.js',
      format: 'umd',
      name: 'AutosuggestHighlightMatch'
    },
    plugins: [nodeResolve(), commonjs(), sizeSnapshot()]
  },
  {
    input: './parse/index.js',
    output: {
      file: './umd/parse/index.js',
      format: 'umd',
      name: 'AutosuggestHighlightParse'
    },
    plugins: [nodeResolve(), commonjs(), sizeSnapshot()]
  }
];
