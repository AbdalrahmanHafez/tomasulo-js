class RS {
  constructor(tag) {
    this.tag = tag;
    this.busy = false;
    this.v1 = null;
    this.v2 = null;
    this.q1 = null;
    this.q2 = null;
  }
  issue(inst) {
    // todo: based on Register File, fill v1, v2, q1, q2
    console.log("issing ", inst);
  }
}

module.exports = RS;
