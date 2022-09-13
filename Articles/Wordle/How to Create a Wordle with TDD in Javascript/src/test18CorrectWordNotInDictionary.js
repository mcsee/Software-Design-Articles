test("test18CorrectWordNotInDictionary", async function() {
  const words = [new Word('happy')];
  const correctWord = new Word('heros');  
   expect(() => { 
     new Game(words, correctWord);                 
               }).toThrow(Error);
});

class Game {
  constructor(validWords, correctWord) {
    if (!validWords.some(validWord => validWord.sameAs(correctWord)))
      throw new Error("Correct word " + word.word() + " is not a valid word");  
  }