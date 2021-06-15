class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => {
      this.addVertex(vertex);
    })
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(neighbor => {
      neighbor.adjacent.delete(vertex);
    });

    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisit = [start];
    const seen = [];

    while (toVisit.length > 0) {
      const node = toVisit.pop();

      seen.push(node.value);

      for (let neighbor of node.adjacent) {
        if (!seen.includes(neighbor.value) && !toVisit.includes(neighbor)) {
          toVisit.push(neighbor);
        }
      }
    }

    return seen;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    const toVisit = [start];
    const seen = [];

    while (toVisit.length > 0) {
      const node = toVisit.shift();

      seen.push(node.value);

      for (let neighbor of node.adjacent) {
        if (!seen.includes(neighbor.value) && !toVisit.includes(neighbor)) {
          toVisit.push(neighbor);
        }
      }
    }

    return seen;

  }

  shortestPath(source, target) {
    const pathes = [];

    function findPath(source, target, path = []) {
      if (source === target) {
        path.push(target.value);

        pathes.push(path);
        return;
      }

      for (let neighbor of source.adjacent) {
        if (!path.includes(neighbor.value)) {
          findPath(neighbor, target, [...path, source.value]);
        }
      }

      return;
    }
    findPath(source, target, []);

    let minIndex = -1;

    pathes.forEach((path, index) => {
      if (minIndex === -1 || path.length < pathes[minIndex].length) {
        minIndex = index;
      }
    });

    return pathes[minIndex];
  }
}

module.exports = { Graph, Node }