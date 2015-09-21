import { expect } from 'chai';
import { parse } from '../src/autosuggest-highlight';

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
    it: 'highlights a single partial match',
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
    it: 'highlights a single complete match',
    params: [
      'Hello world',
      [[0, 11]]
    ],
    result: [
      {
        text: 'Hello world',
        highlight: true
      }
    ]
  },
  {
    it: 'highlights multiple non-consecutive matches',
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
  },
  {
    it: 'highlights multiple consecutive matches',
    params: [
      'Hello world',
      [[2, 4], [4, 8]]
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
        text: 'o wo',
        highlight: true
      },
      {
        text: 'rld',
        highlight: false
      }
    ]
  }
];

describe('parse()', () => {
  testCases.forEach(testCase => {
    it(testCase.it, () => {
      expect(parse(...testCase.params)).to.deep.equal(testCase.result);
    });
  });
});
