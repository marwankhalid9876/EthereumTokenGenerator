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
  db.updateUserTokenAdd(mnemonic, { ...tokendata });
  // let users = db.get("users");
  // users.forEach((user) => {
  //   if (user.mnemonic == mnemonic) {
  //     user["tokendata"] = tokendata;
  //   }
  // });
  // db.set("users", users);

  db.set("tokendata", tokendata);

  console.log("recived:", tokendata);
  // TODO: Perform Validation checkes

  console.log("running truffle");
  const command = "truffle migrate --network rinkeby --reset --compile-all";
  const bat = spawn("cmd.exe", ["/c", command]);

  bat.stdout.pipe(res);
  bat.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  bat.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  bat.on("exit", (code) => {
    console.log(`Child exited with code ${code}`);
    res.status(200).send("ok");
  });
});

app.get("/getTokenData", function (req, res) {
  const data = Store.get("tokendata");
  console.log("sending to truffle", data);
  res.json(data);
});

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
