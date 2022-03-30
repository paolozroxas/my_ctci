const buildOrder = (projects, dependencies) => {
  const { graph, reverseGraph } = constructGraphs(projects, dependencies);
  const buildOrderResult = [];
  for (let node in graph) {
    if (reverseGraph[node].length === 0) {
      BFSGraph(node, graph, buildOrderResult);
    }
  }

  if (buildOrderResult.length !== projects.length) {
    throw new Error('invalid dependency tree');
  }

  return buildOrderResult;
}

const constructGraphs = (projects, dependencies) => {
  const graph = {};
  const reverseGraph = {}
  projects.forEach((proj) => {
    graph[proj] = [];
    reverseGraph[proj] = [];
  });

  dependencies.forEach(([dep, node]) => {
    graph[dep].push(node);
    reverseGraph[node].push(dep);
  });

  return { graph, reverseGraph };
}

const BFSGraph = (node, graph, buildOrderResult) => {
  const queue = [ node ];
  const traversed = {};
  
  while (queue.length > 0) {
    const proj = queue.shift();
    if (!traversed[proj]) {
      buildOrderResult.push(proj);
      graph[proj].forEach((child) => {
        queue.push(child);
      });
      traversed[proj] = true;
    }
  }
}

// build a graph showing each node's dependencies
// bfs through each node with no edges, marking each node buildOrderResult
// if there are untraversed nodes, throw err

// the graph maps projects to parents
// the reverse graph maps projects to dependencies
// the reverse graph tells us which nodes to start BFS on

const projects = ['a', 'b', 'c', 'd', 'e', 'f'];
const dependencies = [
  ['a', 'd'],
  ['f', 'b'],
  ['b', 'd'],
  ['f', 'a'],
  ['d', 'c']
];
const invalidDependencies = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'a']
]
const result = buildOrder(projects, dependencies);
// const shouldThrowError = buildOrder(projects, invalidDependencies);

// expected: f e a b d c
console.log(result);

// expected: Error
// console.log(shouldThrowError);