class TicketCart {
    private paymentMethod: PaymentMethod;

    constructor(paymentMethodType: string) {
        // TicketCart is tightly coupled
        // to specific payment method classes 
        // like CreditCardProcessor and CryptoService.  
        if (paymentMethodType === 'creditCard') {
            this.paymentMethod = new CreditCardProcessor();
        } else if (paymentMethodType === 'Crypto') {
            this.paymentMethod = new CryptoService();
        } else {
            throw new Error('Invalid payment method');
        }
    }

    checkout(money: Money): void {
        this.paymentMethod.pay(money);
    }
}

const cart = new TicketCart('creditCard');
const money = new Money(126, 'USD');
cart.checkout(money);