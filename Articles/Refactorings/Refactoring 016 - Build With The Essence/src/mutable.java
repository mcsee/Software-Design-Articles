public class CreditCard {
    private String cardNumber;
    private String cardHolderName;
    private String expirationMonthYear;
    private int cvv;

    public CreditCard() {} // Empty Constructor

    public void setCardNumber(String cardNumber) { 
        this.cardNumber = cardNumber; 
    }
    public void setCardHolderName(String cardHolderName) { 
        this.cardHolderName = cardHolderName; 
    }
    public void setExpirationMonthYear(String expirationMonthYear) { 
        this.expirationMonthYear = expirationMonthYear;
    }
    public void setCvv(int cvv) { 
        this.cvv = cvv; 
    }

    public String getCardNumber() { 
        return cardNumber; 
    }
    public String getCardHolderName() {
        return cardHolderName;
    }
    public String getExpirationMonthYear() {
        return expirationMonthYear; 
    }
    public int getCvv() {
        return cvv; 
    }
}

CreditCard card = new CreditCard();
card.setCardNumber("1234-5678-9012-3456");
card.setCardHolderName("Lilywhite Lilith");
card.setExpirationMonthYear("12/25");
card.setCvv(123);