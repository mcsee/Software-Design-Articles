class User {
  public email;
  private name;
  
  // Step 1: Choose consistent indentation (2 spaces)
  // Step 4: Public methods before private ones
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  public getName() {
    return this.name;
  }
  
  // Step 3: Standardize spacing around operators
  public setName(newName) {
    this.name = newName;
  }
  
  // Step 2: Apply uniform brace placement
  private validateEmail() {
    return this.email.includes('@');
  }
}