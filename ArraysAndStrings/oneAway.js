const oneAway = (str1, str2) => {
  if (str1 === str2) { // strings are identical
    return false;
  } else if (str1.length === str2.length) { // strings are the same length
    let hasDiff = false;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i] && hasDiff) {
        return false;
      } else if (str1[i] !== str2[i] && !hasDiff) {
        hasDiff = true;
      }
    }

    return true;
  } else { // strings are different lengths
    const letters = {};

    str1.split("").forEach((letter) => {
      if (letters[letter]) {
        letters[letter]++;
      } else {
        letters[letter] = 1;
      }
    });
    console.log(letters)

    str2.split("").forEach((letter) => {
      if (letters[letter]) {
        letters[letter]--;
      } else {
        letters[letter] = -1;
      }
    });

    let hasOneChange = false;
    const counts = Object.values(letters);
    for (let i = 0; i < counts.length; i++) {
      if (Math.abs(counts[i]) > 1) {
        return false;
      } else if (Math.abs(counts[i]) === 1 && hasOneChange) {
        return false;
      } else if (Math.abs(counts[i]) === 1 && !hasOneChange) {
        hasOneChange = true;
      }
    }

    return true;
  }
} 

console.log(oneAway("hello", "helloa"));
console.log(oneAway("hello", "helo"));
console.log(oneAway("hello", "hella"));
