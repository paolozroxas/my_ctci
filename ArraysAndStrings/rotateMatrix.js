const rotateMatrix = (matrix) => {
  const newMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatrix.push([]);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      newMatrix[j][matrix.length - 1 - i] = matrix[i][j]
    }
  }

  return newMatrix;
}


// what if you have to do it in place?

const rotateMatrixInPlace = (matrix) => {
  const layerCount = Math.floor(matrix.length / 2);
  for (let layer = 0; layer < layerCount; layer++) {
    rotateLayer(matrix, layer);
  }
  return matrix;
}

const rotateLayer = (matrix, layer) => {
  let temp = null;
  const numberOfIndicesPerSideToRotate = matrix.length - 1 - ( 2 * layer);
  for (let k = 0; k < numberOfIndicesPerSideToRotate; k++) {
    let i = layer;
    let j = layer + k;
    let newi = j;
    let newj = matrix.length - 1 - i;
    temp = matrix[i][j];
    for (let l = 0; l < 4; l++) { // do this 4 times, once for each side
      const newTemp = matrix[newi][newj];
      matrix[newi][newj] = temp;
      temp = newTemp;

      i = newi;
      j = newj;
      newi = j;
      newj = matrix.length - 1 - i;
    }
  }
  return matrix;
}

const matrix1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
];

const matrix2 = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
];

const matrix3 = [
 [1, 2, 3, 4, 5, 6],
 [7, 8, 9, 10,11,12],
 [13,14,15,16,17,18],
 [19,20,21,22,23,24],
 [25,26,27,28,29,30],
 [31,32,33,34,35,36],
]

console.log(rotateMatrix(matrix1));
console.log(rotateMatrix(matrix2));
console.log(rotateMatrix(matrix3));


console.log(rotateMatrixInPlace(matrix1));
console.log(rotateMatrixInPlace(matrix2));
console.log(rotateMatrixInPlace(matrix3));