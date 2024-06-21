
// Domain classes
abstract class Transaction {
    private String id;
    private double amount;
}

class BankTransaction extends Transaction {
    private String bankName;
}

class CreditCardTransaction extends Transaction {
    private String cardNumber;
}

// Persistence classes
abstract class TransactionDAO {
    private String id;
    private double amount;
}

class BankTransactionDAO extends TransactionDAO {
    private String bankName;
}

class CreditCardTransactionDAO extends TransactionDAO {
    private String cardNumber;
}