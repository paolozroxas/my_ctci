const URLify = (str) => {
  let composite = "";
  str.split("").forEach((char) => {
    if (char === " ") {
      composite += "%20";
    } else {
      composite += char;
    }
  });

  return composite;
}
// O(n^2) since you are creating a new string every time you add an element
// however, if you use an array with sufficient space, this would be O(n)

console.log(URLify("Mr John Smith"));




// what if you needed to do this completely in place?
const URLifyInPlace = (str) => {
  const strArr = str.split("");
  const spaceCount = strArr.reduce((acc, char) => (acc + (char === " " ? 1 : 0)), 0);
  const oldLength = strArr.length;
  const newLength = strArr.length + spaceCount * 2;

  // iterate from the end of the old string,
  // filling in the array from the back
  let newPointer = newLength - 1;
  for (let oldPointer = oldLength - 1; oldPointer >= 0; oldPointer--) {
    if (strArr[oldPointer] === " ") {
      strArr[newPointer - 2] = "%";
      strArr[newPointer - 1] = "2";
      strArr[newPointer - 0] = "0";
      newPointer -= 3;
    } else {
      strArr[newPointer] = strArr[oldPointer];
      newPointer--;
    }
  }
  
  return strArr.join("");
}
// O(n)


// mistakes:
// remember the parens around the ternary operator!
// don't confuse newPointer and oldPointer

console.log(URLifyInPlace("Mr John Smith"));