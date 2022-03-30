const pathsWithSum = (tree, target) => {
 return pathsWithSumHelper(tree, target, [])
}

const pathsWithSumHelper = (tree, target, paths) => {
  if (!tree) {
    return 0;
  }

  const newPaths = paths.map((path) => (path.concat(tree.value)));
  newPaths.push([ tree.value ]);

  // get number of paths that sum to target
  let validPathCount = newPaths.filter((path) => {
    return target === path.reduce((acc, pathEl) => {
      return acc + pathEl;
    }, 0);
  }).length;

  validPathCount += pathsWithSumHelper(tree.left, target, newPaths);
  validPathCount += pathsWithSumHelper(tree.right, target, newPaths);

  return validPathCount;
}

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const manyPaths = new Node(4, new Node(1, new Node(1), new Node(4)), new Node(3, new Node(5), new Node(2)));

const solution = pathsWithSum(manyPaths, 5); // 4 paths
const solution2 = pathsWithSum(manyPaths, 2); // 2 paths
const solution3 = pathsWithSum(manyPaths, 4); // 2 paths
const solution4 = pathsWithSum(manyPaths, 6); // 1 path
const solution5 = pathsWithSum(manyPaths, 10); // 0 paths

console.log(solution);
console.log(solution2);
console.log(solution3);
console.log(solution4);
console.log(solution5);
