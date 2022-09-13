test("test23MatchesIncorrectPositions", async function() {
  const guessWord = new Word('trees');
  const correctWord = new Word('drama');
  expect([2]).toStrictEqual(guessWord.matchesPositionWith(correctWord));
  expect([]).toStrictEqual(guessWord.matchesIncorrectPositionWith(correctWord));
});

// The simplest solution

class Word {
  matchesIncorrectPositionWith(correctWord) {
     return [];
  }
}