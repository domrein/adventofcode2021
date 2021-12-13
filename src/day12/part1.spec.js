import assert from "node:assert";

import module from "./part1.js";

describe("Day 12 Part 1 module", function() {
  describe("#processData", function () {
    it("should return path count given raw data", function() {
      const pathCount = module.processData([
        "start-A",
        "start-b",
        "A-c",
        "A-b",
        "b-d",
        "A-end",
        "b-end",
      ]);

      assert.strictEqual(pathCount, 10);
    });
  });

  describe("#buildCaves", function() {
    it("should build caves given input lines", function() {
      const caves = module.buildCaves([
        "start-A",
        "start-b",
        "A-c",
        "A-b",
        "b-d",
        "A-end",
        "b-end",
      ]);

      const caveStart = caves.find(c => c.name === "start");
      const caveA = caves.find(c => c.name === "A");
      const caveB = caves.find(c => c.name === "b");
      const caveC = caves.find(c => c.name === "c");
      const caveD = caves.find(c => c.name === "d");
      const caveEnd = caves.find(c => c.name === "end");

      assert.deepStrictEqual(caves, [
        {name: "start", size: "small", connections: [caveA, caveB]},
        {name: "A", size: "big", connections: [caveStart, caveC, caveB, caveEnd]},
        {name: "b", size: "small", connections: [caveStart, caveA, caveD, caveEnd]},
        {name: "c", size: "small", connections: [caveA]},
        {name: "d", size: "small", connections: [caveB]},
        {name: "end", size: "small", connections: [caveA, caveB]},
      ]);
    });
  });

  describe("#buildPaths", function() {
    it("should build all valid paths for cave system 1", function() {
      const caves =  module.buildCaves([
        "start-A",
        "start-b",
        "A-c",
        "A-b",
        "b-d",
        "A-end",
        "b-end",
      ]);

      const paths = module.buildPaths(caves);

      assert.strictEqual(paths.length, 10);
    });

    it("should build all valid paths for cave system 2", function() {
      const caves =  module.buildCaves([
        "dc-end",
        "HN-start",
        "start-kj",
        "dc-start",
        "dc-HN",
        "LN-dc",
        "HN-end",
        "kj-sa",
        "kj-HN",
        "kj-dc",
      ]);

      const paths = module.buildPaths(caves);

      assert.strictEqual(paths.length, 19);
    });

    it("should build all valid paths for cave system 3", function() {
      const caves =  module.buildCaves([
        "fs-end",
        "he-DX",
        "fs-he",
        "start-DX",
        "pj-DX",
        "end-zg",
        "zg-sl",
        "zg-pj",
        "pj-he",
        "RW-he",
        "fs-DX",
        "pj-RW",
        "zg-RW",
        "start-pj",
        "he-WI",
        "zg-he",
        "pj-fs",
        "start-RW",
      ]);

      const paths = module.buildPaths(caves);

      assert.strictEqual(paths.length, 226);
    });
  });

  describe("#validateCaveName", function() {
    it("should validate valid cave name", function() {
      module.validateCaveName("a");
    });

    it("should throw error on invalid (empty) cave name", function() {
      assert.throws(() => module.validateCaveName(""));
    });

    it("should throw error on invalid (invalid characters) cave name", function() {
      assert.throws(() => module.validateCaveName("7b "));
    });
  });

  describe("#addCave", function() {
    it("should step add small cave to caves array", function() {
      const caves = [];
      const cave = module.addCave(caves, "a");

      assert.deepStrictEqual(caves, [
        {name: "a", size: "small", connections: []},
      ]);
      assert.deepStrictEqual(cave, {name: "a", size: "small", connections: []});
    });

    it("should step add big cave to caves array", function() {
      const caves = [];
      module.addCave(caves, "A");

      assert.deepStrictEqual(caves, [
        {name: "A", size: "big", connections: []},
      ])
    });
  });

  describe("#linkCaves", function() {
    it("should link caves by adding entries in cave.connections", function() {
      const caves = [];

      const caveA = module.addCave(caves, "a");
      const caveB = module.addCave(caves, "B");

      module.linkCaves(caves, "a", "B");

      assert.deepStrictEqual(caves, [
        {name: "a", size: "small", connections: [caveB]},
        {name: "B", size: "big", connections: [caveA]},
      ]);
    });
  });
});
