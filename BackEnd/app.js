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

app.post("/login", function (req, res) {
  console.log("logging in");
  const { mnemonic } = req.body;
  console.log("mnemonic", mnemonic);

  db.addUser(mnemonic);

  res.cookie("mnemonic", mnemonic);
  res.status(200).send("OK");
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
  const command = "truffle migrate --network rinkeby --reset --dry-run";

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
    if (parsedOut) db.updateUserTokenAdd(mnemonic, parsedOut);
    // res.status(200).send("ok");
  });
});

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
