const { join } = require("path");
const fs = require("fs");
const { readFileSync, writeFileSync } = fs;

console.log("Converting .rhn wasm file(s) to base64 ...");

const rhnContextDirectoryWasm = join(
  __dirname
);

const outputDirectory = join(__dirname);
fs.mkdirSync(outputDirectory, { recursive: true });

const contextName = "clock";

const rhnModel = readFileSync(
  join(rhnContextDirectoryWasm, `${contextName}.rhn`)
);
const strBase64 = Buffer.from(rhnModel).toString("base64");
const jsSourceFileOutput = `export const ${contextName.toUpperCase()}_EN_64 = "${strBase64}"\n`;

writeFileSync(
  join(outputDirectory, `clock.ts`),
  jsSourceFileOutput
);

console.log("Done!");