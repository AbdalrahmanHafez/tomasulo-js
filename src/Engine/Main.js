const Engine = require("./Engine");
const latencies = {
  ADD: 1,
  SUB: 2,
  MUL: 3,
  DIV: 4,
  LD: 1,
  ST: 2,
};
const rawInstructions = [
  "ADD R1, 1, 2", // not mips
  "MUL R2, R1, 3", // supported ???
  "SUB R3, R2, R1",
  "LD R4, 3(R1)", //   "LD R4, 3",
  "ST R5, 4(R2)", //  "ST R5, 4",
];

let newEngine = new Engine();
newEngine.run(rawInstructions, latencies);
