'use strict';

import { expect } from 'chai';
import { parse } from '../autosuggest-highlight';

const testCases = [
  {
    should: 'support no matches',
    input: [
      'Hello world',
      []
    ],
    output: [
      {
        text: 'Hello world',
        highlight: false
      }
    ]
  },
  {
    should: 'highlight a single match',
    input: [
      'Hello world',
      [[0,4]]
    ],
    output: [
      {
        text: 'Hell',
        highlight: true
      },
      {
        text: 'o world',
        highlight: false
      }
    ]
  },
  {
    should: 'highlight a multiple matches',
    input: [
      'Hello world',
      [[2,4], [6,8]]
    ],
    output: [
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
  }
];

testCases.forEach(testCase => {
  it('should ' + testCase.should, () => {
    expect(parse.apply(null, testCase.input)).to.deep.equal(testCase.output);
  });
});
