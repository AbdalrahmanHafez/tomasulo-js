const Engine = require("./Engine");

const rawInstructions = [
  "ADD R1, 1, 2",
  "MUL R2, R1, 3",
  "SUB R3, R2, R1",
  "LD R4, 3(R1)",
  "ST R5, 4(R2)",
];

let newEngine = new Engine();
newEngine.run(rawInstructions);
