/**
   * Bus: every rs should subscribe 
   * CRS:
   *  array of RSs
   * RS:
   *    willRemove, willWB
   * Instruction:
   * 
   * 
   * parse the raw instructions
   * 
  
	
   */

const Register = require("./Register");
const Instruction = require("./Instruction");
const CRS = require("./CRS");
const RSType = require("./enums").RSType;

class Engine {
  static instructionQueue = [];
  static RegisterFile = [
    // new Register("R0", 0),
    // new Register("R1", 0),
    // new Register("R2", 0),
    // new Register("R3", 0),
    // new Register("R4", 0),
  ];
  static cycles = 1;
  static allStations;

  static findRegister(tag) {
    return Engine.RegisterFile.find((r) => r.name === tag);
  }
  static parse(rawInstructions, latencies) {
    // "ADD R1, 1, 2",
    // "MUL R2, R1, 3",
    // "SUB R3, R2, R1",
    // "LD R4, 3(R1)",
    // "ST R5, 4(R2)",
    Engine.instructionQueue = rawInstructions.map((inst) => {
      const [op, rv1, rv2, rv3] = inst
        .replace(/,/g, "")
        .toUpperCase()
        .split(" ");
      // console.log(op, rv1, rv2, rv3);
      const latency = latencies[op];
      const rd = this.findRegister(rv1);
      let rs, rt;
      // if (op === "LD" || op === "ST") {
      //   rs = rv2.match(/[0-9]+/)[0];
      //   return new Instruction(op, rd, rs, null, latency);
      // }
      const parseValue = (v) => {
        if (!v) return null;
        if (v.match(/R[0-9]+/)) return this.findRegister(v);
        else if (v.match(/[0-9]+/)) return parseInt(v);
        else console.log(`invalid instruction ${inst}`);
      };
      rs = parseValue(rv2); // can either be a Register or a number
      rt = parseValue(rv3);
      return new Instruction(op, rd, rs, rt, latency);
    });
  }
  static nextTick() {
    // excute, who can execute?
    // write back, publish to all, next cycle will be removed, not this one
    // issue to reservation station
    // updates for next cycle: who isExcuting next,

    let nextInstruction = Engine.instructionQueue.shift();
    const op = nextInstruction.op;
    let crs = undefined;
    if (op === "SUB") crs = Engine.allStations.ADD;
    else if (op === "DIV") crs = Engine.allStations.MUL;
    else crs = Engine.allStations[op];

    if (crs.canIssue()) {
      crs.issue(nextInstruction);
    }
  }

  run(rawInstructions, latencies) {
    // generate the registers
    for (let i = 0; i < 32; i++)
      Engine.RegisterFile.push(new Register(`R${i}`, 0));

    // map of instruction name and execTime
    Engine.parse(rawInstructions, latencies);
    // map of CRS and this count of stations
    Engine.allStations = {
      ADD: new CRS("ADD", 3),
      MUL: new CRS("MUL", 3),
      LD: new CRS("LD", 3),
      ST: new CRS("ST", 3),
    };

    do {
      // tick
      Engine.nextTick(); // excutes, write back, issue to reservation station

      console.log(`cycle # ${Engine.cycles}`);
      Engine.cycles++;
    } while (Engine.instructionQueue.length > 0);
  }
}

module.exports = Engine;
