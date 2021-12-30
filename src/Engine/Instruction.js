class Instruction {
  constructor(op, rd, rs, rt, execTime) {
    this.op = op;
    this.rd = rd;
    this.rs = rs;
    this.rt = rt;
    this.execTime = execTime;
    this.executing = false;
  }

  execute() {
    this.execTime--;
    const Engine = require("./Engine");
    if (this.execTime === 0) {
      this.executing = false;
      this.fininshTime = Engine.cycles;
      console.log(`Fished ${this.op} ${this.rd.name}`);
    } else if (this.execTime === -1) {
      this.willRemove = true;
      this.willWriteBack = true;
      console.log(`will WB ${this.op} ${this.rd.name}`);
    }
  }
}

module.exports = Instruction;
