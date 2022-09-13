test("test10NoUppercaseAreAllowed", async function() {
   expect(() => { 
    new Word('vAliD');                 
               }).toThrow(Error);
});

class Word {
  constructor(word) {
    // We remove the /i modifier on the regular expression  
    if (!word.match(/^[a-z]+$/)) 
      throw new Error('word has invalid letters');   
  }