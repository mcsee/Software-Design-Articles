function processPayment(paymentData) {
  try {
    validatePayment(paymentData);
    // This catch is specific to payment validation
  } catch (error) {
    // 1. Identify all generic error messages in your codebase
    // that use terms like "Oops", "Something went wrong", 
    // or "An error occurred"    
    // 2. Replace generic messages 
    // with specific descriptions of what happened
    // 3. Add actionable guidance telling users 
    // exactly what they can do to resolve the issue
    // 4. Implement proper internal logging 
    // to capture technical details for developers
    logger.error('Payment validation failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    // 5. Add monitoring alerts to notify 
    // the development team when errors occur frequently    
    alerting.notifyError('PAYMENT_VALIDATION_FAILED', error);
    if (error.code === 'INVALID_CARD') {
      return {
        success: false,
        userMessage: "Your card information" + 
        " appears to be incorrect." +
        "Please check your card number," + 
        " expiry date, and security code."
      };
    }
    return {
      success: false,
      userMessage: "There was a problem validating" +
      " your payment." +
      "Please try again or contact support."
    };
  }

  // You should break this long method
  // Using extract method
  try {
    chargeCard(paymentData);
  } catch (error) {
    logger.error('Card charging failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    alerting.notifyError('CARD_CHARGING_FAILED', error);
    if (error.code === 'INSUFFICIENT_FUNDS') {
      return {
        success: false,
        userMessage: "Your payment couldn't be processed"+
        " due to insufficient funds. " +
        "Please use a different payment method" + 
        " or contact your bank."
      };
    }
    if (error.code === 'CARD_EXPIRED') {
      return {
        success: false,
        userMessage: "Your card has expired. " +
        "Please update your payment method with a current card."
      };
    }
    return {
      success: false,
      userMessage: "There was a problem processing your payment." +
      " Please try again or contact support."
    };
  }

  try {
    sendConfirmation(paymentData.email);
  } catch (error) {
    logger.error('Confirmation sending failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    alerting.notifyError('CONFIRMATION_FAILED', error);
    return {
      success: true,
      userMessage: "Payment processed successfully,"+
      " but we couldn't send the confirmation email." +
      " Please check your email address or contact support."
    };
  }

  return { success: true,
          userMessage: "Payment processed successfully." };
}
