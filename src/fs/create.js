import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const OUTPUT_PATH = `${__dirname}/files/fresh.txt`;

const create = async () => {
  fsPromises
    .access(OUTPUT_PATH)
    .then(() => {
      const err = new Error("FS operation failed");
      stdout.write(colorizeText(err, "\x1b[31m"));
    })
    .catch(() => {
      fsPromises
        .writeFile(OUTPUT_PATH, "I am fresh and young")
        .then(() => stdout.write(colorizeText("File created", "\x1b[32m")))
        .catch((err) => stdout.write(colorizeText(err, "\x1b[31m")));
    });
};

await create();

function colorizeText(text, color) {
  return color + text + "\x1b[0m" + "\n";
}
