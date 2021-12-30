const Engine = require("./Engine");
const latencies = {
  ADD: 4,
  SUB: 2,
  MUL: 6,
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
// const rawInstructions = [
//   "ADD R1, R2, R3",
//   "ADD R4, R1, R3",
//   "ADD R5, R4, R3",
//   "ADD R5, R5, R4",
//   "ST R5, 4",
// ];
const rawInstructions = [
  "MUL R3, R1, R2",
  "ADD R5, R3, R4",
  "ADD R7, R2, R6",
  "ADD R10, R8, R9",
  "MUL R11, R7, R10",
  "ADD R5, R5, R11",
];

let newEngine = new Engine();
newEngine.run(rawInstructions, latencies);
