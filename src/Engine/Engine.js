const Register = require("./Register");
const Instruction = require("./Instruction");
const CRS = require("./CRS");
const Bus = require("./Bus");

class Engine {
  static rawInstructions = [];
  static instructionQueue = [];
  static issuedInstuctions = [];
  static RegisterFile = [
    // new Register("R0", 0),
    // new Register("R1", 0),
    // new Register("R2", 0),
    // new Register("R3", 0),
    // new Register("R4", 0),
  ];
  static cycles = 1;
  static allStations;
  static bus = new Bus();
  static memory = new Map();
  static stillExcuting = false;

  static findRegister(tag) {
    return Engine.RegisterFile.find((r) => r.name === tag);
  }
  static parse(rawInstructions, latencies) {
    // "ADD R1, 1, 2",
    // "MUL R2, R1, 3",
    // "SUB R3, R2, R1",
    // "LD R4, 3(R1)",
    // "ST R5, 4(R2)",
    Engine.rawInstructions = rawInstructions;
    Engine.instructionQueue = rawInstructions.map((inst) => {
      const [op, rv1, rv2, rv3] = inst
        .replace(/,/g, "")
        .toUpperCase()
        .split(" ");
      // console.log(op, rv1, rv2, rv3);
      const latency = latencies[op];
      const rd = this.findRegister(rv1);
      let rs, rt;

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

    // remove who willRemove

    // for each CRS excute who can execute
    for (const key in Engine.allStations) {
      Engine.allStations[key].excuteWhoCan();
    }

    for (const key in Engine.allStations) {
      Engine.allStations[key].wbWhoCan();
    }

    // Issue

    let nextInstruction = Engine.instructionQueue[0];

    // if no more instruction
    if (nextInstruction === undefined) return;

    const op = nextInstruction.op;
    let crs = undefined;
    if (op === "SUB") crs = Engine.allStations.ADD;
    else if (op === "DIV") crs = Engine.allStations.MUL;
    else crs = Engine.allStations[op];

    if (crs.canIssue()) {
      nextInstruction.cycleIssued = Engine.cycles;
      crs.issue(nextInstruction);
      Engine.issuedInstuctions.push(nextInstruction);
      Engine.instructionQueue.shift();
    }

    // for each CRS write back, who willWriteBack
    // Object.keys(Engine.allStations).forEach((crs) => {
    //   crs.wbWhoWill();
    // });
  }

  reactInitalize(rawInstructions, latencies) {
    // generate the registers
    for (let i = 0; i < 32; i++) {
      let newReg;
      newReg = new Register(`R${i}`, 0);
      // if (i === 2 || i === 3) newReg = new Register(`R${i}`, i);

      Engine.bus.scubscribe(newReg);
      Engine.RegisterFile.push(newReg);
    }

    // map of instruction name and execTime
    Engine.parse(rawInstructions, latencies);
    // map of CRS and this count of stations
    Engine.allStations = {
      ADD: new CRS("ADD", 3),
      MUL: new CRS("MUL", 3),
      LD: new CRS("LD", 3),
      ST: new CRS("ST", 3),
    };
  }
  reactTick() {
    // tick
    Engine.nextTick(); // excutes, write back, issue to reservation station

    console.log(`cycle # ${Engine.cycles}`);
    Engine.cycles++;

    Engine.stillExcuting = false;
    for (const key in Engine.allStations) {
      Engine.stillExcuting |= !Engine.allStations[key].empty();
    }
    return Engine.stillExcuting;
  }

  run(rawInstructions, latencies) {
    // generate the registers
    for (let i = 0; i < 32; i++) {
      let newReg;
      newReg = new Register(`R${i}`, 0);
      // if (i === 2 || i === 3) newReg = new Register(`R${i}`, i);

      Engine.bus.scubscribe(newReg);
      Engine.RegisterFile.push(newReg);
    }

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

      Engine.stillExcuting = false;
      for (const key in Engine.allStations) {
        Engine.stillExcuting |= !Engine.allStations[key].empty();
      }
    } while (Engine.stillExcuting);
  }
}

module.exports = Engine;
