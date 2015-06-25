(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["AutosuggestHighlight"] = factory();
	else
		root["AutosuggestHighlight"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _match = __webpack_require__(1);

	var _match2 = _interopRequireDefault(_match);

	var _parse = __webpack_require__(4);

	var _parse2 = _interopRequireDefault(_parse);

	exports['default'] = {
	  match: _match2['default'],
	  parse: _parse2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashRepeat = __webpack_require__(2);

	var _lodashRepeat2 = _interopRequireDefault(_lodashRepeat);

	// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
	function escapeRegexCharacters(str) {
	  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	exports['default'] = function (text, query) {
	  var queryWords = query.split(/\s+/).filter(function (queryWord) {
	    return queryWord.length > 0;
	  });

	  return queryWords.reduce(function (result, queryWord) {
	    var regex = undefined;

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
	      text = text.slice(0, index) + (0, _lodashRepeat2['default'])(' ', queryWord.length) + text.slice(index + queryWord.length);
	    }

	    return result;
	  }, []).filter(function (match) {
	    return match !== null;
	  }).sort(function (match1, match2) {
	    return match1[0] - match2[0];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseToString = __webpack_require__(3);

	/** Native method references. */
	var floor = Math.floor;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsFinite = global.isFinite;

	/**
	 * Repeats the given string `n` times.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to repeat.
	 * @param {number} [n=0] The number of times to repeat the string.
	 * @returns {string} Returns the repeated string.
	 * @example
	 *
	 * _.repeat('*', 3);
	 * // => '***'
	 *
	 * _.repeat('abc', 2);
	 * // => 'abcabc'
	 *
	 * _.repeat('abc', 0);
	 * // => ''
	 */
	function repeat(string, n) {
	  var result = '';
	  string = baseToString(string);
	  n = +n;
	  if (n < 1 || !string || !nativeIsFinite(n)) {
	    return result;
	  }
	  // Leverage the exponentiation by squaring algorithm for a faster repeat.
	  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	  do {
	    if (n % 2) {
	      result += string;
	    }
	    n = floor(n / 2);
	    string += string;
	  } while (n);

	  return result;
	}

	module.exports = repeat;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	exports['default'] = function (text, matches) {
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

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;