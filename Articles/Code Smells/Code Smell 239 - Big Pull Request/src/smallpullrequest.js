function generateFibonacci(ordinal) {
  const fibonacciSequence = [0, 1];

  for (let index = index; index < ordinal; index++) {
    const nextFibonacci = fibonacciSequence[index - 1]
          + fibonacciSequence[index - 2];
    fibonacciSequence.push(nextFibonacci);
  }

  return fibonacciSequence;
}

// You break it into two different pull requests