import utils from "../utils.js";

/*
have a bunch of x,y coordinates
seems like we can just flip them over the fold by
  taking distance to fold and subtracting from cur position
*/

export default {
  async run() {
    const contents = await utils.readFile("day13", "data.txt");
    const dotCount = this.processData(contents);

    console.log(`Dot Count: ${dotCount}`);
  },

  processData(lines) {
    const points = [];
    const folds = [];
    lines.forEach(l => {
      if (/,/.test(l)) {
        const [x, y] = l.split(/\s*,\s*/);
        const point = {x: Number.parseInt(x), y: Number.parseInt(y)};
        if (Number.isNaN(point.x) || Number.isNaN(point.y)) {
          console.error(`Invalid point: ${point}`);
          throw new Error("Invalid Point");
        }
        points.push(point);
      }
      else if (/(x|y)=\d+/.test(l)) {
        const [direction, value] = l.match(/(x|y)=\d+/)[0].split("=");
        const fold = {direction, value: Number.parseInt(value)};
        if (Number.isNaN(fold.value)) {
          console.error(`Invalid fold: ${fold.direction}, ${fold.value}`);
          throw new Error("Invalid Fold");
        }
        folds.push(fold);
      }
      else {
        console.error(`Invalid line: ${line}`);
        throw new Error("Invalid Line");
      }
    });

    // apply folds
    folds.forEach((f, i) => {
      if (i) {
        return;
      }
      points.forEach(p => {
        if (p[f.direction] <= f.value) {
          return;
        }
        const distance = p[f.direction] - f.value;
        p[f.direction] -= distance * 2;
      });
    });

    // merge points
    const mergedPoints = new Set();
    points.forEach(p => mergedPoints.add(`${p.x},${p.y}`));

    return mergedPoints.size;
  },
};
