const { isValidMnemonic } = require("@ethersproject/hdnode");

class verifier {
  isValidMnemonic(mnemonic) {
    return isValidMnemonic(mnemonic);
    // "spring second feel limb repeat toilet rabbit zone letter have concert noodle"
  }
}

module.exports = new verifier();
