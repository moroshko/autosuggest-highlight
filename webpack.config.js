module.exports = [
  {
    entry: './match/index.js',
    output: {
      filename: './umd/match/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightMatch'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader'
        }
      ]
    },
    target: ['browserslist'],
    mode: 'production'
  },
  {
    entry: './parse/index.js',
    output: {
      filename: './umd/parse/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightParse'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader'
        }
      ]
    },
    target: ['browserslist'],
    mode: 'production'
  }
];
