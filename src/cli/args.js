import process from "node:process";

const parseArgs = () => {
  const args = getArgs();

  if (args.length === 0) {
    const msg = "No arguments provided";
    console.log(colorizeText(msg, "\x1b[33m"));
    return;
  }

  for (let i = 0; i < args.length; i += 2) {
    const prop = args[i].slice(2);
    const value = args[i + 1];
    console.log(
      `${colorizeText(prop, "\x1b[34m")} is ${colorizeText(value, "\x1b[32m")},`
    );
  }
};

function getArgs() {
  return process.argv.slice(2);
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

parseArgs();
