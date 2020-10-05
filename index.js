#!/usr/bin/env node
const fs = require("fs");
const sade = require("sade");
const readline = require("readline");
const {
  createCaesarsCipherTransformer,
} = require("./src/features/createCaesarsCipherWritable");

const prog = sade("my_caesar_cli", true);

prog
  .version("1.0.0")
  .describe("Caesar cipher CLI tool")
  .option("-s, --shift", "A shift by how many characters to move an alphabet")
  .option("-i, --input", "Provide path to an input file")
  .option("-o, --output", "Change the name of the output file")
  .option("-a, --action", "An action, encode/decode")
  .example('-a encode -s 7 -i "./input.txt" -o "./output.txt"')
  .example("--action encode --shift 7 --input plain.txt --output encoded.txt")
  .example("--action decode --shift 7 --input decoded.txt --output plain.txt")
  .action((dest) => {
    const { action, shift, input, output } = dest;

    if (!action) {
      console.error("Action flag is missing!");
      process.exit(1);
    }

    if (!shift) {
      console.error("Shift flag is missing!");
      process.exit(1);
    }

    if (!input && !output) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ">",
      });

      rl.on("line", () => {
        console.log(`> building from to ${JSON.stringify(dest)}`);
      });
    } else {
      const readStream = input ? fs.createReadStream(input) : process.stdin;
      const writeStream = output
        ? fs.createWriteStream(output, { flags: "a" })
        : process.stdout;

      readStream.on("error", () => {
        console.error("File to be read is unavailable or invalid!");
        process.exit(2);
      });

      readStream
        .pipe(createCaesarsCipherTransformer(action, shift))
        .pipe(writeStream);
    }
  })
  .parse(process.argv);
