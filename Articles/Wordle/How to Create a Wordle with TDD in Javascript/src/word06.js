class Word {
  constructor(word) {
    if (word.length < 5)
      throw new Error('Too few letters. Should be 5');
    if (word.length > 5)
      throw new Error('Too many letters. Should be 5');
    // Refactor  
    if (!word.match(/^[a-z]+$/i)) 
      throw new Error('word has invalid letters');
    //   
}