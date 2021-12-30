const alpha = require("./alpha.js");

class beta {
  constructor() {}
  method() {
    // tring to access alpha.rf
    console.log("rf from beta", alpha.rf);

    alpha.rf = "beta changed rf!";
    console.log("rf changed value? ", alpha.rf);
  }
}

module.exports = beta;
