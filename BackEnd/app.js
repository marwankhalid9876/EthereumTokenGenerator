var express = require("express");
var fs = require("fs");
var cors = require("cors");
const { request } = require("http");
const { RequestTimeout } = require("http-errors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec, spawn, fork } = require("child_process");
const userAuth = require("./middlewares/userAuth");
const db = require("./service/fakeDb");
const parseDeployment = require("./service/Parser");
const tokenService = require("./service/tokenService");
const verifier = require("./service/verifier");

var path = require("path");
var app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(userAuth);

app.get("/", function (req, res) {
  res.json({ message: "Welcome from the node Serve" });
});
app.get("/getUserTokenList", function (req, res) {
  const tokens = db.getUserTokens(req.mnemonic);
  res.status(200).send(tokens);
});

app.post("/getContractInfo", function (req, res) {
  const mnemonic = req.mnemonic;
  const blockTimeStamp = req.body.blockTimeStamp;
  const result = db.getContractInfo(mnemonic, blockTimeStamp);
  res.status(200).send(result);
});

app.post("/getContractMethods", function (req, res) {
  console.log("geting contreact methods");
  const mnemonic = req.mnemonic;
  const { contractAddress, tknType } = req.body;

  const result = tokenService.getContractMethods(
    mnemonic,
    contractAddress,
    tknType
  );
  console.log(result);
  res.status(200).send(result);
});
app.post("/callMethod", function (req, res) {
  const mnemonic = req.mnemonic;
  const { contractAddress, methodName, args, tknType } = req.body;
  console.log("calling", methodName, args);

  // TODO: REVERT
  try {
    const result = tokenService.callMethod(
      mnemonic,
      contractAddress,
      methodName,
      args,
      tknType,
      (result) => {
        console.log("responding with", result);
        res.status(200).send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/login", function (req, res) {
  console.log("logging in");
  const { mnemonic } = req.body;
  console.log(" mnemonic", mnemonic);

  if (verifier.isValidMnemonic(mnemonic)) {
    db.addUser(mnemonic);

    res.cookie("mnemonic", mnemonic);
    res.status(200).send("OK");
  } else res.status(403).send({ msg: "AccessDenied" });
});
app.post("/logout", function (req, res) {
  const mnemonic = req.body.mnemonic;
  console.log("logging out", mnemonic);

  res.clearCookie("mnemonic");
  res.status(200).send("OK");
});

app.post("/deploy", function (req, res) {
  const tokendata = req.body;
  const mnemonic = req.mnemonic;

  db.set("tokendata", tokendata);

  console.log("recived:", tokendata);
  // TODO: Perform Validation checkes
  let stdoutput = [];
  console.log("running truffle");
  const command = "truffle migrate --network rinkeby --reset";

  const prog = spawn("cmd.exe", ["/c", command]);

  prog.stdout.pipe(res);
  prog.stdout.on("data", (data) => {
    console.log(data.toString());
    stdoutput.push(data);
  });

  prog.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  prog.on("exit", (code) => {
    console.log(`Child exited with code ${code}`);
    stdoutput = stdoutput.join("\n");
    const parsedOut = parseDeployment(stdoutput);
    if (parsedOut)
      db.updateUserTokenAdd(mnemonic, { ...parsedOut, ...tokendata });
    // res.status(200).send("ok");
  });
});

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
