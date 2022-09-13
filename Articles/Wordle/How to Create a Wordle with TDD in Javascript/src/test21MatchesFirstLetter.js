test("test21MatchesFirstLetter", async function() {
  const guessWord = new Word('trees');
  const correctWord = new Word('table');
  expect([1]).toStrictEqual(guessWord.matchesPositionWith(correctWord));
});