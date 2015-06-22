[![Build Status][status-image]][status-url]
[![NPM Version][npm-image]][npm-url]

# Autosuggest Highlight

This library contains utilities for highlighting in autosuggest components.

## Installation

```shell
npm install autosuggest-highlight --save
```

Then, in your app:

```js
var highlight = require('autosuggest-highlight');
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

[MIT](http://moroshko.mit-license.org)

[status-image]: https://img.shields.io/codeship/99ce0dd0-d5d5-0132-ce75-1e0a7d4d648e/master.svg
[status-url]: https://codeship.com/projects/78168
[npm-image]: https://img.shields.io/npm/v/autosuggest-highlight.svg
[npm-url]: https://npmjs.org/package/autosuggest-highlight
