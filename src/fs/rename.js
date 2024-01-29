import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PATH = `${__dirname}/files/`;
const ORIGIN_NAME = `wrongFilename.txt`;
const NEW_NAME = "properFilename.md";

const rename = async () => {
  // Check for the origin file exists
  await checkFile(PATH + ORIGIN_NAME).then((res) => {
    if (!res) {
      const err = new Error(
        `FS operation failed. File with name "${ORIGIN_NAME}" does not exist.`
      );
      stdout.write(colorizeText(err, "\x1b[31m"));
      process.exit(1);
    }
  });

  // Check for file with new name not exists
  await checkFile(PATH + NEW_NAME).then((res) => {
    if (res) {
      const err = new Error(
        `FS operation failed. File with name "${NEW_NAME}" is already exists.`
      );
      stdout.write(colorizeText(err, "\x1b[31m"));
      process.exit(1);
    }
  });

  //rename file
  try {
    await fsPromises.rename(PATH + ORIGIN_NAME, PATH + NEW_NAME);
    stdout.write(colorizeText("File renamed successfully!", "\x1b[32m"));
  } catch {
    const err = new Error("FS operation failed. Failed to rename files.");
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  }
};

async function checkFile(path) {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m" + "\n";
}

await rename();
