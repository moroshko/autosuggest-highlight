<a href="https://codeship.com/projects/78168" target="_blank">
  <img src="https://img.shields.io/codeship/99ce0dd0-d5d5-0132-ce75-1e0a7d4d648e/master.svg?style=flat-square"
       alt="Build Status" />
</a>
<a href="https://codecov.io/gh/moroshko/autosuggest-highlight" target="_blank">
  <img src="https://img.shields.io/codecov/c/github/moroshko/autosuggest-highlight/master.svg?style=flat-square"
       alt="Coverage Status">
</a>
<a href="https://www.bithound.io/github/moroshko/autosuggest-highlight" target="_blank">
  <img src="https://www.bithound.io/github/moroshko/autosuggest-highlight/badges/score.svg"
       alt="bitHound Overall Score">
</a>
<a href="https://npmjs.org/package/autosuggest-highlight" target="_blank">
  <img src="https://img.shields.io/npm/v/autosuggest-highlight.svg?style=flat-square"
       alt="NPM Version" />
</a>

# Autosuggest Highlight

Utilities for highlighting text in autosuggest and autocomplete components.

## Installation

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

For example:

```js
var match = require('autosuggest-highlight/match');

// text indices:       012345678901234567
// chars to highlight: vvvv      vvv
var matches = match('Mill Park 3082 VIC', 'mill 308');

// [[0, 4], [10, 13]]
```

<a name="parse"></a>
### parse(text, matches)

Breaks the given `text` to parts based on `matches`.

It returns an array of `text` parts by specifying whether the part should be highlighted or not.

For example:

```js
var parse = require('autosuggest-highlight/parse');

var parts = parse('Mill Park 3082 VIC', [[0, 4], [10, 13]]);

// [
//   {
//     text: 'Mill',
//     highlight: true
//   },
//   {
//     text: ' Park ',
//     highlight: false
//   },
//   {
//     text: '308',
//     highlight: true
//   },
//   {
//     text: '2 VIC',
//     highlight: false
//   }
// ]
```

## License

<a href="http://moroshko.mit-license.org" target="_blank">MIT</a>
