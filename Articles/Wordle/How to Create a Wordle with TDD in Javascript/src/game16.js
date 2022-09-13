class Game {
  constructor(validWords) {
    this._attempts = [];
    this._validWords = validWords;
  }   
  addAttempt(word) {
    if (!this._validWords.some(validWord => validWord.sameAs(word))) {
      throw new Error(word.letters() + " is not a valid word");
    }
    this._attempts.push(word);    
  }
}

// fix previous tests
// change 

const game = new Game([]);

// to 

const game = new Game([new Word('loser')]);

Also add: 
Class Word {
 sameAs(word) {
    return word.word() == this.word();
  }
}

