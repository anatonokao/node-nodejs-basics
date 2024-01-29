import { spawn } from "node:child_process";

const spawnChildProcess = async (...args) => {
  const child = spawn("node", ["./cp/files/script.js", ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(1, 2, 3);
