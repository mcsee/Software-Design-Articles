public class ShoppingCart {
  private List<Item> items = new ArrayList<>();
    
  // 1. Identify nullable optional attributes
  // that could be collections
  // 2. Replace single nullable objects with empty collections
  private List<Coupon> coupons = new ArrayList<>();
    
  public void addItem(Item item) {
      this.items.add(item);
  }
    
  // 4. Update methods to work with collections
  // instead of single nullable object
  public void redeemCoupon(Coupon coupon) {    
      // 5. If you need to keep the old behavior,
      // assert no more than element is added
      if (!this.coupons.isEmpty()) {
        throw new IllegalStateException(
          "Only one coupon can be added to the cart");
      }
      this.coupons.add(coupon);
  }
    
  // Simplified logic without null checks
  public double total() {
    double total = 0;
      
    for (Item item : this.items) {
        total += item.price();
    }
      
    // 3. Remove all null checks 
    // related to these optional attributes        
    for (Coupon coupon : this.coupons) {
        total -= coupon.discount();
    }
      
    return total;
  }
    
  // Consistent behavior with empty collections
  public boolean hasUnsavedChanges() {
    // 4. Update methods to work with collections
    // instead of single objects 
    return !this.items.isEmpty() || !this.coupons.isEmpty();
  }
    
  // 3. Remove all null checks 
  // related to these optional attributes
  // Collection-based check instead of null check
  public boolean hasCoupon() {
    return !this.coupons.isEmpty();
  }
}