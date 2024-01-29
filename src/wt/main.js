import { Worker } from "node:worker_threads";
import os from "node:os";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WORKER_PATH = `${__dirname}/worker.js`;
const cpuCores = os.cpus().length;

const performCalculations = async () => {
  const res = [];

  const workers = createWorkers(cpuCores, WORKER_PATH);

  workers.forEach((worker) => {
    worker.on("message", (data) => {
      res.splice(data.index, 0, {
        status: "resolved",
        data: data.res,
      });
      if (res.length === cpuCores) {
        console.log(res);
        process.exit(0);
      }
    });

    worker.on("error", (data) => {
      res.splice(data.index, 0, {
        status: "error",
        data: null,
      });
      if (res.length === cpuCores) {
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
