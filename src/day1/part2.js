// import fs from "node:fs/promises";

// const file = await fs.open("src/day1_data.txt");
// const contents = (await file.readFile()).toString();

// let window = [];
// const windowSize = 3;
// let increases = 0;
// contents.split(/\n/)
//   .forEach(line => {
//     let curDepth = Number.parseInt(line);
//     if (Number.isNaN(curDepth)) {
//       return;
//     }

//     if (
//       window.length >= windowSize
//       && sum([curDepth, ...window.slice(1)]) > sum(window)
//     ) {
//       increases++;
//     }

//     window.push(curDepth);
//     if (window.length > windowSize) {
//       window.shift();
//     }
//   });

// function sum(arr) {
//   return arr.reduce((p, c) => p + c, 0);
// }

// console.log(increases);


import utils from "../utils.js";

export default {
  async run() {
    const depths = await utils.readFile("day1", "data.txt");

    const increases = this.calcWindowIncreases(depths);

    console.log(increases);
  },

  calcWindowIncreases(depths) {
    let window = [];
    const windowSize = 3;
    let increases = 0;
    depths.forEach(line => {
      let curDepth = Number.parseInt(line);
      if (Number.isNaN(curDepth)) {
        return;
      }

      if (
        window.length >= windowSize
        && utils.sum([curDepth, ...window.slice(1)]) > utils.sum(window)
      ) {
        increases++;
      }

      window.push(curDepth);
      if (window.length > windowSize) {
        window.shift();
      }
    });

  return increases;
  },
};


