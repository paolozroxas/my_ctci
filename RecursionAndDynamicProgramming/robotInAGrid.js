const _ = require("lodash");

const findPath = (grid, current, moveType) => {
  console.log("calling on", current)
  if (
      current[0] < 0 ||
      current[0] >= grid.length ||
      current[1] < 0 ||
      current[1] >= grid[0].length
    ) {
      console.log("invalid current coords")
      return null;
    }

  console.log(`${grid.length - 1}, ${grid[0].length - 1}`)
  console.log(`${current[0]}, ${current[1]}`)
  console.log(grid.length - 1 === current[0] && grid[0].length - 1 === current[1])
  if (current[0] === grid.length - 1 && current[1] === grid[0].length - 1) {
    console.log("found solution");
    return moveType;
  }

  if (grid[current[0]][current[1]] !== 1) {
    console.log("current coord not open")
    return null;
  }

  const newGrid = _.cloneDeep(grid);
  newGrid[current[0]][current[1]] = 2;

  const rightResult = findPath(newGrid, [current[0], current[1] + 1], "r");

  if (rightResult !== null) {
    return moveType + rightResult;
  }

  const downResult = findPath(newGrid, [current[0] + 1, current[1]], "d");

  if (downResult !== null) {
    return moveType + downResult;
  }

  return null;
}

const sampleGrid = [
  [1, 1, 1],
  [3, 1, 3],
  [3, 1, 1]
];

const ans = findPath(sampleGrid, [0, 0], "");
console.log(ans);