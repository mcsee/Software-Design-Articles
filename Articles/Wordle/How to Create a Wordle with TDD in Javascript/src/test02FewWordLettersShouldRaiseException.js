test("test02FewWordLettersShouldRaiseException", async function() {
  expect(() => { 
    new Word('vali');                 
               }).toThrow(Error);
});