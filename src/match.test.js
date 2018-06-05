var expect = require('chai').expect;
var match = require('./match');

describe('match', function() {
  it('should highlight at the beginning of a word', function() {
    expect(match('some text', 'te')).to.deep.equal([[5, 7]]);
  });

  it('should not highlight at the middle of a word', function() {
    expect(match('some text', 'e')).to.deep.equal([]);
  });

  it('should highlight at the middle of a word', function() {
    expect(match('some text', 'e', { insideWords: true })).to.deep.equal([[3, 4]]);
  });

  it('should highlight only the first match by default', function() {
    expect(match('some sweet text', 's')).to.deep.equal([[0, 1]]);
  });

  it('should highlight all the matches when query has multiple words', function() {
    expect(match('some sweet text', 's s')).to.deep.equal([[0, 1], [5, 6]]);
  });

  it('should highlight all the matches at the beginning of a word', function() {
    expect(match('some sweet text', 's', { findAllOccurrences: true })).to.deep.equal([[0, 1], [5, 6]]);
  });

  it('should highlight all the matches index words', function() {
    expect(match('some sweet text', 'e', { insideWords: true, findAllOccurrences: true })).to.deep.equal([[3, 4], [7, 8], [8, 9], [12, 13]]);
  });

  it("should highlight when case doesn't match", function() {
    expect(match('Some Text', 't')).to.deep.equal([[5, 6]]);
  });

  it('should remove diacritics when highlighting', function() {
    expect(match('Déjà vu', 'deja')).to.deep.equal([[0, 4]]);
  });

  it('should highlight diacritics', function() {
    expect(match('Déjà vu', 'déjà')).to.deep.equal([[0, 4]]);
  });

  it('should sort the matches', function() {
    expect(match('Albert Einstein', 'e a')).to.deep.equal([[0, 1], [7, 8]]);
  });

  it('should highlight special characters', function() {
    expect(
      match(
        "this & doesn't, (makesense) or is-it?",
        "(makesense) doesn't, is-it? &"
      )
    ).to.deep.equal([[5, 6], [7, 15], [16, 27], [31, 37]]);
  });

  it('should ignore whitespaces in query', function() {
    expect(
      match('Very nice day', '\td   \n\n ver \t\t   ni \n')
    ).to.deep.equal([[0, 3], [5, 7], [10, 11]]);
  });

  it('should not highlight anything if the query is blank', function() {
    expect(match('Very nice day', ' ')).to.deep.equal([]);
  });

  it('should not merge the matches', function() {
    expect(match('Very nice day', 'very nice day')).to.deep.equal([
      [0, 4],
      [5, 9],
      [10, 13]
    ]);
  });

  it('should partially highlight', function() {
    expect(match('some text', 's sweet')).to.deep.equal([[0, 1]]);
  });

  it('should not highlight anything', function() {
    expect(match('some text', 's sweet', { requireMatchAll: true })).to.deep.equal([]);
  });

  it('should highlight all words in query', function() {
    expect(match('some sweet text', 's sweet', { requireMatchAll: true })).to.deep.equal([[0, 1], [5, 10]]);
  });
});
