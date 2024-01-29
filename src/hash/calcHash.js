import crypto from "node:crypto";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = `${__dirname}/files/fileToCalculateHashFor.txt`;

const calculateHash = async () => {
  const hash = crypto.createHash("sha256", "utf-8");
  hash.update(FILE_PATH);
  const result = hash.digest("hex");

  console.log(`Hash: ${colorizeText(result, "\x1b[32m")}`);
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await calculateHash();
