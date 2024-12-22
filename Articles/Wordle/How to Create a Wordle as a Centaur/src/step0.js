 const response = await fetch("dictionary.txt");
 const dictionary = await response.text();
 const words = dictionary.split(/\r?\n/).map((string) 
     => new Word(string));

 var randomIndex = Math.floor(Math.random() * words.length);
 var winnerWord = words[randomIndex];

 var game = new Game(words, winnerWord);   

// Before we setup our UI.
// We want to create our valid working Game