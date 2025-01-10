test("test20220911", async function() {
  const correctWord = new Word('tibia');
    // Sorry for the spoiler
  const words = [
    // all the words I've tried
    new Word('paper'), 
    new Word('tools'),
    new Word('music'),
    new Word('think'), 
    new Word('twins'),
    new Word('tight'),
    // plus the winning word
    correctWord
  ];
  
  const game = new Game(words, correctWord);  
  expect(game.hasWon()).toStrictEqual(false);
  expect(game.hasLost()).toStrictEqual(false);
  // P(A)PER vs TIBIA
  game.addAttempt(new Word('paper'));
  expect([]).toStrictEqual((new Word('paper')).
        matchesPositionWith(correctWord));
  expect([2]).toStrictEqual((new Word('paper')).
        matchesIncorrectPositionWith(correctWord));
  // [T]OOLS vs TIBIA
  expect([1]).toStrictEqual((new Word('tools')).
        matchesPositionWith(correctWord));
  expect([]).toStrictEqual((new Word('tools')).
        matchesIncorrectPositionWith(correctWord));  
  game.addAttempt(new Word('tools'));
  // MUS[I]C vs TIBIA
  expect([4]).toStrictEqual((new Word('music')).
        matchesPositionWith(correctWord));
  expect([]).toStrictEqual((new Word('music')).
        matchesIncorrectPositionWith(correctWord));
  game.addAttempt(new Word('music'));
  // [T]H(I)NK vs TIBIA
  expect([1]).toStrictEqual((new Word('think')).
        matchesPositionWith(correctWord));
  expect([3]).toStrictEqual((new Word('think')).
        matchesIncorrectPositionWith(correctWord));
  game.addAttempt(new Word('think'));
  // [T]W(I)NS vs TIBIA
  expect([1]).toStrictEqual((new Word('twins')).
        matchesPositionWith(correctWord));
  expect([3]).toStrictEqual((new Word('twins')).
        matchesIncorrectPositionWith(correctWord));  
  game.addAttempt(new Word('twins'));  
  expect(game.hasWon()).toStrictEqual(false);
  expect(game.hasLost()).toStrictEqual(false);
  // [T][I]GHT vs TIBIA
  expect([1, 2]).toStrictEqual((new Word('tight')).
         matchesPositionWith(correctWord));
  expect([]).toStrictEqual((new Word('tight')).
         matchesIncorrectPositionWith(correctWord));  
  
  game.addAttempt(new Word('tight'));
  expect(game.hasWon()).toStrictEqual(false);
  expect(game.hasLost()).toStrictEqual(true);
});