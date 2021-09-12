const path = require("path"); //cross platform compatibility
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "SimpleToken.sol"); //current working directory
console.log(inboxPath);
const source = fs.readFileSync(inboxPath, "utf8"); //read raw source file

// module.exports = solc.compile(source, 1).contracts[":SimpleToken"];

// The last line of codes need to be changed like below.
const input = {
  language: "Solidity",
  sources: {
    "SimpleToken.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("HHHHHHHHHHHHHHHHHHHHHHHH", output);

//   module.exports = output.contracts["SimpleToken.sol"].SimpleToken;
