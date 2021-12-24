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
    const cave = new Grid(gridWidth, gridHeight, gridValues);
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

  // processData(lines) {
  //   const gridWidth = lines[0].length;
  //   const gridHeight = lines.length;
  //   const gridValues = [];
  //   lines.forEach(l => {
  //     if (l.length !== gridWidth) {
  //       console.error(`Invalid line width: ${l}`);
  //       process.exit(1);
  //     }

  //     gridValues.push(...[...l].map(o => Number.parseInt(o)));
  //   });
  //   if (gridValues.some(o => Number.isNaN(o))) {
  //     console.error(`Invalid cave value: ${o}`);
  //     process.exit(1);
  //   }
  //   const cave = new Grid(gridWidth, gridHeight, gridValues);

  //   const trackers = [{location: 0, path: [0], riskTotal: 0, deadEnd: false}];
  //   let trackerAtEnd = null;
  //   let steps = 0;
  //   while (!trackerAtEnd) {
  //     steps++;
  //     if (steps > 5) {
  //       // return;
  //     }
  //     // sort trackers by risk, lowest to highest
  //     trackers.sort((a, b) => a.riskTotal - b.riskTotal);
  //     // trackers.sort((a, b) => ((a.riskTotal - cave.calcX(a.location) - cave.calcY(a.location)) - (b.riskTotal - cave.calcX(b.location) - cave.calcY(b.location))));
  //     // trackers.sort((a, b) => ((cave.calcX(a.location) + cave.calcY(a.location)) - (cave.calcX(b.location) + cave.calcY(b.location))));
  //     // console.log(trackers);

  //     // find tracker with lowest risk that isn't at a dead end
  //     const lowestTracker = trackers.filter(t => !t.deadEnd)[0];
  //     // let line = "";
  //     // for (let i = 0; i < cave.values.length; i++) {
  //     //   if (lowestTracker.path.includes(i)) {
  //     //     line += "#";
  //     //   }
  //     //   else {
  //     //     line += ".";
  //     //   }
  //     //   if (line.length === cave.width) {
  //     //     console.log(line);
  //     //     line = "";
  //     //   }
  //     // }
  //     console.log(lowestTracker.riskTotal);
  //     // console.log("");
  //     // for (let i = 0; i < cave.height; i++) {
  //     //   let line = "";
  //     //   for (let j = 0; j < cave.width; j++) {
  //     //     line += cave.
  //     //   }
  //     // }
  //     if (!lowestTracker) {
  //       console.log(trackers);
  //       throw new Error("Unable To Find End of Maze");
  //     }

  //     // make all possible moves
  //     let adjacents = cave.findAdjacents(lowestTracker.location, false);
  //     // don't backtrack
  //     adjacents = adjacents.filter(a => !lowestTracker.path.includes(a.index))
  //     // don't make a loop
  //     adjacents = adjacents.filter(a => {
  //       let aa = cave.findAdjacents(a.index, false);
  //       // console.log("---");
  //       // console.log(aa);
  //       // console.log(lowestTracker.path)
  //       aa = aa.filter(a_ => lowestTracker.path.includes(a_.index));
  //       return aa.length === 1;
  //       // return true;
  //     });

  //     // we've hit a dead end
  //     if (!adjacents.length) {
  //       lowestTracker.deadEnd = true;
  //       continue;
  //     }

  //     const ts = [lowestTracker];
  //     // clone trackers for all new adjacent locations
  //     while (ts.length < adjacents.length) {
  //       const t = {
  //         location: lowestTracker.location,
  //         path: [...lowestTracker.path],
  //         riskTotal: lowestTracker.riskTotal,
  //         deadEnd: lowestTracker.deadEnd,
  //       };

  //       ts.push(t);
  //       trackers.push(t);
  //     }

  //     // move trackers
  //     adjacents.forEach((a, i) => {
  //       const t = ts[i];
  //       t.location = a.index;
  //       t.path.push(a.index);
  //       t.riskTotal += a.value - cave.calcX(a.index) - cave.calcY(a.index);
  //     });

  //     trackerAtEnd = trackers.find(t => t.location === cave.values.length - 1);
  //   }

  //   console.log(trackerAtEnd);

  //   return trackerAtEnd.path.reduce((a, c) => a += cave.values[c], 0);
  //   return trackerAtEnd.riskTotal;
  // },
};
