import assert from "node:assert";

import Graph from "./Graph.js";

describe("Graph", function() {
  describe("#constructor", function () {
    it("should return new Graph instance with instance variables set", function() {
      const graph = new Graph();

      assert.deepStrictEqual(graph.nodes, []);
      assert.deepStrictEqual(graph.connections, []);
    });
  });

  describe("#addNode", function() {
    it("should add new node to graph and return node", function() {
      const graph = new Graph();
      const node = graph.addNode("banana");

      assert.deepStrictEqual(graph.nodes, [
        node,
      ]);
      assert.strictEqual(node.id, "banana");
    });
  });

  describe("#connectNodes", function() {
    it("should connect two nodes in graph and return connection", function() {
      const graph = new Graph();
      const node1 = graph.addNode("banana");
      const node2 = graph.addNode("strawberry");

      const connection = graph.connectNodes("banana", "strawberry", 5);

      assert.deepStrictEqual(graph.nodes, [
        node1,
        node2,
      ]);
      assert.deepStrictEqual(graph.connections, [
        connection,
      ]);
      assert.strictEqual(connection.node1, node1);
      assert.strictEqual(connection.node2, node2);
    });
  });

  describe("#findNode", function() {
    it("should find node by id", function() {
      const graph = new Graph();
      const node1 = graph.addNode("banana");
      const node2 = graph.addNode("strawberry");

      assert.strictEqual(graph.findNode("banana"), node1);
      assert.strictEqual(graph.findNode("strawberry"), node2);
    });
  });

  describe("#findConnection", function() {
    it("should find connection by two ids when ids are in connected order", function() {
      const graph = new Graph();
      graph.addNode("banana");
      graph.addNode("strawberry");

      const connection = graph.connectNodes("banana", "strawberry", 5);

      const foundConnection = graph.findConnection("banana", "strawberry");

      assert.strictEqual(foundConnection, connection);
    });

    it("should find connection by two ids when ids are not in connected order", function() {
      const graph = new Graph();
      graph.addNode("banana");
      graph.addNode("strawberry");

      const connection = graph.connectNodes("banana", "strawberry", 5);

      assert.strictEqual(graph.findConnection("strawberry", "banana"), connection);
    });
  });

  describe("#findConnections", function() {
    it("should find all connections for an id", function() {
      const graph = new Graph();
      graph.addNode("banana");
      graph.addNode("strawberry");
      graph.addNode("apple");

      graph.connectNodes("banana", "strawberry", 5);
      graph.connectNodes("apple", "banana", 5);

      const connections = graph.findConnections("banana");

      assert.deepStrictEqual(connections, [
        graph.findConnection("banana", "strawberry"),
        graph.findConnection("banana", "apple"),
      ]);
    });
  });

  describe("#findShortestPath", function() {
    it("should find shortest path between two nodes", function() {
      const graph = new Graph();
      graph.addNode("Zarahemla");
      graph.addNode("Nephihah");
      graph.addNode("Bountiful");
      graph.addNode("Nephi");
      graph.addNode("Desolation");
      graph.addNode("Ammonihah");

      graph.connectNodes("Zarahemla", "Bountiful", 5);
      graph.connectNodes("Zarahemla", "Nephi", 7);
      graph.connectNodes("Zarahemla", "Nephihah", 3);
      graph.connectNodes("Bountiful", "Nephi", 3);
      graph.connectNodes("Desolation", "Bountiful", 6);
      graph.connectNodes("Desolation", "Nephi", 8);
      graph.connectNodes("Desolation", "Ammonihah", 4);

      const shortestPath = graph.findShortestPath("Zarahemla", "Ammonihah");

      assert.deepStrictEqual(shortestPath.nodes, [
        graph.findNode("Zarahemla"),
        graph.findNode("Bountiful"),
        graph.findNode("Desolation"),
        graph.findNode("Ammonihah"),
      ]);
      assert.deepStrictEqual(shortestPath.connections, [
        graph.findConnection("Zarahemla", "Bountiful"),
        graph.findConnection("Bountiful", "Desolation"),
        graph.findConnection("Desolation", "Ammonihah"),
      ]);
      assert.strictEqual(shortestPath.distance, 15);
    });
  });
});
