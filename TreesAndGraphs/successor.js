const successor = (tree) => {
  if (tree.right !== null) {
    return getLeftmostValue(tree.right);
  } else {
    return getClosestParentOnTheRight(tree);
  }
}

const getLeftmostValue = (tree) => {
  let current = tree;
  while (current.left !== null) {
    current = current.left
  }
  return current;
}

const getClosestParentOnTheRight = (tree) => {
  let current = tree;
  let parent = tree.parent;
  while (parent !== null) {
    if (parent.left === current) {
      return parent;
    } else {
      current = parent;
      parent = current.parent;
    }
  }
  return null;
}

class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

const tree = new Node(4);

tree.left = new Node(2);
tree.left.parent = tree;

tree.right = new Node(6);
tree.right.parent = tree;

tree.left.left = new Node(1);
tree.left.left.parent = tree.left;

tree.left.right = new Node(3);
tree.left.right.parent = tree.left;

tree.right.left = new Node(5);
tree.right.left.parent = tree.right;

tree.right.right = new Node(7);
tree.right.right.parent = tree.right;

console.log(successor(tree.left.right).value === 4);
console.log(successor(tree).value === 5);
console.log(successor(tree.right.left).value === 6)
console.log(successor(tree.right.right) === null);

// i'm thinking that if we wanted to get the kth smallest element in a BST
// we would get the leftmost node, set it to current, then do
// current = successor(current) k times