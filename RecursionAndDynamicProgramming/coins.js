const coins = (n) => {
  const results =  coinsHelper(n, [0, 0, 0, 0])
    .filter((result) => (result !== null))
    .map((result) => (result.join(",")))
    .sort()
    .filter((resultString, idx, coll) => {
      return resultString !== coll[idx - 1];
    });
  
  console.log(results);
  return results.length;
}

const coinsHelper = (n, coinsUsed) => {
  const currentTotal = getCurrentTotal(coinsUsed);
  if (currentTotal > n) {
    return [ null ];
  } else if (currentTotal === n) {
    return [ coinsUsed ];
  } else {
    return [
      ...coinsHelper(n, [ coinsUsed[0] + 1, coinsUsed[1], coinsUsed[2], coinsUsed[3] ]), // 25
      ...coinsHelper(n, [ coinsUsed[0], coinsUsed[1] + 1, coinsUsed[2], coinsUsed[3] ]), // 20
      ...coinsHelper(n, [ coinsUsed[0], coinsUsed[1], coinsUsed[2] + 1, coinsUsed[3] ]), // 5
      ...coinsHelper(n, [ coinsUsed[0], coinsUsed[1], coinsUsed[2], coinsUsed[3] + 1 ]), // 1
    ];
  }
}

const getCurrentTotal = (coinsUsed) => {
  return 25 * coinsUsed[0] + 10 * coinsUsed[1] + 5 * coinsUsed[2] + coinsUsed[3];
}

// the above is a brute force solution
// optimizations:
// 1. the above generates duplicate ways, which are filtered out in the end
// 2. use dynamic programming to take advantage of previously calculated results

const coins2 = (n) => {
  const memo = {}
  const answer =  coinsHelper2(n, [25, 10, 5, 1], memo);
  return answer
}

const coinsHelper2 = (n, denoms, memo) => {
  if (n === 0) {
    return 1;
  } else if (denoms.length === 0) {
    return 0;
  }

  const key = JSON.stringify([n, denoms]);
  if (memo[key]) {
    return memo[key];
  }
   
  let ways = 0;
  let total = 0;

  while (total <= n) {
    ways += coinsHelper2(n - total, denoms.slice(1), memo);
    total += denoms[0];
  }

  memo[key] = ways;
  return ways;
}

console.log(coins(30));
console.log(coins2(30));
console.log(coins(25));
console.log(coins2(25));
console.log(coins(10));
console.log(coins2(10));
console.log(coins(5));
console.log(coins2(5));