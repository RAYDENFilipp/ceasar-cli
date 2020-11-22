const fs = require("fs");
const { promisify } = require("util");

const createSourceFileStream = async (source, funcName, options) => {
  const stat = promisify(fs.stat);
  const sourceStats = await stat(source);

  if (sourceStats.isDirectory()) {
    console.error("Cant write to a directory, please, specify a file instead");
    process.exit(2);
  }

  return fs[funcName](source, options);
};

module.exports = createSourceFileStream;
