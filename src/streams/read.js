import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = `${__dirname}/files/fileToRead.txt`;

const read = async () => {
  const stream = fs.createReadStream(FILE_PATH);
  stream.on("data", (data) => {
    console.log(colorizeText("data: ", "\x1b[33m"), data.toString());
  });

  stream.on("end", () => {
    console.log(colorizeText("File readed successfully", "\x1b[32m"));
  });
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await read();
