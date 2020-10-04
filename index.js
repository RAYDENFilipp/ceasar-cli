#!/usr/bin/env node
const process = require("process");
const sade = require("sade");
const readline = require("readline");

const prog = sade("my_caesar_cli", true);

prog
  .version("1.0.0")
  .describe("Caesar cipher CLI tool")
  .option("-s, --shift", "A shift by how many characters to move an alphabet")
  .option("-i, --input", "Provide path to an input file")
  .option("-o, --output", "Change the name of the output file")
  .option("-a, --action", "Change the name of the output file")
  .example('-a encode -s 7 -i "./input.txt" -o "./output.txt"')
  .example("--action encode --shift 7 --input plain.txt --output encoded.txt")
  .example("--action decode --shift 7 --input decoded.txt --output plain.txt")
  .action((dest) => {
    if (!(dest.i && dest.o)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ">",
      });

      rl.on("line", () => {
        console.log(`> building from to ${JSON.stringify(dest)}`);
      });
    } else {
    }
  })
  .parse(process.argv);
