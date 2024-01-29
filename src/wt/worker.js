import { parentPort } from "node:worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on("message", (workerData) => {
    parentPort.postMessage({
      res: nthFibonacci(workerData.n),
      index: workerData.index,
    });
  });
};

sendResult();
