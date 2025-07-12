class Auto {
  constructor(motor) {
    this.motor = motor
  }
    
  // 1. Identify methods that receive owned attributes    
  startEngine() {
    // 2. Remove those parameters from the method signature  
    // 4. Rename the method if needed to match the new intention
    this.motor.ignite()
  }
}

// Adjust usage to call without passing motor
const motor = new Motor()
const auto = new Auto(motor)

// 3. Replace usage with direct access to the attribute  
auto.startEngine() // No parameter needed