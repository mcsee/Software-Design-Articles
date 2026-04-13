class UserProcessor {
  private provider: MockDataProvider;

  constructor() {
    // You hardcode the dependency here.
    // This makes the class harder to test.
    this.provider = new MockDataProvider();
  }

  process(data: any) {
    return this.provider.format(data);
  }
}