import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = `${__dirname}/files/fileToWrite.txt`;

const write = async () => {
  const stream = fs.createWriteStream(FILE_PATH);

  process.stdout.write(colorizeText("Write something: ", "\x1b[33m"));
  process.openStdin().on("data", (chunk) => {
    stream.write(chunk.toString());
    stream.end();
    process.stdout.write(
      colorizeText("File written successfully\n", "\x1b[32m")
    );
    process.exit(0);
  });
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await write();
