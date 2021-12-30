class RS {
  constructor(type) {
    this.type = type;
    this.busy = false;
    this.v1 = null;
    this.v2 = null;
    this.q1 = null;
    this.q2 = null;
  }
  add(inst) {
    // todo: based on Register File, fill v1, v2, q1, q2
  }
}

module.exports = RS;
