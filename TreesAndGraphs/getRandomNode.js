const _ = require('lodash');

const getRandomNode = (tree) => {
  if (!tree) {
    return null;
  }

  const reservoirState = {
    reservoir: null,
    idx: 1
  }

  getRandomNodeHelper(tree, reservoirState);
  return reservoirState.reservoir;
}

const getRandomNodeHelper = (tree, reservoirState) => {
  if (!tree) {
    return;
  }

  if (!reservoirState.reservoir) {
    reservoirState.reservoir = tree.value;
    reservoirState.idx++;
  } else {
    const isReplaced = Math.random() <= 1 / reservoirState.idx;
    if (isReplaced) {
      reservoirState.reservoir = tree.value;
    }
    reservoirState.idx++;
  }

  getRandomNodeHelper(tree.left, reservoirState);
  getRandomNodeHelper(tree.right, reservoirState);
}

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const tree = new Node(4, new Node(2, new Node(1), new Node(3)), new Node(6, new Node(5), new Node(7)));

const dist = _.times(100, () => getRandomNode(tree));

console.log(dist); // should seem uniformly distributed