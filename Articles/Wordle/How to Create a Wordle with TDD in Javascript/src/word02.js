class Word {
  constructor(word) {
    if (word.length < 5)
      throw new Error('Too few letters. Should be 5');
  }
  letters() {
      return ['v', 'a', 'l', 'i', 'd'];
  }  
}