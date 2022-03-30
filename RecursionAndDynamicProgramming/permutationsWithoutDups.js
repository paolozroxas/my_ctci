const getPermutations = (str) => {
  if (str.length <= 1) {
    return [ str ];
  }

  let solutions = [];
  str.split("").forEach((char, idx) => {
    const prevSolutions = getPermutations(str.substring(0, idx) + str.substring(idx + 1, str.length))
      .map((solution) => (char + solution));

    solutions = solutions.concat(prevSolutions);
  });

  return solutions;
}

const ans = getPermutations("abcd");

console.log(ans.length, ans);