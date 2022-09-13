test("test12EmptyGameWordsAttempted", async function() {
  const game = new Game()
  expect([]).toStrictEqual(game.wordsAttempted());
});

class Game {
  wordsAttempted() {
    return [];
  }
}