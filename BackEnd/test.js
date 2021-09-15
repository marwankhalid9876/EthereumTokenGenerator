var express = require("express");
var cors = require("cors");
const { request } = require("http");
const { RequestTimeout } = require("http-errors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec, spawn, fork } = require("child_process");
const { LocalStorage } = require("node-localstorage");
global.localStorage = new LocalStorage("./scratch");

var path = require("path");
var app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get("/str", function (req, res) {
  console.log("sending str");
  //   fs.createReadStream("./big.file").pipe(res);
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

const server_port = 8080;
app.listen(server_port, () => {
  console.log("server listening on ", server_port);
});
