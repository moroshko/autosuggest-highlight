var expect = require('chai').expect;
var match = require('./match');

describe('match', function() {
  it('should highlight the beginning of text', function() {
    expect(match('Very nice day', 'ver'))
      .to.deep.equal([[0, 3]]);
  });

  it('should highlight the end of text', function() {
    expect(match('Very nice day', 'day'))
      .to.deep.equal([[10, 13]]);
  });

  it('should highlight only the first instance when query has one word', function() {
    expect(match('Very very nice day', 'very'))
      .to.deep.equal([[0, 4]]);
  });

  it('should highlight all matching instances when query has multiple words', function() {
    expect(match('Very very nice day', 'very VERY'))
      .to.deep.equal([[0, 4], [5, 9]]);
  });

  it('should highlight special characters', function() {
    expect(match('this & doesn\'t, (makesense) or is-it?', '(makesense) doesn\'t, is-it? &'))
      .to.deep.equal([[5, 6], [7, 15], [16, 27], [31, 37]]);
  });

  it('should sort the matches', function() {
    expect(match('Very nice day', 'd ver ni'))
      .to.deep.equal([[0, 3], [5, 7], [10, 11]]);
  });

  it('should ignore whitespaces in query', function() {
    expect(match('Very nice day', '\td   \n\n ver \t\t   ni \n'))
      .to.deep.equal([[0, 3], [5, 7], [10, 11]]);
  });

  it('should not highlight in the middle of a word by default', function() {
    expect(match('Very nice day', 'ice'))
      .to.deep.equal([]);
  });

  it('should not highlight anything if the query is blank', function() {
    expect(match('Very nice day', ' '))
      .to.deep.equal([]);
  });

  it('should not merge the matches', function() {
    expect(match('Very nice day', 'very nice day'))
      .to.deep.equal([[0, 4], [5, 9], [10, 13]]);
  });
});
