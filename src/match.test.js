var expect = require('chai').expect;
var match = require('./match');

describe('match', function() {
  it('should not highlight in the middle of a word', function() {
    expect(match('Cheltenham VIC 3192 AU', 'am'))
      .to.deep.equal([]);
  });

  it('should highlight the first match', function() {
    expect(match('Cheltenham VIC 3192 AU', 'vic'))
      .to.deep.equal([[11, 14]]);
  });

  it('should highlight multiple words', function() {
    expect(match('Cheltenham VIC 3192 AU', 'ch 3 a'))
      .to.deep.equal([[0, 2], [15, 16], [20, 21]]);
  });

  it('should highlight multiple words regardless of order', function() {
    expect(match('Cheltenham VIC 3192 AU', 'a v c 3'))
      .to.deep.equal([[0, 1], [11, 12], [15, 16], [20, 21]]);
  });

  it('should ignore whitespaces in query', function() {
    expect(match('Cheltenham VIC 3192 AU', '   a \t\tv  \t   c      3\t\t'))
      .to.deep.equal([[0, 1], [11, 12], [15, 16], [20, 21]]);
  });

  it('should highlight two consecutive words', function() {
    expect(match('Cheltenham VIC 3192 AU', 'cheltenham vic'))
      .to.deep.equal([[0, 10], [11, 14]]);
  });

  it('should highlight &', function() {
    expect(match('Port Macquarie & Mid North Coast NSW', 'port macquarie & mid'))
      .to.deep.equal([[0, 4], [5, 14], [15, 16], [17, 20]]);
  });

  it('should highlight -', function() {
    expect(match('Ngaanyatjarra-Giles WA 0872', 'ngaanyatjarra-giles wa'))
      .to.deep.equal([[0, 19], [20, 22]]);
  });

  it('should highlight ,', function() {
    expect(match('Wollongong, Illawarra & South Coast NSW', 'wollongong, il'))
      .to.deep.equal([[0, 11], [12, 14]]);
  });

  it('should highlight ( and )', function() {
    expect(match('West Island Cocos (Keeling) Islands WA 6799', 'cocos (keeling)'))
      .to.deep.equal([[12, 17], [18, 27]]);
  });

  it('should not highlight the same char twice', function() {
    expect(match('North Ryde NSW 2113', 'north n'))
      .to.deep.equal([[0, 5], [11, 12]]);
  });
});
