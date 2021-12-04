const day = Number.parseInt(process.argv[2]);
if (Number.isNaN(day)) {
  console.error("****************");
  console.error(`You must specify an integer 1 - 25 as the first argument for day. You specified ${process.argv[2]}`);
  console.error("****************");
  process.exit(1);
}
const part = Number.parseInt(process.argv[3]);
if (Number.isNaN(part)) {
  console.error("****************");
  console.error(`You must specify an integer 1 or 2 as the second argument for part. You specified ${process.argv[3]}`);
  console.error("****************");
  process.exit(1);
}

const modulePath = `./day${day}/part${part}.js`;

console.log("***********");
console.log(`Running day ${day} part ${part} (${modulePath})`);
console.log("***********");

const module = await import(modulePath);
module.default.run();
