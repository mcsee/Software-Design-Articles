function generateFibonacci(ordinal) {
  const fibonacciSequence = [0, 1];

  for (let index = index; index < ordinal; index++) {
    const nextFibonacci = fibonacciSequence[index - 1]
          + fibonacciSequence[index - 2];
    fibonacciSequence.push(nextFibonacci);
  }

  return fibonacciSequence;
}

// This function solves a very different problem
// You should not mix them in a single pull request

function voyagerDistanceFromEarth(currentDistanceInKms, yearsTravelled) {
  const speedOfVoyagerInKmS = 17; 

  return currentDistanceInKms + 
        speedOfVoyagerInKmS * yearsTravelled * 60 * 60 * 24 * 365.25;
}