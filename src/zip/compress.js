import zlib from "node:zlib";
import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILE_PATH = `${__dirname}/files/fileToCompress.txt`;
const ARCHIVE_PATH = `${__dirname}/files/archive.gz`;

const compress = async () => {
  const readStream = fs.createReadStream(FILE_PATH);
  const writeStream = fs.createWriteStream(ARCHIVE_PATH);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  stdout.write(colorizeText("File compressed successfully!", "\x1b[32m"));
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await compress();
