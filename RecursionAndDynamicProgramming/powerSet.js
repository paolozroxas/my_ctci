const powerSet = (set) => {
  return powerSetHelper(set, 0, []);
}

const powerSetHelper = (set, index, subset) => {
  let subsets = [ subset ];

  for (let i = index; i < set.length; i++) {
    subsets = subsets.concat(powerSetHelper(set, i + 1, subset.concat([set[i]])));
  }

  return subsets;
}


// Assumptions:
// a set is a subset of itself
// the empty set is a subset of all sets

console.log(powerSet(['a', 'b', 'c', 'd']))