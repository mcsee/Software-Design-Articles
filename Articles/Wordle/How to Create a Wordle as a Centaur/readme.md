# How to Create a Wordle as a Centaur
            
![How to Create a Wordle as a Centaur](How%20to%20Create%20a%20Wordle%20as%20a%20Centaur.jpg)

*Why you should use modern AI programming tools*

> TL;DR: Use the best available tools wisely

I've been using Wordle as an analogy for serious software development.

In this article, I will combine the TDD solution that created a good model with an automated code generated using Artificial Intelligence.

# Divide and Conquer 

## The Division

I have written several articles on software development.

I will talk about Wordle to represent serious software.

In the first one, I created a backend Wordle using TDD and PHP.

[How to Develop a Wordle Game using TDD in 25 Minutes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Develop%20a%20Wordle%20Game%20using%20TDD%20in%2025%20Minutes/readme.md)

Next, I watched a video on how to fully develop a Wordle using Automatic Code Generation.

[Step by Step Wordle Creation With Codex AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/Step%20by%20Step%20Wordle%20Creation%20With%20Codex%20AI/readme.md)

Since Wordle is another Kata, I keep practicing it with TDD using Javascript

[How to Create a Wordle with TDD in Javascript](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Create%20a%20Wordle%20with%20TDD%20in%20Javascript/readme.md)

Now we have an amazing Wordle with a great domain model AND an incredible machine-learning user interface for it.

Let's combine them.

## The Conquest

We have two repositories:

1 - The one with the Javascript Wordle made with TDD

[Repl.it](https://replit.com/@mcsee/Wordle-TDD)

[Github](https://github.com/mcsee/wordle/tree/main/How%20to%20Create%20a%20Wordle%20with%20TDD%20in%20Javascript)

2 - The one with the machine-generated code

[GitHub](https://github.com/mcsee/wordle/tree/main/Open%20AI%20Codex%20from%20DotCSV)

Playable Version (Live) With Defects

[Live Demo](https://mcsee.github.io/wordle/DotCSV/index.html)

# Making it work together

We need to inject the changes into our main file.

Remember the scripted UI version was not modular.

We set up our valid game before building our UI

<!-- [Gist Url](https://gist.github.com/mcsee/29c9c0090376e51d71b99a9fd38988d9) -->

```javascript
const response = await fetch("dictionary.txt");
 const dictionary = await response.text();
 const words = dictionary.split(/\r?\n/).map((string) 
     => new Word(string));

 var randomIndex = Math.floor(Math.random() * words.length);
 var winnerWord = words[randomIndex];

 var game = new Game(words, winnerWord);   

// Before we setup our UI.
// We want to create our valid working Game
```

We create a text field to show status/errors to end users

<!-- [Gist Url](https://gist.github.com/mcsee/8fd4f81d9b19893d4131cd470dd8682a) -->

```javascript
// Step 14 bis
/* add an input text field under the table */

var status = document.createElement('input');
status.setAttribute('type','text');
status.setAttribute('placeholder','');
status.id = 'status';
status.readOnly = true;
document.body.appendChild(status);
status.style.margin = '10px';
status.style.width = '300px';
```

This is not strictly necessary, but it helps keep the UI as simple as possible.

<!-- [Gist Url](https://gist.github.com/mcsee/25c2b2fa74c035c8b1d2dd4d656289c9) -->

```javascript
// Step 17
/* create variable named 'rowindex' starting at 0 */

var rowIndex = game.wordsAttempted().length;
```

*rowIndex* variable is no longer global. We compute it tied to the attempts tried on the game.

We are reifying the state into our Game object

And this is when all magic happens.

We replace the algorithmic and error prune letter count computations with our more robust ones

<!-- [Gist Url](https://gist.github.com/mcsee/d379d0e674d4a679bd4b0bbf85e839f3) -->

```javascript
// Step 24
	  
/* when clicking validate button we add an attempt */

document.getElementById('validate').
	addEventListener('click', function(event) {
  var cells = document.querySelectorAll('td');
  var currentLetters = '';
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
        currentLetters += cells[i].innerHTML ;
    }
  }  
  var status = document.getElementById('status');
  status.value = '';
  try { 
    var attempt = new Word(currentLetters);
    game.addAttempt(attempt);  
  }
  catch (error) { 
    status.value = error.message; 
    return;
  }  

  var correctMatches = 
      attempt.matchesPositionWith(winnerWord); 
  var incorrectMatches = 
      attempt.matchesIncorrectPositionWith(winnerWord); 
  
  for (var i = rowIndex * 5; i < (rowIndex + 1) * 5; i++) { 
    if (correctMatches.includes(i-(rowIndex * 5)+1)) { 
        cells[i].style.backgroundColor = '#aedb95'; 
    }
    if (incorrectMatches.includes(i-(rowIndex * 5)+1)) { 
        cells[i].style.backgroundColor = '#edc953'; 
    }
  }
  if (game.hasWon()){
     status.value = 'Congratulations. You won!';
  }
  if (game.hasLost()){
     status.value = 'Sorry. You have lost! Correct word was ' + 
			 winnerWord.word();
  }
  document.getElementById('input').value = '';
  rowIndex = game.wordsAttempted().length;
});
```

We put it as a very long function in the same event for clarification.

The model now raises exceptions following the [fail-fast principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) and we can show them to the final user.

This method requires heavy refactorization in a future article.

Finally, we reset the game.

This was one of the many mistakes corrected from the first version.

<!-- [Gist Url](https://gist.github.com/mcsee/be59d4aefd61fedfb89c2bfd4ab67b9f) -->

```javascript
// Step 27

/* when pressing remove, 
chose randomly the secret word from the words collection */ 

document.getElementById('remove').
    addEventListener('click', function(event) {
  var randomIndex = Math.floor(Math.random() * words.length);
  winnerWord = words[randomIndex];
  game = new Game(words, winnerWord);   
});
```

There is [repeated code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md) at the start of the script.

You can play with the final version [here](https://mcsee.github.io/wordle/Centaur/) 

Source code is [here](https://mcsee.github.io/wordle/Centaur/)

And a working repl.it [here](https://replit.com/@mcsee/Centaur-TDD)

## The Disclaimer

The final code is full of refactoring opportunities and several [code smells](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md).

It is a proof of concept, not an elegant and final solution.

# Credits 🙏

Image credit: A funny Twitter thread asking AIs to draw a Centaur

[X](https://twitter.com/Alt_Products_AI/status/1571835127101100033)

 