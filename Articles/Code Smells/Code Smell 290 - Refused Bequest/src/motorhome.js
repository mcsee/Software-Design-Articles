class House {
  constructor(address) {
    this.address = address;
  }
  address() {
    return this.address;
  }
  openDoor() {
    console.log("Door opened at " + this.address);
  }
}

class Motorhome {
  // doesn't inherit from House
  constructor(gps) {
    this.gps = gps;
  }
  openDoor() {
    console.log("Motorhome door opened at " + this.gps.getLocation());
  }
}