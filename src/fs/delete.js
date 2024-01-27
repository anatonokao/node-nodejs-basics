import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILE_PATH = `${__dirname}/files/fileToRemove.txt`;

const remove = async () => {
  checkFile(FILE_PATH).then(async (res) => {
    if (!res) {
      const err = new Error(
        `FS operation failed. File with name "${FILE_PATH}" does not exist.`
      );
      stdout.write(colorizeText(err, "\x1b[31m"));
      process.exit(1);
    } else {
      try {
        await fsPromises.unlink(FILE_PATH);
        stdout.write(colorizeText("File removed successfully!", "\x1b[32m"));
      } catch {
        const err = new Error("FS operation failed. Failed to remove files.");
        stdout.write(colorizeText(err, "\x1b[31m"));
        process.exit(1);
      }
    }
  });
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

await remove();
