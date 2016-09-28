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

* [`match(text, query)`](#match)
* [`parse(text, matches)`](#parse)

<a name="match"></a>
### match(text, query)

This function calculates the highlighting bits in `text` based on the `query`.

It returns an array of pairs. Every `[a, b]` pair means that `text.slice(a, b)` should be highlighted.

For example:

```js
//          012345678901234567       (text indices)
//          vvvv      vvv            (characters to highlight)
var text = 'Mill Park 3082 VIC';
var query = 'mill 308';

var matches = highlight.match(text, query);

// Returns:
// [[0, 4], [10, 13]]
```

<a name="parse"></a>
### parse(text, matches)

This function breaks the given `text` to parts according to `matches` (the output of [`match()`](#match)).

Best way to explain how it works is using an example:

```js
var parts = highlight.parse('Mill Park 3082 VIC', [[0, 4], [10, 13]]);

// Returns:
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

## Running Tests

```shell
npm test
```

## License

<a href="http://moroshko.mit-license.org" target="_blank">MIT</a>
