import utils from "../utils.js";
import Grid from "../Grid.js";

/*
It's easy to recursively visit all possible locations,
but big caves allowing multiple visits is problematic.
If there are ever adjacent big caves, you can create an infinite number of paths.
I'll check the data and see if that happens.
Yeah, never happens in the input data, so stop thinking about it :P
*/

export default {
  async run() {
    const contents = await utils.readFile("day12", "data.txt");
    const pathCount = this.processData(contents);

    console.log(`Path Count: ${pathCount}`);
  },

  processData(lines) {
    let caves = this.buildCaves(lines);
    let paths = this.buildPaths(caves);

    return paths.length;
  },

  buildCaves(lines) {
    const caves = [];
    lines.forEach(l => {
      const [nameOne, nameTwo] = l.split(/\s*-\s*/);

      [nameOne, nameTwo].forEach(n => {
        this.validateCaveName(n);
        this.addCave(caves, n);
      });

      this.linkCaves(caves, nameOne, nameTwo);
    });

    return caves;
  },

  buildPaths(caves) {
    let paths = [];
    const startCave = caves.find(c => c.name === "start");
    const endCave = caves.find(c => c.name === "end");
    if (!startCave || !endCave) {
      throw new Error("Invalid cave system");
    }

    paths.push([startCave]);
    const completePaths = new WeakSet();

    const done = () => paths.every(p => completePaths.has(p));
    const hasVisitedSmallTwice = p => {
      const smallCounts = {};
      p
        .filter(c => c.size === "small")
        .forEach(c => {
          smallCounts[c.name] ? smallCounts[c.name]++ : smallCounts[c.name] = 1;
        });

        return Object.values(smallCounts).some(c => c > 1);
    }

    let iterationCount = 0;
    while (!done()) {
      paths.forEach(p => {
        if (completePaths.has(p)) {
          return;
        }

        // split paths into all possible next steps
        const curCave = p[p.length - 1];
        if (curCave.name === "end") {
          completePaths.add(p);
          return;
        }

        const nextConnections = curCave.connections.filter(c => {
          if (
            c.size === "small"
            && p.find(pc => pc.name === c.name)
            && hasVisitedSmallTwice(p)
            || c.name === "start"
          ) {
            return false;
          }

          return true;
        });

        if (!nextConnections.length) {
          completePaths.add(p);
          return;
        }

        for (let i = 1; i < nextConnections.length; i++) {
          const pathFork = [...p, nextConnections[i]];
          paths.push(pathFork);
        }
        p.push(nextConnections[0]);
      });

      // It's possible (depending on data) to go into infinite loop here
      iterationCount++;
      if (iterationCount > 100000) {
        throw new Error("Iteration cap reached");
      }
    }

    // filter out paths that don't end at "end"
    paths = paths.filter(p => p[p.length - 1] === endCave);

    return paths;
  },

  validateCaveName(name) {
    if (!name) {
      console.error(`Invalid cave name: ${name}`);
      throw new Error("Invalid cave name");
    }
    if (/[^a-z,A-Z]/.test(name)) {
      console.error(`Invalid cave name: ${name}`);
      throw new Error("Invalid cave name");
    }
  },

  addCave(caves, name) {
    let cave = caves.find(c => c.name === name);
    if (!cave) {
      cave = {
        name,
        size: /[A-Z]/.test(name) ? "big" : "small",
        connections: [],
      };
      caves.push(cave);
    }

    return cave;
  },

  linkCaves(caves, nameOne, nameTwo) {
    const caveOne = caves.find(c => c.name === nameOne);
    const caveTwo = caves.find(c => c.name === nameTwo);
    if (!caveOne || !caveTwo) {
      console.error(`Attempted to link two that don't yet exist: ${nameOne}, ${nameTwo}`);
      throw new Error("Invalid cave link");
    }

    if (!caveOne.connections.find(c => c === caveTwo)) {
      caveOne.connections.push(caveTwo);
    }
    if (!caveTwo.connections.find(c => c === caveOne)) {
      caveTwo.connections.push(caveOne);
    }
  },

  // build cave system, graph of all nodes and their connections

  // I'm here,
  // i need to visit all these places
  // track paths, split paths whenver possible
  // iterate over every path head and repeat
};
