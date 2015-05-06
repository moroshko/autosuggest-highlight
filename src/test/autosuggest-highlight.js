'use strict';

import { expect } from 'chai';
import highlight from '../autosuggest-highlight';

describe('autosuggest-highlight', function() {
  it('should not highlight in the middle of a word', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'am';
    const result = [];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight the first match', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'vic';
    const result = [[11, 14]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight multiple words', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'ch 3 a';
    const result = [[0, 2], [15, 16], [20, 21]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight multiple words regardless or order', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'a v c 3';
    const result = [[0, 1], [11, 12], [15, 16], [20, 21]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should ignore whitespaces', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = '   a \t\tv  \t   c      3\t\t';
    const result = [[0, 1], [11, 12], [15, 16], [20, 21]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should ignore spaces', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'cheltenham ';
    const result = [[0, 10]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight two consecutive words', function() {
    const text = 'Cheltenham VIC 3192 AU';
    const query = 'cheltenham vic';
    const result = [[0, 10], [11, 14]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight &', function() {
    const text = 'Port Macquarie & Mid North Coast NSW';
    const query = 'port macquarie & mid';
    const result = [[0, 4], [5, 14], [15, 16], [17, 20]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight -', function() {
    const text = 'Ngaanyatjarra-Giles WA 0872';
    const query = 'ngaanyatjarra-giles wa';
    const result = [[0, 19], [20, 22]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight ,', function() {
    const text = 'Wollongong, Illawarra & South Coast NSW';
    const query = 'wollongong, il';
    const result = [[0, 11], [12, 14]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should highlight ( and )', function() {
    const text = 'West Island Cocos (Keeling) Islands WA 6799';
    const query = 'cocos (keeling)';
    const result = [[12, 17], [18, 27]];

    expect(highlight(text, query)).to.deep.equal(result);
  });

  it('should not highlight the same char twice', function() {
    const text = 'North Ryde NSW 2113';
    const query = 'north n';
    const result = [[0, 5], [11, 12]];

    expect(highlight(text, query)).to.deep.equal(result);
  });
});
