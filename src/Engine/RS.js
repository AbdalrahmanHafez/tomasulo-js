import Engine from "./Engine.js";
class RS {
  reset() {
    this.busy = false;
    this.v1 = null;
    this.v2 = null;
    this.q1 = 0; // 0 means valid, else means it's waiting for someone, his tag is in q1
    this.q2 = 0;
    this.result = null;
    this.op = null;
    this.execTime = null;
    this.veryBusy = "False";
  }
  constructor(tag) {
    this.tag = tag; // l0, M1, S2, A3
    this.reset();
  }
  issue(instruction) {
    this.instruction = instruction;
    this.op = instruction.op;

   
    this.busy = true;
    this.veryBusy = "True";
    const RegisterFile = Engine.RegisterFile;
    // instuicton has the registers from the RegisterFile
    if (Number.isInteger(instruction.rs)) {
      // store or load
      this.v1 = instruction.rs;
      this.q1 = 0;
      if (instruction.op === "ST") {
        if (instruction.rd.q === 0) {
          this.v2 = instruction.rd.value;
        } else {
          this.q2 = instruction.rd.q;
        }
      }
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
    if (instruction.op !== "ST") instruction.rd.q = this.tag; // l1 , M2, S3, A2

    console.log(`\tIssing ${instruction.op} ${instruction.rd.name}`);
  }

  excuteIfCan() {
    // const Engine = require("./Engine.js");
    // remove the will remove instructions
    if (this.instruction.willRemove) {
      this.reset();
    }
    if (this.instruction.execTime > -1) {
      this.execTime = this.instruction.execTime;
    }
    // check if instruction can execute
    if (this.q1 === 0 && this.q2 === 0) {
      this.instruction.executing = true;
      this.instruction.cycleStarted =
        this.instruction.cycleStarted === undefined
          ? Engine.cycles
          : this.instruction.cycleStarted;
      this.instruction.execute();
      if (this.instruction.execTime === 0) {
        switch (this.instruction.op) {
          case "ADD":
            this.result = this.v1 + this.v2;
            break;
          case "SUB":
            this.result = this.v1 - this.v2;
            break;
          case "MUL":
            this.result = this.v1 * this.v2;
            break;
          case "DIV":
            this.result = this.v1 / this.v2;
            break;
          case "LD":
            this.result = Engine.memory.get(this.v1);
            if (this.result === undefined) this.result = 0;
            break;
          // case "ST":
          //   Engine.memory.set(this.v1, this.v2);
          //   break;
          default:
            break;
        }
      }
      //  else if (this.instruction.willWriteBack)
      //   if (this.instruction.op !== "ST")
      //     Engine.bus.notify(this.tag, this.result);
    }
  }

  wbIfCan() {
    if (this.instruction.willWriteBack)
      if (this.instruction.op === "ST") {
        Engine.memory.set(this.v1, this.v2);
      } else Engine.bus.notify(this.tag, this.result);
  }

  reciveData(tag, data) {
    if (tag === this.q1) {
      this.v1 = data;
      this.q1 = 0;
    }
    if (tag === this.q2) {
      this.v2 = data;
      this.q2 = 0;
    }
  }

}

// module.exports = RS;
export default RS;
