[![Build Status][status-image]][status-url]
[![NPM Version][npm-image]][npm-url]

# Autosuggest Highlight

Find characters to highlight in autosuggest components.

## Installation

```shell
npm install autosuggest-highlight --save
```

## Basic Usage

```js
var highlight = require('autosuggest-highlight');

var matches = highlight.match('North Melbourne VIC 3051', 'melbourne no');
// => [[0, 2], [6, 15]]
```

### API

#### match

The function gets `text` and `query` and returns an array of pairs.

Every `[a, b]` pair means that `text.substring(a, b)` should be highlighted.

For example:

```js
//            012345678901234567       (text indices)
//            vvvv      vvv            (characters to highlight)
var text = 'Mill Park 3082 VIC';
var query = 'mill 308';

var matches = highlight.match(text, query);

// Returns:
[[0, 4], [10, 13]]
```

#### parse

The function gets `text` and `matches` (returned from `match`) and returns an array of string parts.

Each string part contains the `text` and a `highlight` flag indicating whether it matches.

For example:

```js
var parts = highlight.parse('Hello world', [[2,4], [6,8]]);

// Returns:
[
  {
    text: 'He',
    highlight: false
  },
  {
    text: 'll',
    highlight: true
  },
  {
    text: 'o ',
    highlight: false
  },
  {
    text: 'wo',
    highlight: true
  },
  {
    text: 'rld',
    highlight: false
  }
]
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
