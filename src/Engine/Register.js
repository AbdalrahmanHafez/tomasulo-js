class Register {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
  }
}

module.exports = Register;
