matchesIncorrectPositionWith(correctWord) {     
    const correctPositions = this.matchesPositionWith(correctWord);
    var incorrectPositions = [];
    var correctWordLetters = correctWord.letters();
    var ownWordLetters = this.letters();
    for (var currentPosition = 0;
         currentPosition < 5;
         currentPosition++) {
      if (correctPositions.includes(currentPosition + 1)) {
        // You can use these wildcards 
        // since they are no valid letters
        correctWordLetters.splice(currentPosition, 1, '*');
        ownWordLetters.splice(currentPosition, 1, '+');
      }
    }    
    for (var currentPosition = 0;
         currentPosition < 5; 
         currentPosition++) {
      const positionInCorrectWord = correctWordLetters.
      indexOf(ownWordLetters[currentPosition]);
      if (positionInCorrectWord != -1) {        
        correctWordLetters.splice(positionInCorrectWord, 1, '*');
        ownWordLetters.splice(currentPosition, 1, '+');
        incorrectPositions.push(currentPosition + 1); 
      }
    }    
    return incorrectPositions;
  }