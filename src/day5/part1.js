import utils from "../utils.js";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default {
  async run() {
    const contents = await utils.readFile("day5", "data.txt");
    const overlapCount = this.processData(contents);

    console.log(`Overlap Count: ${overlapCount}`);
  },

  processData(lines) {
    const points = [];
    lines.forEach(l => {
      const [start, end] = this.parseLine(l);
      if (!this.isStraight(start, end)) {
        return;
      }
      const ps = this.buildLinePoints(start, end);
      points.push(...ps);
    });
    const overlapCount = this.calcOverlaps(points);

    return overlapCount;
  },

  parseLine(line) {
    const [startX, startY, endX, endY] = line
      .replace(/\s*->\s*/, ",")
      .split(",")
      .map(d => Number.parseInt(d));

    if ([startX, startY, endX, endY].some(d => Number.isNaN(d))) {
      console.error(`Invalid start/end coordinate format: ${line}`);
      process.exit(1);
    }

    return [new Point(startX, startY), new Point(endX, endY)];
  },

  isStraight(start, end) {
    if (start.x === end.x || start.y === end.y) {
      return true;
    }

    return false;
  },

  buildLinePoints(start, end) {
    const points = [];

    if (start.x === end.x) {
      const distance = Math.abs(end.y - start.y);
      let multiplier = 1;
      if (end.y < start.y) {
        multiplier = -1;
      }
      for (let i = 0; i <= distance; i++) {
        points.push(new Point(start.x, start.y + i * multiplier));
      }
    }
    if (start.y === end.y) {
      const distance = Math.abs(end.x - start.x);
      let multiplier = 1;
      if (end.x < start.x) {
        multiplier = -1;
      }
      for (let i = 0; i <= distance; i++) {
        points.push(new Point(start.x + i * multiplier, start.y));
      }
    }

    return points;
  },

  calcOverlaps(points) {
    let counts = {};

    points.forEach(p => {
      const key = `${p.x},${p.y}`;
      if (!counts.hasOwnProperty(key)) {
        counts[key] = 0;
      }
      counts[key]++;
    });

    const count = Object.values(counts)
      .reduce((p, c) => {
        if (c > 1) {
          return p + 1;
        }
        return p;
      }, 0);

    return count;
  },

  Point,
};
