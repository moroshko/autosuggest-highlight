module.exports = [
  {
    entry: './match/index.js',
    output: {
      filename: './umd/match/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightMatch',
      globalObject: 'this'
    },
    target: ['web'],
    mode: 'production'
  },
  {
    entry: './parse/index.js',
    output: {
      filename: './umd/parse/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightParse',
      globalObject: 'this'
    },
    target: ['web'],
    mode: 'production'
  },
  {
    entry: './match/index.js',
    output: {
      filename: './umd/ie11/match/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightMatch',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /.js$/,
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
      filename: './umd/ie11/parse/index.js',
      libraryTarget: 'umd',
      library: 'AutosuggestHighlightParse',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: 'babel-loader'
        }
      ]
    },
    target: ['browserslist'],
    mode: 'production'
  }
];
