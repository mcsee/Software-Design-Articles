test("test25VeryComplexWrongPositions", async function() {

  const guessWord = new Word('geese');
  const correctWord = new Word('those');
  expect([4, 5]).toStrictEqual(guessWord.
          matchesPositionWith(correctWord));
  expect(['s','e']).toStrictEqual(guessWord.
          lettersAtCorrectPosition(correctWord));
  expect([]).toStrictEqual(guessWord.
          lettersAtWrongtPosition(correctWord));
  expect([]).toStrictEqual(guessWord.
          matchesIncorrectPositionWith(correctWord));
  // GEE[S][E] vs THOSE

  const anotherGuessWord = new Word('added');
  const anotherCorrectWord = new Word('dread');
  expect([5]).toStrictEqual(anotherGuessWord.
          matchesPositionWith(anotherCorrectWord));
  expect(['d']).toStrictEqual(anotherGuessWord.
          lettersAtCorrectPosition(anotherCorrectWord));
  expect(['a', 'd', 'e']).toStrictEqual(anotherGuessWord.
          lettersAtWrongtPosition(anotherCorrectWord));
  expect([1, 2, 4]).toStrictEqual(anotherGuessWord.
          matchesIncorrectPositionWith(anotherCorrectWord));
  // (A)(D)D(E)[D] vs DREAD
  
  const yetAnotherGuessWord = new Word('mamma');
  const yetAnotherCorrectWord = new Word('maxim');
  expect([1, 2]).toStrictEqual(yetAnotherGuessWord.
         matchesPositionWith(yetAnotherCorrectWord));
  expect(['m', 'a']).toStrictEqual(yetAnotherGuessWord.
         lettersInCorrectPosition(yetAnotherCorrectWord));
  expect(['m']).toStrictEqual(yetAnotherGuessWord.
         lettersAtWrongtPosition(yetAnotherCorrectWord));
  expect([3]).toStrictEqual(yetAnotherGuessWord.
         matchesIncorrectPositionWith(yetAnotherCorrectWord));
  // [M][A](M)MA vs MAXIM
});