"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports["default"] = function (text, matches) {
  var rules = [];

  if (matches.length === 0) {
    rules.push({
      highlight: false,
      text: text
    });
  } else {
    if (matches[0][0] > 0) {
      rules.push({
        highlight: false,
        text: text.slice(0, matches[0][0])
      });
    }
  }

  matches.forEach(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2);

    var startIndex = _ref2[0];
    var endIndex = _ref2[1];

    rules.push({
      highlight: true,
      text: text.slice(startIndex, endIndex)
    });

    if (i === matches.length - 1) {
      if (endIndex < text.length) {
        rules.push({
          highlight: false,
          text: text.slice(endIndex, text.length)
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      rules.push({
        highlight: false,
        text: text.slice(endIndex, matches[i + 1][0])
      });
    }
  });

  return rules;
};

module.exports = exports["default"];