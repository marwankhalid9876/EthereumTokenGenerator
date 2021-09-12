var express = require("express");
var fs = require("fs");
var cors = require("cors");
const { request } = require("http");
const { RequestTimeout } = require("http-errors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { setData } = require("./service/tokenInfoStore.js");

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
  console.log(tokendata);
  // TODO: Perform Validation checkes
  setData(tokendata);
  try {
  } catch (error) {
    res.status(400).send("Bad Request");
  }
  console.log("running truffle");

  // exec("npx truffle migrate --network rinkeby --reset --compile-all", (error, stdout, stderr) => {
  exec("npx truffle compile", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  // Call the truffle Compiler / Deployers

  res.status(200).send("ok");
});

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
