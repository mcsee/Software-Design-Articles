test("test24MatchesIncorrectPositionsWithMatch", async function() {
  const guessWord = new Word('alarm');
  const correctWord = new Word('drama');
  expect([3]).toStrictEqual(guessWord.matchesPositionWith(correctWord));
  expect([1, 4, 5]).toStrictEqual(guessWord.matchesIncorrectPositionWith(correctWord));
  // A*ARM vs *RAMA
  expect([3]).toStrictEqual(correctWord.matchesPositionWith(guessWord));
  expect([2, 4, 5]).toStrictEqual(correctWord.matchesIncorrectPositionWith(guessWord));
});