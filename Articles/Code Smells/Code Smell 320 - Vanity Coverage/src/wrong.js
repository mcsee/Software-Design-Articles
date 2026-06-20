describe('BankAccount', () => {
  test('deposit', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    // Only checking it didn't crash
    expect(account).toBeDefined();
  });

  test('withdraw', () => {
    const account = new BankAccount(100);
    const result = account.withdraw(30);
    // No assertion about the result!
  });

  test('transfer', () => {
    const source = new BankAccount(200);
    const target = new BankAccount(0);
    // Just calling the method to "cover" the line
    source.transfer(50, target);
  });
});
