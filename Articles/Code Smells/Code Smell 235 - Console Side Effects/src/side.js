function drawChristmasTree(height) {
  let tree = '';
  let currentFloor = 1;

  while (currentFloor <= height) { 
      tree += ' '.repeat(height - currentFloor) + '🎄'.repeat(currentFloor)
        + '\n';
      currentFloor++;
  }

  // This function has side effects
  // You cannot test it
  console.log(tree);
}


drawChristmasTree(7);