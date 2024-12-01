String response = paymentProcessor.authorize(cardDetails);

switch (response) {
    case "DECLINED_INSUFFICIENT_FUNDS":
        // Handle insufficient funds
        break;
    case "DECLINED_EXPIRED_CARD":
        // Handle expired card
        break;
    default:
        // Authorize purchase
        break;
}