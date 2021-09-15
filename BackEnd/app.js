var express = require("express");
var fs = require("fs");
var cors = require("cors");
const { request } = require("http");
const { RequestTimeout } = require("http-errors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec, spawn } = require("child_process");
const store = require("store");

var path = require("path");
var app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.json({ message: "Welcome from the node Serve" });
});

app.post("/deploy", function (req, res) {
  const tokendata = req.body;
  store.set("tokendata", tokendata);

  console.log("recived:", tokendata);
  // TODO: Perform Validation checkes

  console.log("running truffle");

  // exec("npx truffle migrate --network rinkeby --reset --compile-all", (error, stdout, stderr) => {
  const command = "truffle migrate --network rinkeby --reset --compile-all";
  const bat = spawn("cmd.exe", ["/c", command]);

  bat.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  bat.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  bat.on("exit", (code) => {
    console.log(`Child exited with code ${code}`);
  });
  // Call the truffle Compiler / Deployers

  res.status(200).send("ok");
});

app.get("/getTokenData", function (req, res) {
  const data = store.get("tokendata");
  console.log("sending to truffle", data);
  res.json(data);
});

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
