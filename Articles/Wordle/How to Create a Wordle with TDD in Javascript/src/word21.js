matchesPositionWith(correctWord) {
   var positions = [];
   for (var currentPosition = 0; 
      currentPosition < this.letters().length; 
      currentPosition++) {
       if (this.letters()[currentPosition] == correctWord.letters()[currentPosition]) {
             positions.push(currentPosition + 1); 
             //Humans start counting on 1
       }
   }
   return positions;
}