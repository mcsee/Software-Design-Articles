test("test14TryOneWordAndDontLooseYet", async function() {
  const game = new Game();
  game.addAttempt(new Word('loser'));
  expect(false).toStrictEqual(game.hasLost());   
});

class Game { 
  hasLost() {
      return false;
  }
}