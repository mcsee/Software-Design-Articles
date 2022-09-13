test("test05InvalidLettersShouldRaiseException", async function() {
   expect(() => { 
    new Word('vali*');                 
               }).toThrow(Error);

});