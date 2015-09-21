import { expect } from 'chai';
import { parseHTML } from '../src/autosuggest-highlight';

const testCases = [
  {
    it: 'supports no matches',
    params: [
      'Hello world',
      'b'
    ],
    result: [
      {
        text: 'Hello world',
        highlight: false
      }
    ]
  },
  {
    it: 'ignores unsupported tags',
    params: [
      '<strong>Hello</strong> world',
      'b'
    ],
    result: [
      {
        text: '<strong>Hello</strong> world',
        highlight: false
      }
    ]
  },
  {
    it: 'highlights the whole string',
    params: [
      '<b>Hello world</b>',
      'b'
    ],
    result: [
      {
        text: 'Hello world',
        highlight: true
      }
    ]
  },
  {
    it: 'highlights a single match',
    params: [
      'Hello <b>Javascript</b> devs',
      'b'
    ],
    result: [
      {
        text: 'Hello ',
        highlight: false
      },
      {
        text: 'Javascript',
        highlight: true
      },
      {
        text: ' devs',
        highlight: false
      }
    ]
  },
  {
    it: 'highlights multiple consecutive matches',
    params: [
      'Hello <b>React</b><b> Javascript</b> enthusiasts',
      'b'
    ],
    result: [
      {
        text: 'Hello ',
        highlight: false
      },
      {
        text: 'React',
        highlight: true
      },
      {
        text: ' Javascript',
        highlight: true
      },
      {
        text: ' enthusiasts',
        highlight: false
      }
    ]
  },
  {
    it: 'highlights multiple non consecutive matches',
    params: [
      'Hello <b>Javascript</b> devs and<b> React </b>enthusiasts',
      'b'
    ],
    result: [
      {
        text: 'Hello ',
        highlight: false
      },
      {
        text: 'Javascript',
        highlight: true
      },
      {
        text: ' devs and',
        highlight: false
      },
      {
        text: ' React ',
        highlight: true
      },
      {
        text: 'enthusiasts',
        highlight: false
      }
    ]
  },
  {
    it: 'preserves leading and trailing white spaces',
    params: [
      '  <b>Shalom</b> <b>StackOverflow</b> \t \n',
      'b'
    ],
    result: [
      {
        text: '  ',
        highlight: false
      },
      {
        text: 'Shalom',
        highlight: true
      },
      {
        text: ' ',
        highlight: false
      },
      {
        text: 'StackOverflow',
        highlight: true
      },
      {
        text: ' \t \n',
        highlight: false
      }
    ]
  }
];

describe('parseHTML()', () => {
  testCases.forEach(testCase => {
    it(testCase.it, () => {
      expect(parseHTML(...testCase.params)).to.deep.equal(testCase.result);
    });
  });
});
