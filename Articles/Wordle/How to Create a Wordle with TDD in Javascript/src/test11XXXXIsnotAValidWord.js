test("test11XXXXIsnotAValidWord", async function() {
  expect(() => { 
    new Word('XXXXX');                 
               }).toThrow(Error);
});