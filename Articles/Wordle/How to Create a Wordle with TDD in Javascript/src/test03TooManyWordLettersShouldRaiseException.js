test("test03TooManyWordLettersShouldRaiseException", 
  async function() {
    expect(() => { 
      new Word('toolong');                 
               }).toThrow(Error);

});