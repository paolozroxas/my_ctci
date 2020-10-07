const firstCommonAncestor = (root, val1, val2) => {
  if (root.value === val1 || root.value === val2) {
    return root.value;
  }
  
  const isNode1InLeft = covers(root.left, val1);
  const isNode2InLeft = covers(root.left, val2);

  if (isNode1InLeft !== isNode2InLeft) {
    return root.value;
  } else if (isNode1InLeft) {
    return firstCommonAncestor(root.left, val1, val2);
  } else {
    return firstCommonAncestor(root.right, val1, val2);
  }

}

const covers = (root, value) => {
  if (!root) {
    return false;
  } else if (root.value === value) {
    return true;
  }

  return covers(root.left, value) ||
    covers(root.right, value);
}

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6), new Node(7)));
//    1
//  2   3
// 4 5 6 7

// console.log(firstCommonAncestor(tree, 4, 5)); // 2
// console.log(firstCommonAncestor(tree, 4, 7)); // 1
// console.log(firstCommonAncestor(tree, 3, 6)); // 3
// console.log(firstCommonAncestor(tree, 1, 5)); // 1


// common ancestor can be defined as the unique node for which
// node1 is in one subtree and node2 is in the other subtree
// i put forth that these conditions will be unique to a single node
// ^ this misses out the case where node1 is an ancestor of node2 etc.

// Edge case:
// what if one of the nodes asked for is not in the tree?
// This is addressed in the optimization below

// Time complexity is O(n)
// At each node, you call the func on half of the tree
// so first node is 2 * n/2 = n
// next node is 2 * n/4 = n/2
// ... 2 * n/8 = n/4
// This series sums to n / (1 - r) = n / (1 - 1/2) = 2n


// Optiization:
// there is some redundancy in the helper function 'cover'
// you can make a pure recursive function

const firstCommonAncestor2 = (root, val1, val2) => {
  if (!root) {
    return null;
  }

  if (root.value === val1 || root.value === val2) {
    return root.value;
  }

  const leftResult = firstCommonAncestor2(root.left, val1, val2);
  const rightResult = firstCommonAncestor2(root.right, val1, val2);
  
  if (leftResult !== null && rightResult !== null) {
    return root.value; // found common ancestor
  } else if (leftResult !== null) {
    return leftResult;
  } else if (rightResult !== null) {
    return rightResult;
  } else {
    return null;
  }
}

console.log(firstCommonAncestor2(tree, 4, 5)); // 2
console.log(firstCommonAncestor2(tree, 4, 7)); // 1
console.log(firstCommonAncestor2(tree, 3, 6)); // 3
console.log(firstCommonAncestor2(tree, 1, 5)); // 1

console.log(firstCommonAncestor2(tree, 4, 0)); // null