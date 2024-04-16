const pets = '😺🐶😺';

const justDogs = pets.replaceAll('😺', '🐩');
// Or
const justDogs = pets.replace(/😺/g, '');

const catsArePresent = justDogs.includes('😺');
// returns false
