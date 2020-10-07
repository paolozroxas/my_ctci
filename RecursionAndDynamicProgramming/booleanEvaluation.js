const booleanEvaluation = (exp, outcome) => {
  let count = 0;
  booleanEvaluationHelper(exp).forEach((bool) => {
    if (bool === outcome) {
      count++;
    }
  });
  return count;
}

const booleanEvaluationHelper = (exp) => {
  if (exp.length === 1) {
    return exp === '0' ? [false] : [true];
  }
  
  let results = [];
  for (let opIdx = 1; opIdx < exp.length; opIdx += 2) {
    results = results.concat(
      consolidate(
        booleanEvaluationHelper(exp.substring(0, opIdx)),
        booleanEvaluationHelper(exp.substring(opIdx + 1, exp.length)),
        exp[opIdx]
      )
    );
  }

  return results;
}

const consolidate = (boolArr1, boolArr2, operator) => {
  const result = [];
  boolArr1.forEach((bool1) => {
    boolArr2.forEach((bool2) => {
      if (operator === '&') {
        result.push(bool1 && bool2);
      } else if (operator === '|') {
        result.push(bool1 || bool2);
      } else {
        result.push((!bool1 && bool2) || (bool1 && !bool2));
      }
    })
  });

  return result;
}

const exp1 = '1^0|0|1'; // => 2
const exp2 = '0&0&0&1^1|0'; // => 10
const res1 = booleanEvaluation(exp1, false);
const res2 = booleanEvaluation(exp2, true);

console.log(res1);
console.log(res2);