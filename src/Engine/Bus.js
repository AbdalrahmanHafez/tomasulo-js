class Bus {
  constructor() {
    this.listeners = [];
  }
  scubscribe(who) {
    this.listeners += who;
  }
  notify(tag, data) {
    this.listeners.forEach((listener) => listener.reciveData(tag, data));
  }
}

module.exports = Bus;
