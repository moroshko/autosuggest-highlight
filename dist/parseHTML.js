'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, tag) {
  var regex = new RegExp('<' + tag + '>(.*?)</' + tag + '>');

  return text.split(regex).map(function (text, index) {
    return {
      text: text,
      highlight: index % 2 === 1
    };
  }).filter(function (obj) {
    return obj.text !== '';
  });
};