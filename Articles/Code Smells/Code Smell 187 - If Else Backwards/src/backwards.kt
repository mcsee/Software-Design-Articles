fun addToCart(item: Any) {
    if (!cartExists()) {
        // Condition is negated
        this.createCart();
        this.cart.addItem(Item);
        // Repeated Code
    }
    else {
        // Normal case is on the else clause
        this.cart.addItem(Item);
    }
}
