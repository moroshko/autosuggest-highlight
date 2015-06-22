'use strict';

export default (text, matches) => {
  let rules = [];

  if (matches.length === 0) {
    rules.push({
      highlight: false,
      text: text
    });
  } else {
    if (matches[0][0] > 0) {
      rules.push({
        highlight: false,
        text: text.substring(0, matches[0][0])
      });
    }
  }

  matches.forEach(([startIndex, endIndex], i) => {
    rules.push({
      highlight: true,
      text: text.substring(startIndex, endIndex)
    });

    if (i === matches.length - 1 && endIndex < text.length) {
      rules.push({
        highlight: false,
        text: text.substring(endIndex, text.length)
      });
    } else if (endIndex < matches[i + 1][0]) {
      rules.push({
        highlight: false,
        text: text.substring(endIndex, matches[i + 1][0])
      });
    }
  });

  return rules;
};
