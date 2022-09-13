test("test20LettersDoNotMatch", async function() {
  const firstWord = new Word('trees');
  const secondWord = new Word('valid');
  expect([]).toStrictEqual(firstWord.matchesPositionWith(secondWord));
});