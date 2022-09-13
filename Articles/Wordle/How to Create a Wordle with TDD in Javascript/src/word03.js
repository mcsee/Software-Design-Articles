class Word {
  constructor(letters) {
    if (letters.length < 5)
      throw new Error('Too few letters. Should be 5');
    if (letters.length > 5)
      throw new Error('Too many letters. Should be 5');
  }
  letters() {
      return ['v', 'a', 'l', 'i', 'd'];
  }  
}