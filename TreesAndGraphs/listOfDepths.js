class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const listOfDepths = (tree) => {
  const linkedLists = [];
  processDepth(tree, 0, linkedLists);
  return linkedLists;
}

const processDepth = (tree, depth, linkedLists) => {
  if (tree === null) {
    return
  } else {
    const newNode = new LinkedListNode(tree.value);
    const linkedList = linkedLists[depth];
    newNode.next = linkedList;
    linkedLists[depth] = newNode;

    processDepth(tree.left, depth + 1, linkedLists);
    processDepth(tree.right, depth + 1, linkedLists);
  }
}


const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
console.log(listOfDepths(tree));