trait PaymentProcessor {
    fn process(&self, amount: f64);
}

struct RealPaymentProcessor;
impl PaymentProcessor for RealPaymentProcessor {
    fn process(&self, amount: f64) {
        println!("Processing payment of ${}", amount);
    }
}

struct TestingPaymentProcessor;
impl PaymentProcessor for TestingPaymentProcessor {
    // Notice this is not a mock
    fn process(&self, _: f64) {
        println!("No payment: Skipping real transaction");
    }
}

struct PaymentService<T: PaymentProcessor> {
    processor: T,
}

impl<T: PaymentProcessor> PaymentService<T> {
    fn process_payment(&self, amount: f64) {
        self.processor.process(amount);
    }
}