import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day9", "data.txt");
    const riskLevel = this.processData(contents);

    console.log(`Risk Level: ${riskLevel}`);
  },

  processData(lines) {
    if (!lines.length) {
      console.error("No lines to process");
      process.exit(1);
    }

    const gridWidth = lines[0].length;
    const gridHeight = lines.length;
    const heights = [];
    lines.forEach(l => {
      if (l.length !== gridWidth) {
        console.error(`Invalid line width: ${l}`);
        process.exit(1);
      }

      heights.push(...[...l].map(h => Number.parseInt(h)));
    });
    if (heights.some(h => Number.isNaN(h))) {
      console.error(`Invalid height value: ${h}`);
      process.exit(1);
    }

    const lowPoints = heights.filter((h, i, arr) => this.isLowPoint(i, arr, gridWidth, gridHeight));

    let riskLevel = this.calcRiskLevel(lowPoints);
    return riskLevel;
  },

  calcX(i, gridWidth) {
    return i % gridWidth;
  },

  calcY(i, gridWidth) {
    return Math.floor(i / gridWidth);
  },

  isLowPoint(i, heights, gridWidth, gridHeight) {
    const height = heights[i];
    const adjacentHeights = this.findAdjacent(i, heights, gridWidth, gridHeight);

    if (adjacentHeights.every(h => h > height)) {
      return true;
    }

    return false;
  },

  findAdjacent(i, heights, gridWidth, gridHeight) {
    const x = this.calcX(i, gridWidth);
    const y = this.calcY(i, gridWidth);

    const adjacents = [];
    // left
    if (x) {
      adjacents.push(heights[i - 1]);
    }
    // right
    if (x < gridWidth - 1) {
      adjacents.push(heights[i + 1]);
    }
    // up
    if (y) {
      adjacents.push(heights[i - gridWidth]);
    }
    // down
    if (y < gridHeight - 1) {
      adjacents.push(heights[i + gridWidth]);
    }

    return adjacents;
  },

  calcRiskLevel(heights) {
    return utils.sum(heights) + heights.length;
  },
};
