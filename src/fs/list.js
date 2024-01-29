import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TARGET_PATH = `${__dirname}/files`;

const list = async () => {
  await checkDir(TARGET_PATH).then((res) => {
    if (!res) {
      const err = new Error(
        `FS operation failed. Directory "${TARGET_PATH}" does not exist.`
      );
      stdout.write(colorizeText(err, "\x1b[31m"));
      process.exit(1);
    }
  });

  const files = await getFileNames(TARGET_PATH);

  files
    .map((file) => file.name)
    .forEach((file) => stdout.write(colorizeText(file, "\x1b[34m", "\n")));
};

async function checkDir(path) {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
}

async function getFileNames(path) {
  return fsPromises.readdir(path, { withFileTypes: true });
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m" + "\n";
}

await list();
