 // Simpler but coupled
 class UserProcessor {
    constructor() {
      // Empty
    }
  
    process(data: any) {
      return new MockDataProvider().format(data);
    }
  }