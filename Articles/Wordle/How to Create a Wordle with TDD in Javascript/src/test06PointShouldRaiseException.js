test("test06PointShouldRaiseException", async function() {
   expect(() => { 
    new Word('val.d');                 
               }).toThrow(Error);

});

// Solution

 constructor(word) {
    if (word.indexOf('*') > -1) 
      throw new Error('Word has invalid letters');
    if (word.indexOf('.') > -1) 
      throw new Error('Word has invalid letters');
}