class Auto {
  constructor(motor) {
    this.motor = motor
  }

  startEngine(motor) {
    motor.ignite()
  }
}

// Usage
const motor = new Motor()
const auto = new Auto(motor)

auto.startEngine(motor)
// Redundant and maybe inconsistent