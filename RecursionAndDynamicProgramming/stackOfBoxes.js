const stackOfBoxes = (boxArr) => {
  const boxes = boxArr.sort((b1, b2) => {
    const magnitude1 = b1.reduce((acc, val) => acc + val);
    const magnitude2 = b2.reduce((acc, val) => acc + val);
    return magnitude2 - magnitude1;
  });

  return stackOfBoxesHelper(boxes, 0, []);
}

const stackOfBoxesHelper = (boxes, idx, stack) => {
  if (!validateStack(stack)) {
    return getStackHeight(stack.slice(0, stack.length - 1));
  }

  if (idx === boxes.length) {
    return getStackHeight(stack);
  }

  let max = 0;
  for (let i = idx; i < boxes.length; i++) {
    const newHeight = stackOfBoxesHelper(boxes, idx+1, stack.concat([boxes[i]]));
    max = Math.max(max, newHeight);
  }

  return max;
}

const validateStack = (stack) => {
  if (stack.length <= 1) {
    return true;
  }

  const lastItem = stack[stack.length - 1];
  const prevItem = stack[stack.length - 2];

  for (let i = 0; i < lastItem.length; i++) {
    if (lastItem[i] >= prevItem[i]) {
      return false;
    }
  }

  return true;
}

const getStackHeight = (stack) => {
  return stack.reduce((acc, val) => (acc + val[0]), 0);
}


const boxes = [
  [1, 1, 1],
  [2, 2, 2],
  [3, 2, 2],
  [5, 5, 2]
]

console.log(stackOfBoxes(boxes));