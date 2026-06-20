describe('BankAccount', () => {
  test('deposit increases balance', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.balance()).toBe(150);
  });

  test('withdraw decreases balance', () => {
    const account = new BankAccount(100);
    account.withdraw(30);
    expect(account.balance()).toBe(70);
  });

  test('withdraw raises on insufficient funds', () => {
    const account = new BankAccount(50);
    expect(() => account.withdraw(100))
      .toThrow(InsufficientFundsError);
  });

  test('transfer moves money between accounts', () => {
    const source = new BankAccount(200);
    const target = new BankAccount(0);
    source.transfer(50, target);
    expect(source.balance()).toBe(150);
    expect(target.balance()).toBe(50);
  });
});
