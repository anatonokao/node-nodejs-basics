import { Worker } from "node:worker_threads";
import os from "node:os";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WORKER_PATH = `${__dirname}/worker.js`;
const cpuCores = os.cpus().length;

const performCalculations = async () => {
  const workers = createWorkers(cpuCores, WORKER_PATH);

  const res = Array.from({ length: cpuCores }, () => null);

  workers.forEach((worker) => {
    worker.on("message", (data) => {
      res[data.index] = {
        status: "resolved",
        data: data.res,
      };
      if (!res.includes(null)) {
        console.log(res);
        process.exit(0);
      }
    });

    worker.on("error", (data) => {
      res[data.index] = {
        status: "error",
        data: null,
      };
      if (!res.includes(null)) {
        console.log(res);
        process.exit(0);
      }
    });
  });

  workers.forEach((worker, index) => {
    worker.postMessage({ n: 10 + index, index });
  });
};

function createWorkers(n, workerPath) {
  return Array.from({ length: n }, () => new Worker(workerPath));
}

await performCalculations();
