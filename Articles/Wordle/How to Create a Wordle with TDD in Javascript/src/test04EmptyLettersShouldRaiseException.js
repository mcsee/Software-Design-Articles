test("test04EmptyLettersShouldRaiseException", async function() {
  expect(() => { 
    new Word('');                 
               }).toThrow(Error);

});