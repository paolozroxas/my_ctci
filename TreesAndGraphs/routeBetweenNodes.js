const routeBetweenNodes = (graph, start, target) => {
  const queue = [];
  const traversed = {};
  queue.push(start);
  
  while(queue.length > 0) {
    const node = queue.shift();
    traversed[node] = true;
    if (node === target) {
      return true;
    }
    graph[node].forEach((child) => {
      if (!traversed[child]) {
        queue.push(child);
      }
    });
  }

  return false;
}

const graph = [
  [1,4,5],
  [3,4],
  [1],
  [2,4],
  [],
  []
];

console.log(routeBetweenNodes(graph, 0, 3));
console.log(routeBetweenNodes(graph, 3, 0));