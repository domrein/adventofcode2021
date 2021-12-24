import utils from "../utils.js";
import Grid from "../Grid.js";
import Graph from "../Graph.js";

/*
Builds out all possible paths from current point
Only actively build out the one with the lowest total risk
Makes no sense to back track, even though algorithm should cover for that case
*/

export default {
  async run() {
    const contents = await utils.readFile("day15", "data.txt");
    const lowestRisk = this.processData(contents);

    console.log(`Lowest total risk of any path: ${lowestRisk}`);
  },

  processData(lines) {
    const gridWidth = lines[0].length;
    const gridHeight = lines.length;
    const gridValues = [];
    lines.forEach(l => {
      if (l.length !== gridWidth) {
        console.error(`Invalid line width: ${l}`);
        process.exit(1);
      }

      gridValues.push(...[...l].map(o => Number.parseInt(o)));
    });
    if (gridValues.some(o => Number.isNaN(o))) {
      console.error(`Invalid cave value: ${o}`);
      process.exit(1);
    }
    let cave = new Grid(gridWidth, gridHeight, gridValues);
    cave = this.duplicateGrid(cave);
    const graph = new Graph();

    // convert cave into graph
    cave.values.forEach((v, i) => graph.addNode(i + ""));
    cave.values.forEach((v, i) => {
      const neighbors = cave.findAdjacents(i, false);
      neighbors.forEach(n => graph.connectNodes(i + "", n.index + "", (n.value + v) / 2));
    });

    const path = graph.findShortestPath("0", cave.values.length - 1 + "");
    const risk = path.nodes.reduce((a, c, i) => {
      // skip risk of first node
      if (!i) {
        return 0;
      }

      return a + cave.values[parseInt(c.id)];
    }, 0);

    return risk;
  },

  duplicateGrid(grid) {
    const dupCount = 5;
    let values = [];
    for (let i = 0; i < dupCount; i++) {
      for (let j = 0; j < grid.height; j++) {
        const row = grid.getRow(j);
        for (let k = 0; k < dupCount; k++) {
          row.forEach(e => {
            let val = e.value + k + i;
            if (val > 9) {
              val %= 9;
            }
            values.push(val);
          });
        }
      }
    }
    const duplicatedGrid = new Grid(grid.width * dupCount, grid.height * dupCount, values);
    return duplicatedGrid;
  }
};
