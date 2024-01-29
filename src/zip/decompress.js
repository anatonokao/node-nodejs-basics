import zlib from "node:zlib";
import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ARCHIVE_PATH = `${__dirname}/files/archive.gz`;
const DECOMPRESSED_PATH = `${__dirname}/files/fileToCompress.txt`;

const decompress = async () => {
  const readStream = fs.createReadStream(ARCHIVE_PATH);
  const writeStream = fs.createWriteStream(DECOMPRESSED_PATH);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

  stdout.write(colorizeText("Archive decompressed successfully!", "\x1b[32m"));
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await decompress();
