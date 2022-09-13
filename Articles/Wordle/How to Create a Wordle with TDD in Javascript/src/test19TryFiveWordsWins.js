test("test19TryFiveWordsWins", async function() {
  const game = new Game([new Word('loser'),new Word('heros')],new Word('heros'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  game.addAttempt(new Word('loser'));
  expect(false).toStrictEqual(game.hasLost());  
  expect(false).toStrictEqual(game.hasWon());  
  // last attempt
  game.addAttempt(new Word('heros'));
  expect(false).toStrictEqual(game.hasLost());  
  expect(true).toStrictEqual(game.hasWon());  
});

// And the correction

hasLost() {
    return !this.hasWon() && this._attempts.length > 5;
  }