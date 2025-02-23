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

class Motorhome extends House {
  constructor() {
    super(null);
  }
  address() {
    return null;
    // This implementation is the same as the parent's
    // and is also a refused bequest
  }
  openDoor() {
    console.log("Motorhome door opened.");
  }
}