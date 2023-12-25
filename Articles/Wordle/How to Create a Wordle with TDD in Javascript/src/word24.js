 class Word {
  matchesIncorrectPositionWith(correctWord) {
      var positions = [];
      for (var currentPosition = 0;
           currentPosition < 5; 
           currentPosition++) {
        if (correctWord.letters().
            includes(this.letters()[currentPosition])) {
             positions.push(currentPosition + 1);
        }
      }
      return positions.filter(function(position) {
        return !this.matchesPositionWith(correctWord).
         includes(position);
     }.bind(this));
    }
  }
}