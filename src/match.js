var repeat = require('lodash.repeat');
var escapeStringRegexp = require('escape-string-regexp');

module.exports = function match(text, query) {
  var queryWords = query
    .split(/\s+/)
    .filter(function(queryWord) {
      return queryWord.length > 0;
    });

  return queryWords
    .reduce(function(result, queryWord) {
      var regex;

      if (queryWord === '&') {
        regex = /&/i;
      } else if (queryWord[0] === '(') {
        regex = new RegExp(escapeStringRegexp(queryWord), 'i');
      } else {
        regex = new RegExp('\\b' + escapeStringRegexp(queryWord), 'i');
      }

      var index = text.search(regex);

      if (index > -1) {
        result.push([index, index + queryWord.length]);

        // Replace what we just found with spaces so we don't find it again
        text = text.slice(0, index) +
               repeat(' ', queryWord.length) +
               text.slice(index + queryWord.length);
      }

      return result;
    }, [])
    .filter(function(match) {
      return match !== null;
    })
    .sort(function(match1, match2) {
      return match1[0] - match2[0];
    });
};
