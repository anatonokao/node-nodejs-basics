import process from "node:process";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  process.stdout.write(colorizeText("Write something: ", "\x1b[33m"));
  process.openStdin().on("data", (chunk) => {
    const number = parseInt(chunk.toString());
    if (isNaN(number)) {
      process.stdout.write(
        colorizeText("Invalid input. Write a number.\n", "\x1b[31m")
      );
      process.exit(0);
    }

    process.stdout.write(
      colorizeText(`Result: ${nthFibonacci(number)}`, "\x1b[32m")
    );
    process.exit(0);
  });
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

sendResult();
