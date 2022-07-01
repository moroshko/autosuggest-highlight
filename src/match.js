const removeDiacritics = require('remove-accents').remove;

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6
const wordCharacterRegex = /[a-z0-9_]/i;

const whitespacesRegex = /\s+/;

function escapeRegexCharacters(str) {
  return str.replace(specialCharsRegex, '\\$&');
}

function extend(subject, baseObject) {
  subject = subject || {};
  Object.keys(subject).forEach((key) => {
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

  const cleanedTextArray = Array.from(text).map((x) => removeDiacritics(x));
  let cleanedText = cleanedTextArray.join('');

  query = removeDiacritics(query);

  return (
    query
      .trim()
      .split(whitespacesRegex)
      // If query is blank, we'll get empty string here, so let's filter it out.
      .filter((word) => word.length > 0)
      .reduce((result, word) => {
        const wordLen = word.length;
        const prefix =
          !options.insideWords && wordCharacterRegex.test(word[0]) ? '\\b' : '';
        const regex = new RegExp(prefix + escapeRegexCharacters(word), 'i');
        let occurrence;
        let index;

        occurrence = regex.exec(cleanedText);
        if (options.requireMatchAll && occurrence === null) {
          cleanedText = '';
          return [];
        }

        while (occurrence) {
          index = occurrence.index;

          const cleanedLength = cleanedTextArray
            .slice(index, index + wordLen)
            .join('').length;
          const offset = wordLen - cleanedLength;

          const initialOffset =
            index - cleanedTextArray.slice(0, index).join('').length;

          const indexes = [
            index + initialOffset,
            index + wordLen + initialOffset + offset
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
      .sort((match1, match2) => match1[0] - match2[0])
  );
};
