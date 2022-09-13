test("test10EmptyGameHasNoWinner", async function() {
  const game = new Game()
  expect(false).toStrictEqual(game.hasWon());
});