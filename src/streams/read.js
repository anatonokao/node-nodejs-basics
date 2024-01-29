import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = `${__dirname}/files/fileToRead.txt`;

const read = async () => {
  const stream = fs.createReadStream(FILE_PATH);

  stream.on("data", (data) => {
    process.stdout.write(
      colorizeText("data: ", "\x1b[33m") + data.toString() + "\n"
    );
  });

  stream.on("end", () => {
    process.stdout.write(
      colorizeText("File readed successfully", "\x1b[32m") + "\n"
    );
  });
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await read();
