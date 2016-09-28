'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, query) {
  var queryWords = query.split(/\s+/).filter(function (queryWord) {
    return queryWord.length > 0;
  });

  return queryWords.reduce(function (result, queryWord) {
    var regex = void 0;

    if (queryWord === '&') {
      regex = /&/i;
    } else if (queryWord[0] === '(') {
      regex = new RegExp(escapeRegexCharacters(queryWord), 'i');
    } else {
      regex = new RegExp('\\b' + escapeRegexCharacters(queryWord), 'i');
    }

    var index = text.search(regex);

    if (index > -1) {
      result.push([index, index + queryWord.length]);

      // Replace what we just found with spaces so we don't find it again
      text = text.slice(0, index) + (0, _lodash2.default)(' ', queryWord.length) + text.slice(index + queryWord.length);
    }

    return result;
  }, []).filter(function (match) {
    return match !== null;
  }).sort(function (match1, match2) {
    return match1[0] - match2[0];
  });
};

var _lodash = require('lodash.repeat');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}