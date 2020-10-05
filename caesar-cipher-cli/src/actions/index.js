const fs = require("fs");
const readline = require("readline");
const {
  createCaesarsCipherTransformer,
} = require("../features/createCaesarsCipherWritable");

exports.cliActionHandler = (dest) => {
  const { action, shift, input, output } = dest;

  if (!action) {
    console.error("Action flag is missing!");
    process.exit(1);
  }

  if (!shift) {
    console.error("Shift flag is missing!");
    process.exit(1);
  }

  // File-less CLI mode
  if (!input && !output) {
    const readStream = process.stdin.pipe(
      createCaesarsCipherTransformer(action, shift)
    );
    const writeStream = process.stdout;

    const rl = readline.createInterface({
      input: readStream,
      output: writeStream,
      prompt: `${action}> `,
    });

    rl.prompt();

    rl.on("line", () => {
      rl.prompt();
    });
  } else {
    fs.stat(output, (err, stats) => {
      if (err) {
        console.error(`Can't read a file, an error occurred: ${err.message}`);
        process.exit(2);
      }

      if (stats.isDirectory()) {
        console.error("Cant write to a directory, specify a file instead");
        process.exit(2);
      }
    });

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
};
