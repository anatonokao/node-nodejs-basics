import { promises as fsPromises } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ORIGIN_DIR = `${__dirname}/files`;
const OUTPUT_DIR = `${__dirname}/files-copy`;

const copy = async () => {
  await checkOriginDir();
  await checkOutputDir();

  await createOutputDir();
  await copyFiles();

  stdout.write(colorizeText("Files copied successfully!", "\x1b[32m"));
};

async function checkOriginDir() {
  try {
    return await fsPromises.access(ORIGIN_DIR);
  } catch {
    const err = new Error(
      "FS operation failed. Origin directory does not exist."
    );
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  }
}

async function checkOutputDir() {
  try {
    await fsPromises.access(OUTPUT_DIR);

    const err = new Error(
      "FS operation failed. Output directory already exists."
    );
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  } catch {
    return await Promise.resolve(true);
  }
}

async function createOutputDir() {
  try {
    return await fsPromises.mkdir(OUTPUT_DIR);
  } catch {
    const err = new Error("FS operation failed");
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  }
}

async function copyFiles() {
  try {
    const files = await fsPromises.readdir(ORIGIN_DIR);

    files.map(async (file) => {
      const originFilePath = `${ORIGIN_DIR}/${file}`;
      const outputFilePath = `${OUTPUT_DIR}/${file}`;
      await fsPromises.copyFile(originFilePath, outputFilePath);
    });

    return Promise.resolve(true);
  } catch {
    const err = new Error("FS operation failed. Failed to copy files.");
    stdout.write(colorizeText(err, "\x1b[31m"));
    process.exit(1);
  }
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m" + "\n";
}

await copy();
