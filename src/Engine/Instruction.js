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
  }
}

module.exports = Instruction;
