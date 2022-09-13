test("test17GuessesWord", async function() {
  const words = [new Word('happy')];
  const correctWord = new Word('happy');
  const game = new Game(words, correctWord);  
  expect(game.hasWon()).toStrictEqual(false);
  game.addAttempt(new Word('happy'));
  expect(game.hasWon()).toStrictEqual(true);
});

// we need to store the correct word
class Game {
  constructor(validWords, correctWord) {
    this._attempts = [];
    this._validWords = validWords;
    this._correctWord = correctWord;
  }
  hasWon() {
    return this._attempts.some(attempt => attempt.sameAs(this._correctWord)); 
}
