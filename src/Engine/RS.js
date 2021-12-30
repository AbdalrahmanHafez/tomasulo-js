class RS {
  constructor(tag) {
    this.tag = tag;
    this.busy = false;
    this.v1 = null;
    this.v2 = null;
    this.q1 = 0; // 0 means valid, else means it's waiting for someone, his tag is in q1
    this.q2 = 0;
  }
  issue(instruction) {
    const Engine = require("./Engine.js");

    // todo: based on Register File, fill v1, v2, q1, q2
    this.busy = true;
    const RegisterFile = Engine.RegisterFile;
    // instuicton has the registers from the RegisterFile
    if (Number.isInteger(instruction.rs)) {
      // store or load
      this.v1 = instruction.rs;
      this.q1 = 0;
    } else {
      if (instruction.rs.q === 0) {
        this.v1 = instruction.rs.value;
        this.q1 = 0;
      } else {
        this.v1 = null;
        this.q1 = instruction.rs.q;
      }
      if (instruction.rt.q === 0) {
        this.v2 = instruction.rt.value;
        this.q2 = 0;
      } else {
        this.v2 = null;
        this.q2 = instruction.rt.q;
      }
    }

    instruction.rd.q = this.tag; // l1 , M2, S3, A2

    console.log("issing ", instruction);
  }

  // TODO: when removing the RS, clear its' values and q
}

module.exports = RS;
