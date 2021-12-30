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
    new Register("R0", 0),
    new Register("R1", 0),
    new Register("R2", 0),
    new Register("R3", 0),
    new Register("R4", 0),
  ];
  static cycles = 0;
  static allStations;

  static parse(rawInstructions) {
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

      const rd = new Register(rv1, null);
      let rs, rt;
      if (op === "LD" || op === "ST") {
        rs = rv2.match(/[0-9]+/)[0];
        return new Instruction(op, rd, rs, null, 1);
      }
      if (op === "ADD" || op === "SUB" || op === "MUL") {
        const parseValue = (v) => {
          if (v.match(/R[0-9]+/)) return new Register(v, null);
          else if (v.match(/[0-9]+/)) return parseInt(v);
          else console.log(`invalid instruction ${inst}`);
        };
        rs = parseValue(rv2); // can either be a Register or a number
        rt = parseValue(rv3);
        return new Instruction(op, rd, rs, rt, 1);
      }
    });
  }
  static nextTick() {
    // excute, who can execute?
    // write back, publish to all, next cycle will be removed, not this one
    // issue to reservation station
    // updates for next cycle: who isExcuting next,

    let nextInstruction = Engine.instructionQueue.shift();
  }

  run(rawInstructions) {
    // map of instruction name and execTime
    Engine.parse(rawInstructions);
    // map of CRS and this count of stations
    Engine.allStations = {
      ADD: new CRS(RSType.ADD, 3),
      SUB: new CRS(RSType.SUB, 3),
      MUL: new CRS(RSType.MUL, 3),
      LD: new CRS(RSType.LD, 3),
      ST: new CRS(RSType.ST, 3),
    };

    do {
      // tick
      Engine.nextTick();
      // todo: print
      console.log(`cycle # ${Engine.cycles}`);
      Engine.cycles++;
    } while (Engine.instructionQueue.length > 0);
  }
}

module.exports = Engine;
