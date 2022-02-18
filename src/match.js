var removeDiacritics = require('diacritic').clean;

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
var specialCharsRegex = /[.*+?^${}()|[\]\\]/g;

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6
var wordCharacterRegex = /[a-z0-9_]/i;

var whitespacesRegex = /\s+/;

function escapeRegexCharacters(str) {
  return str.replace(specialCharsRegex, '\\$&');
}

function extend(subject, baseObject) {
  subject = subject || {};
  Object.keys(subject).forEach(function(key) {
    baseObject[key] = !!subject[key];
  });
  return baseObject;
}

module.exports = function match(text, query, options) {
  options = extend(options, {
    insideWords: false,
    findAllOccurrences: false,
    requireMatchAll: false
  });

  var cleanedTextArray = Array.from(text).map(function(x) {
    return removeDiacritics(x);
  });
  var cleanedText = cleanedTextArray.join('');

  query = removeDiacritics(query);

  return (
    query
      .trim()
      .split(whitespacesRegex)
      // If query is blank, we'll get empty string here, so let's filter it out.
      .filter(function(word) {
        return word.length > 0;
      })
      .reduce(function(result, word) {
        var wordLen = word.length;
        var prefix =
          !options.insideWords && wordCharacterRegex.test(word[0]) ? '\\b' : '';
        var regex = new RegExp(prefix + escapeRegexCharacters(word), 'i');
        var occurrence, index;

        occurrence = regex.exec(cleanedText);
        if (options.requireMatchAll && occurrence === null) {
          cleanedText = '';
          return [];
        }

        while (occurrence) {
          index = occurrence.index;

          var cleanedLength = cleanedTextArray
            .slice(index, index + wordLen)
            .join('').length;
          var offset = wordLen - cleanedLength;

          var initialOffset =
            index - cleanedTextArray.slice(0, index).join('').length;
          var wordOffset = offset;

          var indexes = [
            index + initialOffset,
            index + wordLen + initialOffset + wordOffset
          ];

          if (indexes[0] !== indexes[1]) {
            result.push(indexes);
          }

          // Replace what we just found with spaces so we don't find it again.
          cleanedText =
            cleanedText.slice(0, index) +
            new Array(wordLen + 1).join(' ') +
            cleanedText.slice(index + wordLen);

          if (!options.findAllOccurrences) {
            break;
          }

          occurrence = regex.exec(cleanedText);
        }

        return result;
      }, [])
      .sort(function(match1, match2) {
        return match1[0] - match2[0];
      })
  );
};
