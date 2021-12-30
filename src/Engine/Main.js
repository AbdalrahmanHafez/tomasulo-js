const Engine = require("./Engine");
const latencies = {
  ADD: 1,
  SUB: 2,
  MUL: 3,
  DIV: 4,
  LD: 1,
  ST: 2,
};
// const rawInstructions = [
//   "ADD R11, R22, R10",
//   "MUL R2, R1, R3",
//   "SUB R3, R2, R11",
//   "LD R30, 30",
//   "ST R5, 4",
// ];

const rawInstructions = [
  "ADD R1, R2, R3",
  "ADD R4, R1, R3",
  "ADD R5, R4, R3",
  "ADD R5, R5, R4",
  "ST R5, 4",
];

let newEngine = new Engine();
newEngine.run(rawInstructions, latencies);
