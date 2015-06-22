'use strict';

import { expect } from 'chai';
import { parse } from '../autosuggest-highlight';

const testCases = [
  {
    it: 'supports no matches',
    params: [
      'Hello world',
      []
    ],
    result: [
      {
        text: 'Hello world',
        highlight: false
      }
    ]
  },
  {
    it: 'highlights a single match',
    params: [
      'Hello world',
      [[0, 4]]
    ],
    result: [
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
    it: 'highlights multiple matches',
    params: [
      'Hello world',
      [[2, 4], [6, 8]]
    ],
    result: [
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
  it(testCase.it, () => {
    expect(parse(...testCase.params)).to.deep.equal(testCase.result);
  });
});
