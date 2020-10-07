const recursiveMultiply = (x, y) => {
  if (x === 0 || y === 0) {
    return 0;
  }

  if (y === 1) {
    return x;
  }

  return x + recursiveMultiply(x, y - 1);
}

console.log(recursiveMultiply(4, 5));