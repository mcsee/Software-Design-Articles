lettersAtCorrectPosition(correctWord) {
    return this.matchesPositionWith(correctWord).map(position => this.letters()[position -1 ]);
}
  
lettersAtWrongtPosition(correctWord) {
    return this.matchesIncorrectPositionWith(correctWord).map(position => this.letters()[position -1]);
}