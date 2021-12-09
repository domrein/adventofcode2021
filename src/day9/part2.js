import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day9", "data.txt");
    const basinSizeMultiple = this.processData(contents);

    console.log(`Basin Size Multiple: ${basinSizeMultiple}`);
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

    const basins = this.buildBasins(heights, gridWidth, gridHeight);

    return this.calcBasinSizeMultiple(basins);
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

    if (adjacentHeights.every(h => h.h > height)) {
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
      adjacents.push({h: heights[i - 1], i: i - 1});
    }
    // right
    if (x < gridWidth - 1) {
      adjacents.push({h: heights[i + 1], i: i + 1});
    }
    // up
    if (y) {
      adjacents.push({h: heights[i - gridWidth], i: i - gridWidth});
    }
    // down
    if (y < gridHeight - 1) {
      adjacents.push({h: heights[i + gridWidth], i: i + gridWidth});
    }

    return adjacents;
  },

  calcRiskLevel(heights) {
    return utils.sum(heights) + heights.length;
  },

  calcBasinSizeMultiple(basins) {
    basins = basins.slice(0, 3);

    return basins.slice(0, 3).map(b => b.length).reduce((a, c) => a * c);
  },

  buildBasins(heights, gridWidth, gridHeight) {
    const basins = [];

    heights.forEach((h, i, arr) => {
      if (h === 9) {
        return;
      }
      const adjacentIndexes = this.findAdjacent(i, arr, gridWidth, gridHeight).map(a => a.i);
      const matchingBasins = basins.filter(b => adjacentIndexes.some(a => b.includes(a)));
      if (!matchingBasins.length) {
        basins.push([i]);
      }
      else if (matchingBasins.length === 1) {
        matchingBasins[0].push(i);
      }
      // merge basins if needed
      else {
        matchingBasins[0].push(i);
        for (let j = 1; j < matchingBasins.length; j++) {
          matchingBasins[0].push(...matchingBasins[j]);
          basins.splice(basins.findIndex(b => b === matchingBasins[j]), 1);
        }
      }
    });

    basins.forEach(basin => basin.sort((a, b) => a - b));
    basins.sort((a, b) => {
      const result = b.length - a.length;
      if (result) {
        return result;
      }
      if (a.length) {
        return b[0] - a[0];
      }
      return 1;
    });

    return basins;
  },
};
