const tripleStep = (n, i) => {
  if (i === n) {
    return 1;
  } else if (i > n) {
    return 0;
  }

  let solution = 0;
  for (let k = 1; k <= 3; k++) {
    solution += tripleStep(n, i+k);
  }

  return solution;
}

console.log(tripleStep(3, 0));