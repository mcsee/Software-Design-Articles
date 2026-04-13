interface DataProvider {
  format(data: any): any;
}

class UserProcessor {
  // You inject the dependency via constructor.
  // Now you can swap it or mock it easily.
  constructor(private readonly provider: DataProvider) {}

  process(data: any) {
    return this.provider.format(data);
  }
}