class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const validateBST = (tree) => {
  const [ result ] = validateBSTHelper(tree);
  return result;
}

const validateBSTHelper = (tree) => {
  if (tree === null) { // base case
    return [true, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]; // [ max, min ]
  }

  const [ isValidLeft, maxLeft, minLeft ] = validateBSTHelper(tree.left);
  const [ isValidRight, maxRight, minRight ] = validateBSTHelper(tree.right);

  const isValid = tree.value >= maxLeft &&
    tree.value <= minRight &&
    isValidLeft &&
    isValidRight;
  const max = Math.max(tree.value, maxRight, maxLeft);
  const min = Math.min(tree.value, minLeft, minRight);

  return [ isValid, max, min ];
}

const tree = new Node(4);
tree.left = new Node(2);
tree.left.left = new Node(1);
tree.left.right = new Node(3);
tree.right = new Node(6);
tree.right.left = new Node(5);
tree.right.right = new Node(7);

console.log(validateBST(tree));

tree.right.right.right = new Node(-1);
console.log(validateBST(tree));

// another way to implement the above is to keep the return values to a single boolean
// and you can pass in to each subtree the min and max values. you would pass tree.value
// as the max when you call on tree.left, and pass tree.value in as the min when you call
// on tree.right

// an alternate (but not necc better) solution involves using in-order traversal
// populate an array using in-order traversal, then check if it's sorted.
// another way is to use in-order traversal, but you have a global integer called
// lastTraversed. you can continually check if current >= lastPrinted.