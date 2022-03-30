class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const checkBalanced = (tree) => {
  if (tree === null) {
    return true;
  }
  const leftHeight = getHeight(tree.left);
  const rightHeight = getHeight(tree.right);

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }

  return checkBalanced(tree.left) && checkBalanced(tree.right);
}

const getHeight = (tree) => {
  if (tree === null) { // base case
    return -1;
  } else {
    const leftHeight = getHeight(tree.left);
    const rightHeight = getHeight(tree.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }
}

// const tree = new Node(1);
// tree.left = new Node(2);
// tree.right = new Node(3);
// tree.left.left = new Node(4);
// console.log(checkBalanced(tree));
// tree.left.left.left = new Node(4);
// console.log(checkBalanced(tree));

// this is nlogn time complexity, because each node is visited once per node above it



const checkBalancedOptimized = (tree) => {
  const [ isBalanced ] = checkBalancedOptimizedHelper(tree);
  return isBalanced;
}

const checkBalancedOptimizedHelper = (tree) => {
  if (tree === null) { // base case
    return [true, -1]; // [ isBalanced, height ]
  }
  const [ leftIsBalanced, leftHeight ] = checkBalancedOptimizedHelper(tree.left);
  const [ rightIsBalanced, rightHeight ] = checkBalancedOptimizedHelper(tree.right);

  const isBalanced = Math.abs(leftHeight - rightHeight) <= 1 &&
    leftIsBalanced &&
    rightIsBalanced;
  const height = 1 + Math.max(leftHeight, rightHeight);

  return [ isBalanced, height ];
}

// this is better because it runs in O(n) time
// and O(H) space, where H is the size of the tree. This is because
// after you process the left node, the call stack is garbage collected
// before the right node. Hence the maximum the call stack gets is the
// height of the tree

const tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.left.left = new Node(4);
console.log(checkBalancedOptimized(tree));
tree.left.left.left = new Node(4);
console.log(checkBalancedOptimized(tree));