import process from "node:process";

const parseEnv = () => {
  process.env.RSS_foo = "bar";
  process.env.RSS_bar = 1234;

  const rssFields = getEnvByPrefix("RSS_");
  if (rssFields.length === 0) {
    const msg = "No RSS_* environment variables found";
    console.log(colorizeText(msg, "\x1b[33m"));
  } else {
    rssFields.forEach(([key, value]) => {
      console.log(
        `${colorizeText(key, "\x1b[34m")} = ${colorizeText(value, "\x1b[32m")};`
      );
    });
  }
};

function getEnvByPrefix(prefix) {
  return Object.entries(process.env).filter(([key, _]) =>
    key.startsWith(prefix)
  );
}

function colorizeText(text, color) {
  return color + text + "\x1b[0m";
}

parseEnv();
