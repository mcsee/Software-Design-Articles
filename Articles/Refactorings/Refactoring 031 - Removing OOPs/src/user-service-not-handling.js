function processPayment(paymentData) {
  try {
    // Too broad try catch  
    validatePayment(paymentData);
    chargeCard(paymentData);
    sendConfirmation(paymentData.email);
  } catch (error) {
    // Generic error message shown to user
    return {
      success: false,
      userMessage: "Oops! Something went wrong. Please try again.",
      error: error.message
    };
  }
}

function handleError(res, error) {
  // Exposing HTTP 500 to users
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message
  });
}
