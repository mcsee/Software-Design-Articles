public class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    private Coupon coupon = null;
    
    public void addItem(Item item) {
        this.items.add(item);
    }
    
    public void redeemCoupon(Coupon coupon) {
        this.coupon = coupon;
    }
    
    public double total() {
        double total = 0;
        
        for (Item item : this.items) {
            total += item.getPrice();
        }
        
        // This a polluted IF and null check
        if (this.coupon != null) {
            total -= this.coupon.getDiscount();
        }
        
        return total;
    }
    
    public boolean hasUnsavedChanges() {
        // Explicit null check
        return !this.items.isEmpty() || this.coupon != null;
    }
    
    public boolean hasCoupon() {        
        return this.coupon != null;
    }
}