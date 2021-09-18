function parseDeployment(inputString) {
  const patternExtract = /^(.+:)\s+(.+)$/gm;
  const patternLines = /^[   ]{0,3}?\>.+?(?!\.)$/gm;

  const txt = inputString;
  //   TODO: revert
  const filter1 = txt.split("Starting migrations")[1];
  // const filter1 = txt;

  const blackList = [
    "Compiling",
    "Duplicate",
    "Artifacts",
    "Compil",
    "cause errors and unknown",
    "Saving ",
    "Blocks",
    "Total deployments",
  ];

  const filter2 = filter1
    .match(patternLines)
    .filter((match) => !blackList.some((bword) => match.includes(bword)));
  // TRIM remove leading white spaces
  const filter3 = filter2
    .map((sentence) => sentence.trim().replace("> ", ""))
    .join("\n");

  //   let result = [];
  match = patternExtract.exec(filter3);
  objAcc = {};
  while (match != null) {
    let obj = {};
    const key = match[1].replace(" ", "_").replace(":", ""); // block timestamp: => block_timestamp
    obj[key] = match[2];

    objAcc = { ...objAcc, ...obj };
    // result.push({ key: match[1], value: match[2] });
    //   console.log(match[0]);
    match = patternExtract.exec(filter3);
  }

  //   console.log(result);
  //   return result;
  return objAcc;
}

module.exports = parseDeployment;

// const fs = require("fs");
// const txt = fs.readFileSync("./truffle example run.txt").toString();
// parseDeployment(txt);

// Example output
// [
// 	{ key: 'Network name:    ', value: "'rinkeby'" },
// 	{ key: 'Network id:      ', value: '4' },
// 	{ key: 'Block gas limit: ', value: '29999972 (0x1c9c364)' },
// 	{
// 	  key: 'transaction hash:    ',
// 	  value: '0x372a1598ef6fd9ee5986291f52be8c6cadac54ad4ddf1683017f235b1a2b876a'
// 	},
// 	{
// 	  key: 'contract address:    ',
// 	  value: '0xE71C02dABAF3A5E26729f11E8959De984a6A1636'
// 	},
// 	{ key: 'block number:        ', value: '9310548' },
// 	{ key: 'block timestamp:     ', value: '1631913700' },
// 	{
// 	  key: 'account:             ',
// 	  value: '0xbf09c99396EEB4F7E0ccA7d3de36b1b7DC87E984'
// 	},
// 	{ key: 'balance:             ', value: '2.173424575' },
// 	{ key: 'gas used:            ', value: '1455313 (0x1634d1)' },
// 	{ key: 'gas price:           ', value: '10 gwei' },
// 	{ key: 'value sent:          ', value: '0 ETH' },
// 	{ key: 'total cost:          ', value: '0.01455313 ETH' },
// 	{ key: 'Total cost:          ', value: '0.01455313 ETH' },
// 	{ key: 'Total deployments:   ', value: '1' },
// 	{ key: 'Final cost:          ', value: '0.01455313 ETH' }
//   ]
