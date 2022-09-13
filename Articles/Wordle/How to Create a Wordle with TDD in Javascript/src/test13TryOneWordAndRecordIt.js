test("test13TryOneWordAndRecordIt", async function() {
  var game = new Game();
  game.addAttempt(new Word('loser'));
  expect([new Word('loser')]).toStrictEqual(game.wordsAttempted());   
});

class Game {
  constructor() {
    this._attempts = [];
  }
  hasWon() {
      return false;
  }
  wordsAttempted() {
    return this._attempts;
  }
  addAttempt(word) {
    this._attempts.push(word);    
  }
}