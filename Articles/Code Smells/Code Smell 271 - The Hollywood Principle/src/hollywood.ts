interface PaymentMethod {
    pay(total: Money): void;
}

class TicketCart {
    private paymentMethod: PaymentMethod;

    constructor(paymentMethod: PaymentMethod) {
        // This solution is more open and less coupled
        // because it relies on abstractions
        this.paymentMethod = paymentMethod;
    }

    checkout(total: Money): void {
        this.paymentMethod.pay(total);
    }
}

class CreditCardProcessor implements PaymentMethod {
    pay(total: Money): void {
        console.log(`Processing payment of ${total.Amount()} 
        ${total.currency()} using credit card.`);
    }
}

const creditCardProcessor = new CreditCardProcessor();
const cart = new TicketCart(creditCardProcessor);
const total = new Money(126, 'USD');
cart.checkout(total);