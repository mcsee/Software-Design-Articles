public class CreditCard {
    private final String cardNumber;
    private final String cardHolderName;
    private final String expirationMonthYear;
    private final int cvv;

    public CreditCard(String cardNumber,
                      String cardHolderName,
                      String expirationMonthYear,
                      int cvv) {
        // 1. Identify essential attributes for object creation
        // 2. Create a constructor 
        // that accepts all essential attributes
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expirationMonthYear = expirationMonthYear;
        this.cvv = cvv;
    }

    // 3. Remove setter and getter methods 
    
    // Find real behavior related to credit card usage
  
}

// 4. Update object creation calls
// to pass all required attributes upfront
CreditCard card = new CreditCard("1234-5678-9012-3456",
                                 "Lilywhite Lilith", 
                                 "12/25", 
                                 123);