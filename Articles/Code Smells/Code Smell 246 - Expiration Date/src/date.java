import java.util.Date;

public class CreditCard {
    private String cardNumber;
    private Date expiryDate;

    public CreditCard(String cardNumber, Date expiryDate) {
        // Not a complete date
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
    }

    public boolean isExpired() {
        Date currentDate = new Date();
        return expiryDate.before(currentDate);
        // How will it work? 
        // using the last day of the month?
    }
}