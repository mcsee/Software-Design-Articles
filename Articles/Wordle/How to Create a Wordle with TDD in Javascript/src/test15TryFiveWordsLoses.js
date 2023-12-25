test("test15TryFiveWordsLoses", async function() {
  const game = new Game(
    [new Word('loser'),
    new Word('music')],
    new Word('music'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  expect(false).toStrictEqual(game.hasLost());  
  // last attempt
  game.addAttempt(new Word('loser'));
  expect(true).toStrictEqual(game.hasLost());  
});

class Game {
  hasLost() {
    return this._attempts.length > 5;
  }
}