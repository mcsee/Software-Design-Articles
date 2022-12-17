fun addToCart(item: Any) {
    if (cartExists()) {
        this.cart.addItem(Item);
    }
    else {      
        this.createCart();
        this.cart.addItem(Item);
    }
}   

fun addToCartShorter(item: Any) {
    if (!cartExists()) {
        this.createCart();
    }
    this.cart.addItem(Item);    
}