const RS = require("./RS.js");

class CRS {
  constructor(type, count) {
    const Engine = require("./Engine.js");
    const bus = Engine.bus;
    this.type = type;
    this.count = count;
    // in range of count create an array
    this.stations = [];
    for (let i = 0; i < count; i++) {
      const firstLetter = type.charAt(0).toUpperCase();
      const newRs = new RS(`${firstLetter}${i}`);
      bus.scubscribe(newRs);
      this.stations.push(newRs); // L1, A2, M3, S2
    }
  }
  issue(instruction) {
    this.stations.filter((station) => !station.busy)[0].issue(instruction);
  }
  canIssue() {
    const avaibleCtr = this.stations.filter((station) => !station.busy).length;
    return avaibleCtr > 0;
  }

  excuteWhoCan() {
    this.stations.forEach((station) => {
      if (station.busy) {
        station.excuteIfCan();
      }
    });
  }

  wbWhoCan() {
    this.stations.forEach((station) => {
      if (station.busy) {
        station.wbIfCan();
      }
    });
  }

  empty() {
    return this.stations.filter((station) => station.busy).length === 0;
  }
  // if there's space in one of the stations(RS)
  // then issue to that station
}

module.exports = CRS;
