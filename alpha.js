// const beta = require("./beta.js");

class alpha {
  static rf = "cee";
  constructor() {}
  static main() {
    const beta = require("./beta.js");
    console.log(alpha.rf);
    console.log(this.rf);
  }
}

module.exports = alpha;
