test("test09LettersForGrassWord", async function() {
  const grassWord = new Word('grass'); 
  expect(['g','r','a','s','s']).toStrictEqual(grassWord.letters());
});