const rawInstructions = [
  "ADD R1, 1, 2",
  "MUL R2, R1, 3",
  "SUB R3, R2, R1",
  "LD R4, 3(R1)",
  "ST R5, 4(R2)",
];

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
   * tick steps:
   *	// actually excute, who isExecuting
		// write back, publish to all, next cycle will be removed
		// issue to reservation station
		// reporting(print)
		// updates for next cycle: who isExcuting next,
	
   */

// todo: other parameters

const run = (rawInstructions) => {};

run(rawInstructions);
