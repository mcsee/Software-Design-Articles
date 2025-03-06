struct PaymentService {
    is_testing: bool,
}

impl PaymentService {
    fn process_payment(&self, amount: f64) {
        if self.is_testing {
            println!("Testing mode: Skipping real payment");
            return;
        }
        println!("Processing payment of ${}", amount);
    }
}