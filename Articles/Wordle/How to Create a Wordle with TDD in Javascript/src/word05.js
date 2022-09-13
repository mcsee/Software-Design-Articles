class Word {
  constructor(word) {
    if (word.length < 5)
      throw new Error('Too few letters. Should be 5');
    if (word.length > 5)
      throw new Error('Too many letters. Should be 5');
    if (word.indexOf('*') > -1) 
      throw new Error('Word has invalid letters');
  }
}