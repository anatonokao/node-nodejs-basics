import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILE_PATH = `${__dirname}/files/fileToRead.txt`;

const read = async () => {
  await checkFile(FILE_PATH).then((res) => {
    if (!res) {
      const err = new Error(
        `FS operation failed. File with name "${FILE_PATH}" does not exist.`
      );
      stdout.write(colorizeText(err, "\x1b[31m"));
      process.exit(1);
    }
  });

  const data = await readFile(FILE_PATH);
  stdout.write(colorizeText(data, "\x1b[32m"));
};

async function checkFile(path) {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readFile(path) {
  try {
    return await fsPromises.readFile(path, "utf-8");
  } catch {
    const err = new Error("FS operation failed. Failed to read files.");
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  }
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m" + "\n";
}

await read();
