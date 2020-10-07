const parens = (n) => {
  const answers = parensHelper(n);
  return stringifyParens(answers);
}

class Paren {
  constructor() {
    this.children = [];
  }
}

const parensHelper = (n) => {
  if (n === 1) {
    return [[new Paren()]];
  } else {
    const prevAnswers = parensHelper(n - 1);
    const currAnswers = [];

    prevAnswers.forEach((parenArr) => {
      // wrap entire
      const wrapAllParen = new Paren();
      wrapAllParen.children.push(...parenArr);
      currAnswers.push([wrapAllParen]);

      // add adjacent
      for (let i = 0; i <= parenArr.length; i++) {
        const newAdjParen = new Paren();
        const newParenArr = parenArr.slice();
        newParenArr.splice(i, 0, newAdjParen);
        currAnswers.push(newParenArr);
      }

      // wrap elements
      for (let i = 0; i < parenArr.length; i++) {
        const newWrappingParen = new Paren();
        newWrappingParen.children.push(parenArr[i]);
        const newParenArr = parenArr.slice();
        newParenArr.splice(i, 1, newWrappingParen);
        currAnswers.push(newParenArr);
      }
    });
    return currAnswers;
  }
}

const stringifyParens = (answers) => {
  const stringifiedSolutions = [];
  answers.forEach((parenArr) => {
    const stringArr = [];
    parenArr.forEach((paren) => {
      stringifyParensHelper(paren, stringArr);
    });
    stringifiedSolutions.push(stringArr.join(""));
  });

  stringifiedSolutions.sort();

  filteredSolutions = stringifiedSolutions.filter((solution, idx) => {
    return solution !== stringifiedSolutions[idx - 1];
  });

  return filteredSolutions;
}

const stringifyParensHelper = (paren, stringArr) => {
  stringArr.push('(');
  paren.children.forEach((paren) => {
    stringifyParensHelper(paren, stringArr);
  });
  stringArr.push(')');
}

const solution = parens(4);
console.log(solution.length, solution);

// optimization 1:
// It wasn't that necessary to construct paren trees, instead
// I could have maintained an array of paren characters.
// then the options are where to insert an empty paren pair:
// either at the start of the string, or to the right of any existing
// left paren. This still generates duplicates, but far fewer than in
// the above

// optimization 2:
// In order to generate unique strings:
// from index 0 to n * 2:
// insert either a left paren or a right paren.
// You can insert a left paren anywhere.
// You can insert a right paren as long as leftCount >= rightCount.
// When you've used up all your right and left parens, add the string to your
// solution space