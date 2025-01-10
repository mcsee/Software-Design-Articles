function createChristmasTree(height) {
  let tree = '';
  let currentFloor = 1;

  while (currentFloor <= height) { 
      tree += ' '.repeat(height - currentFloor) +
        '🎄'.repeat(currentFloor)
        + '\n';
      currentFloor++;
  }

  return tree;
}

// The side effects are OUTSIDE the function
console.log(createChristmasTree(7));

// You can also test it 

const createChristmasTree = createChristmasTree(7);

describe('createChristmasTree', () => {
  it('should create a Christmas tree of the specified height',
     () => {
    const expectedTree = 
      '      🎄\n' +
      '     🎄🎄\n' +
      '    🎄🎄🎄\n' +
      '   🎄🎄🎄🎄\n' +
      '  🎄🎄🎄🎄🎄\n' +
      ' 🎄🎄🎄🎄🎄🎄\n' +
      '🎄🎄🎄🎄🎄🎄🎄\n';

    const result = createChristmasTree(7);
    expect(result).toEqual(expectedTree);
  });

});
