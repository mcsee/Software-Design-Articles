public class ShoppingCart {
  
    // This is Accidental
    private List<Item> items;

    // This is Also Accidental
    // And irrelevant to cart usage
    public ShoppingCart() {
        this.items = new ArrayList<>();
    }
 
    public void addItem(Item item) {
        items.add(item); 
    }
 
    public void removeItem(Item item) {
        // Error handling is irrelevant for the example
        items.remove(item);
    }
 
    public double calculateTotal() {
        double total = 0.0;
        for (Item item : items) {
            total += item.getPrice();
        }
        return total;
    }
}