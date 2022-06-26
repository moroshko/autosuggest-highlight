var expect = require('chai').expect;
var match = require('./match');

describe('match without options', function() {
  it('should highlight at the beginning of a word', function() {
    expect(match('some text', 'te')).to.deep.equal([[5, 7]]);
  });

  it('should not highlight at the middle of a word if third parameter is not passed or is set to false value', function() {
    expect(match('some text', 'e')).to.deep.equal([]);
  });

  it('should highlight only the first match by default', function() {
    expect(match('some sweet text', 's')).to.deep.equal([[0, 1]]);
  });

  it('should highlight all the matches when query has multiple words', function() {
    expect(match('some sweet text', 's s')).to.deep.equal([[0, 1], [5, 6]]);
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

  it('should adjust indexes per original text with diacritics ', function() {
    expect(match('œuvre pompes test', 'pompes')).to.deep.equal([[6, 12]]);
  });

  it('should adjust indexes per original text if query typed with diacritics', function() {
    expect(match('œuvre pompes test', 'œuvre')).to.deep.equal([[0, 5]]);
  });

  it('should adjust indexes per original text if query typed without diacritics', function() {
    expect(match('œuvre pompes test', 'oeuvre')).to.deep.equal([[0, 5]]);
  });

  it('should match if diacritic is typed', function() {
    expect(match('œuvre', 'œ')).to.deep.equal([[0, 1]]);
  });

  it('should match if diacritic is not typed', function() {
    expect(match('œuvre', 'oe')).to.deep.equal([[0, 1]]);
  });

  it('should not match if part of diacritic is typed', function() {
    expect(match('œuvre', 'o')).to.deep.equal([]);
  });

  it('should match beginning of second word including diacritic character', function() {
    expect(match('ma sœur', 'soe')).to.deep.equal([[3, 5]]);
  });

  // This is a little weird, but I think the match should not be interrupted as a user
  // types the individual characters of the query.
  it('should not match entire diacritic character in middle of word if part of diacritic is typed', function() {
    expect(match('ma sœur', 'so')).to.deep.equal([[3, 4]]);
  });
});

describe('match with options', function() {
  it('should highlight at the middle of a word', function() {
    expect(match('some text', 'e', { insideWords: true })).to.deep.equal([
      [3, 4]
    ]);
  });

  it('should highlight at the end of a word', function() {
    expect(match('some text', 'me', { insideWords: true })).to.deep.equal([
      [2, 4]
    ]);
  });

  it('should match single unicode character inside word', function() {
    expect(match('ma sœur', 'oe', { insideWords: true })).to.deep.equal([
      [4, 5]
    ]);
  });

  it('should highlight all the matches at the beginning of a word', function() {
    expect(
      match('some sweet text', 's', { findAllOccurrences: true })
    ).to.deep.equal([[0, 1], [5, 6]]);
  });

  it('should highlight all the matches index words', function() {
    expect(
      match('some sweet text', 'e', {
        insideWords: true,
        findAllOccurrences: true
      })
    ).to.deep.equal([[3, 4], [7, 8], [8, 9], [12, 13]]);
  });

  it('should not highlight anything', function() {
    expect(
      match('some text', 's sweet', { requireMatchAll: true })
    ).to.deep.equal([]);
  });

  it('should highlight all words in query', function() {
    expect(
      match('some sweet text', 's sweet', { requireMatchAll: true })
    ).to.deep.equal([[0, 1], [5, 10]]);
  });

  it('should highlight case-insensitive with cyrillic letters', function() {
    expect(match('БАЗИЛИК', 'базил', { requireMatchAll: true })).to.deep.equal([
      [0, 5]
    ]);
  });
});
