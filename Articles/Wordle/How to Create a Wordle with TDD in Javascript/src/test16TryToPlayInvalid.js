test("test16TryToPlayInvalid", async function() {
  const game = new Game([]);  
  expect(() => { 
    game.addAttempt(new Word('xxxxx'));            
               }).toThrow(Error);
});