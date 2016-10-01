import { expect } from 'chai';
import parse from './parse';

describe('parse', () => {
  it('supports no matches', () => {
    expect(parse('Hello world', [])).to.deep.equal([
      {
        text: 'Hello world',
        highlight: false
      }
    ]);
  });

  it('highlights a single partial match', () => {
    expect(parse('Hello world', [[0, 4]])).to.deep.equal([
      {
        text: 'Hell',
        highlight: true
      },
      {
        text: 'o world',
        highlight: false
      }
    ]);
  });

  it('highlights a single complete match', () => {
    expect(parse('Hello world', [[0, 11]])).to.deep.equal([
      {
        text: 'Hello world',
        highlight: true
      }
    ]);
  });

  it('highlights multiple non-consecutive matches', () => {
    expect(parse('Hello world', [[2, 4], [6, 8]])).to.deep.equal([
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
    ]);
  });

  it('highlights multiple consecutive matches', () => {
    expect(parse('Hello world', [[2, 4], [4, 8]])).to.deep.equal([
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
    ]);
  });
});
