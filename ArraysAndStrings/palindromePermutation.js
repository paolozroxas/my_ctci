const palindromePermutation = (str) => {
  const letters = {};
  str.split("").forEach((char) => {
    if (letters[char]) {
      letters[char]++;
    } else {
      letters[char] = 1;
    }
  });

  let allowOdd = str.length % 2 !== 0; // allow a single odd letter if the string length is odd
  const counts = Object.values(letters);
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] % 2 !== 0 && !allowOdd) { // you've used up your odd letter
      return false;
    } else if (counts[i] % 2 !== 0 && allowOdd) {
      allowOdd = false;
    }
  }

  return true;
}

console.log(palindromePermutation('tactcoa'));
console.log(palindromePermutation('carrace'));
console.log(palindromePermutation('anna'));
console.log(palindromePermutation('helloworld'));


// there are a few (minor) optimizations here
// 1. we don't have to run through the entire hash at the end
// instead we keep track of an oddCounter variable
// if the count is odd, increment oddCounter, else decrement it
// at the end, check if oddCounter is at most 1 (or 0 if the string is even)

// utilize an integer as a bit vector (unsure how to do in JS) (see CTCI)
// use 25 bits to represent each letter. 1 is odd, 0 is even
// at the end of the function, you have the integer num
// get num AND (num - 1). if this is === 0, then you have at most 1 odds