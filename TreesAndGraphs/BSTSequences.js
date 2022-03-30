const BSTSequences = (tree) => {
  debugger
  if (!tree) {
    return [];
  }

  const leftPossibilities = BSTSequences(tree.left);
  const rightPossibilities = BSTSequences(tree.right);
  
  if (leftPossibilities.length === 0 && rightPossibilities.length === 0) {
    return [ [ tree.value ] ];
  } else if (rightPossibilities.length === 0) {
    return appendToStart(tree.value, leftPossibilities);
  } else if (leftPossibilities.length === 0) {
    return appendToStart(tree.value, rightPossibilities);
  } else {
    let results = [];
    leftPossibilities.forEach((leftPos) => {
      rightPossibilities.forEach((rightPos) => {
        results = results.concat(mergePossibilities(leftPos, rightPos, []));
      });
    });

    return appendToStart(tree.value, results);
  }
}

const mergePossibilities = (arr1, arr2, output) => {
  if (arr1.length === 0 && arr2.length === 0) {
    return output.length === 0 ? [] : [output];
  }

  let results = [];

  if (arr1.length > 0) {
    results = results.concat(mergePossibilities(arr1.slice(1), arr2, output.concat([arr1[0]])));
  }
  if (arr2.length > 0) {
    results = results.concat(mergePossibilities(arr1, arr2.slice(1), output.concat([arr2[0]])));
  }

  return results;
}

const appendToStart = (el, arr) => (arr.map((list) => [el].concat(list)));

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new Node(4, new Node(2, new Node(1), new Node(3)), new Node(6, new Node(5), new Node(7)));

const smallTree = new Node(2, new Node(1), new Node(3));

const partialTree = new Node(4, new Node(2), new Node(6, new Node(5), new Node(7)));

console.log(BSTSequences(tree));
console.log(BSTSequences(partialTree));
console.log(BSTSequences(smallTree));