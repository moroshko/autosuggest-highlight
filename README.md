[![Build Status](https://img.shields.io/codeship/99ce0dd0-d5d5-0132-ce75-1e0a7d4d648e/master.svg?style=flat-square)](https://codeship.com/projects/78168)
[![Contributors](https://img.shields.io/github/contributors/moroshko/autosuggest-highlight.svg?style=flat-square)](https://github.com/moroshko/autosuggest-highlight/graphs/contributors)
[![Coverage Status](https://img.shields.io/codecov/c/github/moroshko/autosuggest-highlight/master.svg?style=flat-square)](https://codecov.io/gh/moroshko/autosuggest-highlight)

[![npm Downloads](https://img.shields.io/npm/dm/autosuggest-highlight.svg?style=flat-square)](https://npmjs.org/package/autosuggest-highlight)
[![npm Version](https://img.shields.io/npm/v/autosuggest-highlight.svg?style=flat-square)](https://npmjs.org/package/autosuggest-highlight)

# Autosuggest Highlight

Utilities for highlighting text in autosuggest and autocomplete components.

## Installation

```shell
yarn add autosuggest-highlight
```

or

```shell
npm install autosuggest-highlight --save
```

## API

| Function | Description |
| :--- | :--- |
| [`match(text, query)`](#match) | Calculates the characters to highlight in `text` based on `query`. |
| [`parse(text, matches)`](#parse) | Breaks the given `text` to parts based on `matches`. |

<a name="match"></a>
### match(text, query)

Calculates the characters to highlight in `text` based on `query`.

It returns an array of pairs. Every pair `[a, b]` means that `text.slice(a, b)` should be highlighted.

#### Examples

We match only at the beginning of a word:

```js
var match = require('autosuggest-highlight/match');

// text indices:     012345678
// highlighting:          vv
var matches = match('some text', 'te'); // [[5, 7]]
```

```js
// text indices:     012345678
// highlighting:
var matches = match('some text', 'e'); // []
```

When `query` is a single word, only the first match is returned:

```js
// text indices:     012345678901234
// highlighting:     v
var matches = match('some sweet text', 's'); // [[0, 1]]
```

You'll get the second match, if `query` contains multiple words:

```js
// text indices:     012345678901234
// highlighting:     v    v
var matches = match('some sweet text', 's s'); // [[0, 1], [5, 6]]
```

Matches are case insensitive:

```js
// text indices:     012345678
// highlighting:          v
var matches = match('Some Text', 't'); // [[5, 6]]
```

and [diacritics](https://en.wikipedia.org/wiki/Diacritic) are removed:

```js
// text indices:     0123456
// highlighting:     vvvv
var matches = match('Déjà vu', 'deja'); // [[0, 4]]
```

When `query` has multiple words, the order doesn't matter:

```js
// text indices:     012345678901234
// highlighting:     v      v
var matches = match('Albert Einstein', 'a e'); // [[0, 1], [7, 8]]
```

```js
// text indices:     012345678901234
// highlighting:     v      v
var matches = match('Albert Einstein', 'e a'); // [[0, 1], [7, 8]]
```

<a name="parse"></a>
### parse(text, matches)

Breaks the given `text` to parts based on `matches`.

It returns an array of `text` parts by specifying whether each part should be highlighted or not.

For example:

```js
var parse = require('autosuggest-highlight/parse');

// text indices:   0123456789012345
// highlighting:          vv   v
var parts = parse('Pretty cool text', [[7, 9], [12, 13]]);
/*
  [
    {
      text: 'Pretty ',
      highlight: false
    },
    {
      text: 'co',
      highlight: true
    },
    {
      text: 'ol ',
      highlight: false
    },
    {
      text: 't',
      highlight: true
    },
    {
      text: 'ext',
      highlight: false
    }
  ]
*/
```

## License

[MIT](http://moroshko.mit-license.org)
