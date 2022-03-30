// unlike in permutationsWithoutDups.js, here you have to return unique strings
// even if there are duplicate chars in the input string
const getPermutations = (str) => {
  const solutions = getPermutationsHelper(str);
  solutions.sort();

  return solutions.filter((solution, idx) => {
    return solution !== solutions[idx - 1];
  });
}

const getPermutationsHelper = (str) => {
  if (str.length <= 1) {
    return [ str ];
  }

  let solutions = [];
  str.split("").forEach((char, idx) => {
    const prevSolutions = getPermutations(str.substring(0, idx) + str.substring(idx + 1, str.length))
      .map((prevSolution) => {
        return char + prevSolution;
      });
    
    solutions = solutions.concat(prevSolutions);
  });

  return solutions;
}

const ans = getPermutations("aabc", {});

console.log("method 1", ans.length, ans);

// the above takes care of dups by filtering the strings at the end




// wait. what if you unique the chars in the string at the start of each call
// but then don't take the letter out in the recursive call

const getPermutations2 = (str) => {
  // populate a char hash
  const chars = {};
  str.split("").forEach((char) => {
    if (chars[char]) {
      chars[char]++;
    } else {
      chars[char] = 1;
    }
  });

  return getPermutations2Helper(chars);
}

const getPermutations2Helper = (chars) => {
  // get unique characters remaining
  const charArr = Object.keys(chars).filter((char) => {
    return chars[char] >= 1;
  });

  // Base Case
  if (charArr.length === 1 && chars[charArr[0]] === 1) {
    return charArr;
  }

  // Recursive Case
  const currSolutions = [];

  charArr.forEach((char) => {
    // increment then decrement char count after you traverse that branch
    chars[char]--;
    const prevSolutions = getPermutations2Helper(chars);
    chars[char]++;

    prevSolutions.forEach((prevSolution) => {
      currSolutions.push(char + prevSolution);
    });
  });

  return currSolutions;
}

const ans2 = getPermutations2("aabc");
console.log("method 2", ans2.length, ans2);