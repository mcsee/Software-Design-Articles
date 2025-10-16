// 1. Identify business exceptions
public class BusinessException : Exception {}
public class InsufficientFunds : BusinessException {}

// 2. Identify technical exceptions
public class TechnicalException : Exception {}
public class DatabaseUnavailable : TechnicalException {}

public void Withdraw(int amount) {
  // 3. Use the correct hierarchy
  if (amount > Balance) {
    throw new InsufficientFunds();
  }
  if (connection == null) {
    throw new DatabaseUnavailable();
  }

  // 4. Apply safe logic
  Balance -= amount;
}

// 5. Adjust handlers in the calling code
