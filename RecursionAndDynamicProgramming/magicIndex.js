const findMagicIndex = (arr, startIdx, endIdx) => {
  console.log('calling on', arr, startIdx, endIdx);
  const midIdx = Math.floor((endIdx + startIdx) / 2);
  console.log('mid is', midIdx)
  if (arr[midIdx] === midIdx) {
    return midIdx;
  } else if (endIdx - startIdx <= 1) {
    return null;
  } else if (arr[midIdx] > midIdx) {
    return findMagicIndex(arr, startIdx, midIdx);
  } else if (arr[midIdx] < midIdx) {
    return findMagicIndex(arr, midIdx, endIdx);
  }
}

// lesson: if you're doing divide and conquer on an array,
// and using indices, then make the endIdx exclusive. and use
// Math.floor to determine the midpoint.this way you'll be able
// to zoom in on one el in a leaf case

const sampleArr = [-1, 1, 3, 4, 5];
const ans = findMagicIndex(sampleArr, 0, sampleArr.length);
console.log(ans);



// extension (pseudocode):
// what the array can have repeated elements?
// imagine you have the following array:
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] indices
// [-1,2, 2, 2, 2, 3, 4, 5, 6, 8, 9] values

// at index 5 you have the value 3
// in the prev paradigm, since 3 < 5, you'd have to search through
// the right side

// but you also have to search through the left side
// since the index is 5, and the val is 3
// you know that indices 3 to 5 cannot contain values greater than 3
// hence they are invalid
// therefore on the left side you only have to search from 0 to 2 (where we find our answer)