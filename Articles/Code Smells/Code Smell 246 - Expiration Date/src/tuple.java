public class CreditCard {
    private String cardNumber;
    private int expiryMonth;
    private int expiryYear;

    public CreditCard(String cardNumber, int expiryMonth, int expiryYear) {
        this.cardNumber = cardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        // No validations on number ranges?
    }

    public boolean isExpired(int currentMonth, int currentYear) {
        return (expiryYear < currentYear) ||
            (expiryYear == currentYear && expiryMonth < currentMonth);
    }
    // Inappropriate intimacy code smell
 
}