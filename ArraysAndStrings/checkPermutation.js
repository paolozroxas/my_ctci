const checkPermutation1 = (str1, str2) => {
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}
// O(nlog(n)) where n is the sum of lengths

const checkPermutation2 = (str1, str2) => {
  const letters = {};

  str1.split("").forEach((letter) => {
    if (letters[letter]) {
      letters[letter]++;
    } else {
      letters[letter] = 1;
    }
  });
  
  for (let i = 0; i < str2.length; i++) {
    if (letters[str2[i]] > 0) {
      letters[str2[i]]--;
    } else {
      return false;
    }
  }
  
  return Object.values(letters).every((count) => (count === 0));
}
//  O(n) where n is the sum of lengths

console.log(checkPermutation1('abc', 'cba'))
console.log(checkPermutation1('abcc', 'cbab'))

console.log(checkPermutation2('abc', 'cba'))
console.log(checkPermutation2('abcc', 'cbab'))