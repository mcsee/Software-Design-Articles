class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  email() {
    return this.email;
    // might be null    
  }  
}

// You can't use safely person.email()
// You need to check for null explicitly