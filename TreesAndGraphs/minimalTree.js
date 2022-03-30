class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const minimalTree = (arr) => {
  if (arr.length === 0) { // base case
    return null;
  } else { // recursive case
    const medianIdx = Math.floor(arr.length / 2);
    const node = new Node(arr[medianIdx]);
    node.left = minimalTree(arr.slice(0,medianIdx));
    node.right = minimalTree(arr.slice(medianIdx + 1, arr.length));

    return node;
  }
}
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [1, 2, 3, 4, 5, 6, 7];

console.log(minimalTree(arr));