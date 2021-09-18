function parseArgs(inputString) {
  const patternExtract = /\w+\((.*)\)/gm;

  const filter2 = inputString.match(patternExtract);

  let match = patternExtract.exec(filter2);

  if (match[1] === "") return [];
  return match[1].split(",");
}

//   console.log(parseArgs("decimals()"));
//   console.log(parseArgs("transferFrom(address,address,uint256)"));

module.exports = parseArgs;
