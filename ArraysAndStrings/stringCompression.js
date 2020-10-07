const stringCompression = (str) => {
  let currentLetter = null;
  let currentCount = 1;
  let composite = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== currentLetter) { // change in letter
      composite += `${currentLetter || ""}${currentCount > 1 ? currentCount : ""}`;
      currentLetter = str[i];
      currentCount = 1;
    } else { // repeated letter
      currentCount ++;
    }

    if (i === str.length - 1) {
      composite += `${currentLetter || ""}${currentCount > 1 ? currentCount : ""}`;
    }
  }
  return composite.length < str.length ? composite : str;
}

console.log(stringCompression("hello"));
console.log(stringCompression("hell"));
console.log(stringCompression("aabbbcccc"));

// Optimizations:

// 1. string concatenation is expensive, O(nm) where n is length of original string,
// and m is the number of character sequences you concat.
// Instead build a string array and then join it once at the end

// 2. instead of compressing the string then seeing if the length is less than
// that of the original, you can precalculate the length of the compressed string.
// this would save us a lot of work if the string doesn't have many repeating characters.

