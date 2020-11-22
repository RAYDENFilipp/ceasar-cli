const readline = require("readline");
const {
  createCaesarsCipherTransformer,
} = require("../features/createCaesarsCipherWritable");
const createSourceFileStream = require("./helpers/createSourceFileStream");

exports.cliActionHandler = async (dest) => {
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
    let readStream;
    let writeStream;

    try {
      if (input) {
        readStream = await createSourceFileStream(input, "createReadStream");
      } else {
        readStream = process.stdin;
      }

      if (output) {
        writeStream = await createSourceFileStream(
          output,
          "createWriteStream",
          {
            flags: "a",
          }
        );
      } else {
        writeStream = process.stdout;
      }
    } catch {
      console.error(`Can't read a file, please, provide one`);
      process.exit(2);
    }

    readStream
      .pipe(createCaesarsCipherTransformer(action, shift))
      .pipe(writeStream);
  }
};
