// Test: firing at an already hit position should not be allowed

const game = new Battleship();
game.fireAt("A3"); 
// First hit

try {
    game.fireAt("A3");
     // Firing at the same spot
    
     // THIS LINE IS IMPORTANT
     console.assert(false, 
        'An exception should have been thrown' +
        ' for firing at the same position.');
     // THIS LINE IS IMPORTANT
  
  
} catch (e) {
    console.assert(e.message === 'Position already hit.',
     'The error message should indicate the position is already hit.');
}
