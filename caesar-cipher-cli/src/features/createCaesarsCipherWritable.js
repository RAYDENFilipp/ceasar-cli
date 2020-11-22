const { Transform } = require("stream");

/**
 * Function-creator returns a transformer
 * @param {string} action
 * @param {number} shift
 * @returns {module:stream.internal.Transform}
 * */
exports.createCaesarsCipherTransformer = (action, shift) =>
  new Transform({
    transform(chunk, _, cb) {
      const inputString = chunk.toString();

      const strArr = inputString.split("");

      const processedChunk = strArr.reduce((acc, item) => {
        const charCode = item.charCodeAt();
        const isLatin = /[A-Z]/.test(item.toUpperCase());
        const { fromCharCode } = String;

        if (isLatin) {
          const isItemUppercase = item.toUpperCase() === item;
          const charCodeA = isItemUppercase ? 65 : 97;
          const charCodeZ = isItemUppercase ? 90 : 122;
          let isShiftWithinTheRange;
          let processCaesarCiphering;
          let processCaesarCipheringOnOverflow;

          if (action === "decode") {
            processCaesarCiphering = charCode - shift;
            isShiftWithinTheRange = charCodeA <= processCaesarCiphering;
            processCaesarCipheringOnOverflow =
              processCaesarCiphering +
              charCodeZ -
              charCodeA +
              1; /* shift in this case includes Z, which should be excluded */
          } else if (action === "encode") {
            processCaesarCiphering = charCode + shift;
            isShiftWithinTheRange = charCodeZ >= processCaesarCiphering;
            processCaesarCipheringOnOverflow =
              processCaesarCiphering -
              charCodeZ +
              charCodeA -
              1; /* shift in this case includes A, which should be excluded */
          } else {
            console.error(
              "Action flag accepts 'encode' or 'decode'. Wrong option has been received"
            );
            process.exit(1);
          }

          return (
            acc +
            (isShiftWithinTheRange
              ? fromCharCode(processCaesarCiphering)
              : fromCharCode(processCaesarCipheringOnOverflow))
          );
        }
        return acc + item;
      }, "");

      cb(null, processedChunk);
    },
  });
