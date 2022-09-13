test("test01ValidWordLettersAreValid", async function() {
  const word = new Word('valid');
  expect(['v', 'a', 'l', 'i', 'd']).toStrictEqual(word.letters());
});