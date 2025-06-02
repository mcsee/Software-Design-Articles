public class ShoppingCart {
    private final List<Item> items = new ArrayList<>();
  
    // This version uses Optionals
    // Not all programming languages support this feature
    private Optional<Coupon> coupon = Optional.empty();

    public void addItem(Item item) {
        items.add(item);
    }

    public void redeemCoupon(Coupon coupon) {
        // You need to understand how optionals work
        this.coupon = Optional.ofNullable(coupon);
    }
    
    public boolean hasUnsavedChanges() {
        return !items.isEmpty() || !coupon.isPresent();
    }

    public boolean hasCoupon() {
        return coupon.isPresent();
    }
}
