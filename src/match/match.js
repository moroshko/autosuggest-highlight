import repeat from 'lodash.repeat';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default (text, query) => {
  const queryWords = query
    .split(/\s+/)
    .filter(queryWord => queryWord.length > 0);

  return queryWords
    .reduce((result, queryWord) => {
      let regex;

      if (queryWord === '&') {
        regex = /&/i;
      } else if (queryWord[0] === '(') {
        regex = new RegExp(escapeRegexCharacters(queryWord), 'i');
      } else {
        regex = new RegExp('\\b' + escapeRegexCharacters(queryWord), 'i');
      }

      const index = text.search(regex);

      if (index > -1) {
        result.push([index, index + queryWord.length]);

        // Replace what we just found with spaces so we don't find it again
        text = text.slice(0, index) +
               repeat(' ', queryWord.length) +
               text.slice(index + queryWord.length);
      }

      return result;
    }, [])
    .filter(match => match !== null)
    .sort((match1, match2) => match1[0] - match2[0]);
};
