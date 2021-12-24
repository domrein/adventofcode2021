class Node {
  constructor() {
    this.id = "";
  }
}

class Connection {
  constructor() {
    this.distance = 0;
    this.node1 = null;
    this.node2 = null;
  }
}

export default class Graph {
  constructor() {
    this.nodes = [];
    this.nodeMap = new Map();
    this.connections = [];
    this.nodeConnections = new Map();
    this.connectionMap = new Map();
  }

  addNode(id) {
    const node = new Node();
    node.id = id;
    if (this.nodeMap.has(id)) {
      console.error(`Attempted to add a duplicate node id to graph: ${id}`);
      throw new Error("Duplicate node id");
    }
    this.nodes.push(node);
    this.nodeMap.set(id, node);

    return node;
  }

  connectNodes(id1, id2, distance) {
    let connection = this.findConnection(id1, id2);
    if (connection && connection.distance !== distance) {
      console.error(`Attempted to connect two already connected nodes with a new distance: ${id1}, ${id2}`);
      throw new Error("Invalid connection attempt");
    }
    connection = new Connection(id1, id2, distance);
    connection.distance = distance;
    connection.node1 = this.findNode(id1);
    connection.node2 = this.findNode(id2);

    this.connections.push(connection);

    this.connectionMap.set(this.buildConnectionName(id1, id2), connection);

    if (!this.nodeConnections.get(connection.node1)) {
      this.nodeConnections.set(connection.node1, []);
    }
    this.nodeConnections.get(connection.node1).push(connection);
    if (!this.nodeConnections.get(connection.node2)) {
      this.nodeConnections.set(connection.node2, []);
    }
    this.nodeConnections.get(connection.node2).push(connection);

    return connection;
  }

  buildConnectionName(id1, id2) {
    return [id1, id2].sort().join(",");
  }

  findNode(id) {
    return this.nodeMap.get(id);
  }

  findConnection(id1, id2) {
    return this.connectionMap.get(this.buildConnectionName(id1, id2));
  }

  findConnections(id) {
    return this.connections.filter(c => c.node1.id === id || c.node2.id === id);
  }

  /**
   * Use Dijkstra's to find shortest path
   */
  findShortestPath(startId, endId) {
    let path = {nodes: [], connections: [], distance: 0};

    const startNode = this.findNode(startId);
    const endNode = this.findNode(endId);
    if (!startNode || !endNode) {
      console.error(`Tried to find an invalid path: ${startId} ${endId}`);
      throw new Error("Invalid path lookup");
    }

    const metadata = new WeakMap();
    let scoredQueue = new Set();

    // reset internal
    this.nodes.forEach(n => {
      metadata.set(n, {
        score: Number.POSITIVE_INFINITY,
        visited: false,
      });
    });
    metadata.get(startNode).score = 0;

    let currentNode = startNode;
    let count = 0;
    while (!metadata.get(endNode).visited) {
      // console.log(`nodes visited: ${count}`);
      count++;
      if (count > 10 ** 6) {
        console.error("Hit maximum count");
        throw new Error("Maximum count exceeded");
      }

      // calculate scores for all neighbors
      const connections = this.findConnections(currentNode.id);
      connections.forEach(c => {
        const score = metadata.get(currentNode).score + c.distance;
        const neighborNode = c.node1 === currentNode ? c.node2 : c.node1;
        const meta = metadata.get(neighborNode);
        if (meta.visited) {
          return;
        }
        if (meta.score > score) {
          meta.score = score;
        }
        scoredQueue.add(neighborNode);
      });

      metadata.get(currentNode).visited = true;
      scoredQueue.delete(currentNode);
      if (currentNode === endNode) {
        break;
      }

      // find next unvisited node
      let lowestNode = [...scoredQueue].sort((a, b) => metadata.get(a).score - metadata.get(b).score)[0];
      if (!lowestNode || metadata.get(lowestNode).score === Number.NEGATIVE_INFINITY) {
        console.warn("No path to target");
        return null;
      }
      currentNode = lowestNode;
    }
    // build path data
    path.nodes.unshift(currentNode);
    path.distance = metadata.get(currentNode).score;

    while (currentNode !== startNode) {
      const connections = this.findConnections(currentNode.id);
      let lowestNode = null;
      let lowestConnection = null;
      connections.forEach(c => {
        const neighborNode = c.node1 === currentNode ? c.node2 : c.node1;
        const meta = metadata.get(neighborNode);
        if (!lowestNode || meta.score < metadata.get(lowestNode).score) {
          lowestNode = neighborNode;
          lowestConnection = c;
        }
      });
      path.nodes.unshift(lowestNode);
      path.connections.unshift(lowestConnection);

      currentNode = lowestNode;
    }

    return path;
  }
}
