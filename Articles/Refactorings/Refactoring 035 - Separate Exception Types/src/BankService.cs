public void Withdraw(int amount) {
  if (amount > Balance) {
    throw new Exception("Insufficient funds");
    // You might want to show this error to end users
  }
  if (connection == null) {
    throw new Exception("Database not available");
    // Internal error, log and notify operators. 
    // Fail with a more generic error
  }
  Balance -= amount;
}