function processUserOrder(user, items) {
  if (!user) throw new Error("No user provided");
  if (!user.isActive()) throw new Error("Your account is inactive");
  if (items.length === 0) throw new Error("No items in cart");
  if (!user.hasEnoughCredit()) throw new Error("Insufficient credit");

  const order = createOrder(user, items);
  notifyUser(user,
    `Your order has been processed`);
  return order;
}

// This is even more readable

function assertValidOrder(user, items) {
  if (!user) throw new Error("No user provided");
  if (!user.isActive()) throw new Error("Your account is inactive");
  if (items.length === 0) throw new Error("No items in cart");
  if (!user.hasEnoughCredit()) throw new Error("Insufficient credit");
}

function processUserOrder(user, items) {
  assertValidOrder(user, items);
  const order = createOrder(user, items);
  notifyUser(user,
    `Your order has been processed`);
  return order;
}
