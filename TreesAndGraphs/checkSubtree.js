const _ = require('lodash');

const checkSubtree = (t1, t2) => {
  return checkSubtreeHelper(t1, t2, t2);
}

const checkSubtreeHelper = (t1, t2, t2Node) => {
  if (!t1) {
    return !t2Node; // return true if both t1 and t2Node are null
  }  

  if (t2Node && t1.value === t2Node.value) {
    return checkSubtreeHelper(t1.left, t2, t2Node.left) &&
      checkSubtreeHelper(t1.right, t2, t2Node.right);
  } else {
    return checkSubtreeHelper(t1.left, t2, t2) ||
      checkSubtreeHelper(t1.right, t2, t2);
  }
}

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new Node(4, new Node(2, new Node(1), new Node(3)), new Node(6, new Node(5), new Node(7)));

const subtree = new Node(6, new Node(5), new Node(7));
const clone = _.cloneDeep(tree);
const oneNode = new Node(5);

const different = new Node(6, new Node(5), new Node(7, new Node(6.5)));

console.log(checkSubtree(tree, subtree)); // true
console.log(checkSubtree(tree, clone)); // true
console.log(checkSubtree(tree, oneNode)) // true

console.log(checkSubtree(tree, different)) // false