import Engine from "./Engine.js";
class Instruction {
  constructor(op, rd, rs, rt, execTime) {
    this.op = op;
    this.rd = rd;
    this.rs = rs;
    this.rt = rt;
    this.execTime = execTime;
    this.executing = false;
    this.cycleIssued = undefined;
    this.cycleStarted = undefined;
    this.cycleWb = undefined;
    if (this.op === "LD" || this.op === "ST") {
      this.String = `${this.op} ${this.rd.name}, ${this.rs}`;
    } else {
      this.String = `${this.op} ${this.rd.name}, ${this.rs.name}, ${this.rt.name}`;
    }
  }

  execute() {
    this.execTime--;
    if (this.execTime === 0) {
      this.executing = false;
      this.cycleFinish = Engine.cycles;
      console.log(`\tFished ${this.op} ${this.rd.name}`);
    } else if (this.execTime === -1) {
      this.cycleWb = Engine.cycles;
      this.willRemove = true;
      this.willWriteBack = true;
      console.log(`\tWill WB ${this.op} ${this.rd.name}`);
    }
  }
}

// module.exports = Instruction;
export default Instruction;
