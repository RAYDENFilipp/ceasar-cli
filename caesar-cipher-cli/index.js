const sade = require("sade");
const { cliActionHandler } = require("./src/actions");

const cli = sade("my_caesar_cli", true);

cli
  .version("1.0.3")
  .describe("Caesar cipher CLI tool")
  .option("-s, --shift", "A shift by how many characters to move an alphabet")
  .option("-i, --input", "Provide path to an input file")
  .option("-o, --output", "Change the name of the output file")
  .option("-a, --action", "An action, encode/decode")
  .example('-a encode -s 7 -i "./input.txt" -o "./output.txt"')
  .example("--action encode --shift 7 --input plain.txt --output encoded.txt")
  .example("--action decode --shift 7 --input encoded.txt --output plain.txt")
  .example("--action encode --shift 7  --output plain.txt")
  .example("--action decode --shift 7 --input decoded.txt")
  .action(cliActionHandler)
  .parse(process.argv);

exports.cli = cli;
