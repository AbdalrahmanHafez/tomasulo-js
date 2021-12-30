class Register {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.q = 0;
  }

  reciveData(tag, data) {
    if (tag === this.q) {
      this.value = data;
      this.q = 0;
    }
  }

  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
  }
}

module.exports = Register;
