import utils from "../utils.js";

export default {
  async run() {
    const commands = await utils.readFile("day2", "data.txt");

    const multiple = this.calcMultiple(commands);

    console.log(multiple);
  },

  calcMultiple(commands) {
    let x = 0;
    let y = 0;

    commands.forEach(c => {
      let [direction, amountString] = c.trim().split(/\s/);

      if (!direction) {
        return;
      }

      if (!["forward", "up", "down"].includes(direction)) {
        console.error(`Invalid direction value: ${direction}`);
        process.exit(1);
      }

      const amount = Number.parseInt(amountString);
      if (Number.isNaN(amount)) {
        console.error(`Invalid amount: ${amountString}`);
        process.exit(1);
      }

      switch (direction) {
        case "forward":
          x += amount;
          break;
        case "up":
          y -= amount;
          break;
        case "down":
          y += amount;
          break;
      }
    });

    return x * y;
  },
};
