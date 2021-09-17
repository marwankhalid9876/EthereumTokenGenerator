require("dotenv").config();

const userAuth = (req, res, next) => {
  let mnemonic = req.cookies["mnemonic"];
  if (req.originalUrl == "/login") {
    next();
    return;
  } else if (req.originalUrl == "/deploy") {
    // For some reason the FE FetchStream does not send cookies :(
    mnemonic = req.body.mnemonic;
  }

  if (typeof mnemonic !== "undefined") {
    req.mnemonic = mnemonic;

    next();
  } else {
    console.log("denied auth ok");
    res.status(403).send("unathorized");
  }
};

module.exports = userAuth;
