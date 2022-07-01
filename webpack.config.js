module.exports = [
  {
    entry: './match/index.js',
    output: {
      filename: './umd/match/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightMatch'
    },
    mode: 'production'
  },
  {
    entry: './parse/index.js',
    output: {
      filename: './umd/parse/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightParse'
    },
    mode: 'production'
  }
];
