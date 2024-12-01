String response = paymentProcessor.authorize(cardDetails);

switch (response) {
    case "APPROVED":
        // Authorize purchase
        break;
    case "DECLINED_INSUFFICIENT_FUNDS":
        // Handle insufficient funds
        break;
    case "DECLINED_EXPIRED_CARD":
        // Handle expired card
        break;
    case "DECLINED_NEW_REASON":
        // Handle new declined reason
        break;
    default:
        // Reject purchase (default case for unknown responses)
        break;
}