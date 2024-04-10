// Step 27

/* when pressing remove, 
chose randomly the secret word from the words collection */ 

document.getElementById('remove').
    addEventListener('click', function(event) {
  var randomIndex = Math.floor(Math.random() * words.length);
  winnerWord = words[randomIndex];
  game = new Game(words, winnerWord);   
});