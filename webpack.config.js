var path = require('path');
var webpack = require('webpack');

module.exports = [
  {
    entry: './match/index.js',
    output: {
      filename: './umd/match/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightMatch'
    }
  },
  {
    entry: './parse/index.js',
    output: {
      filename: './umd/parse/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightParse'
    }
  }
];
