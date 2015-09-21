var path = require('path');

module.exports = [{
  entry: './src/autosuggest-highlight.js',

  output: {
    filename: './dist/standalone/autosuggest-highlight.js',
    libraryTarget: 'umd',
    library: 'AutosuggestHighlight'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src') // Must be an absolute path
      ]
    }]
  }
}];
