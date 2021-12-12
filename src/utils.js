import fs from "node:fs/promises";
import path from "node:path";

export default {
  async readFile(...filePath) {
    const file = await fs.open(path.join(process.cwd(), "src", ...filePath));
    const contents = (await file.readFile()).toString();
    await file.close();
    const lines = contents.split(/\n/).filter(l => l.trim() !== "");

    if (!lines.length) {
      console.error("No lines to process");
      process.exit(1);
    }

    return lines;
  },

  sum(arr) {
    return arr.reduce((p, c) => p + c, 0);
  },

  min(arr) {
    return arr.reduce((a, c) => Math.min(a, c));
  },

  max(arr) {
    return arr.reduce((a, c) => Math.max(a, c));
  }
}
