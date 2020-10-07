const isUnique = (str) => {
  const letters = {};
  for (let i = 0; i < str.length; i++) {
    if (letters[str[i]]) {
      return false;
    }
    letters[str[i]] = true;
  }
  return true;
}

console.log(isUnique('abc'));
console.log(isUnique('abb'));

// this is linear. space is the same
// O(min(character set size, n))
