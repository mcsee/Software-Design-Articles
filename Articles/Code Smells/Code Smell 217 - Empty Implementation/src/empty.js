class MerchantProcessor {
  processPayment(amount) {
    // no default implementation
  }
}

class MockMerchantProcessor extends MerchantProcessor {
  processPayment(amount) {
     // Empty implementation to comply with compiler
     // Won't do anything
  }
}