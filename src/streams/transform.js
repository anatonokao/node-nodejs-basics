import process from "node:process";

const transform = async () => {
  process.stdout.write(colorizeText("Write something: ", "\x1b[33m"));
  process.openStdin().on("data", (chunk) => {
    const reversed = chunk.toString().split("").reverse().join("");

    process.stdout.write(
      colorizeText(`Reversed: ${reversed.trim()}`, "\x1b[32m")
    );
    process.exit(0);
  });
};

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

await transform();
