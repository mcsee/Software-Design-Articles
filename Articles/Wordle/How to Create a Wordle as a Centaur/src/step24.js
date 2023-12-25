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

  var correctMatches = attempt.matchesPositionWith(winnerWord); 
  var incorrectMatches = attempt.matchesIncorrectPositionWith(winnerWord); 
  
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
