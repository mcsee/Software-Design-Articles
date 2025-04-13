function processUserOrder(user, items) {
  if (user) {
    if (user.isActive()) {
      if (items.length > 0) {
        if (user.hasEnoughCredit()) {
          // The actual business logic is buried 4 levels deep
          let order = createOrder(user, items);
          notifyUser(user, 
            `Your order has been processed`);
          return order;
        } else {
          throw new Error("Insufficient credit");
        }
      } else {
        throw new Error("No items in cart");
      }
    } else {
      throw new Error("Your account is inactive");
    }
  } else {
    throw new Error("No user provided");
  }
}