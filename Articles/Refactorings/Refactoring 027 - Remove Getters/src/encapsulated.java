public class Invoice {
    private List<LineItem> items;
    private Customer customer;
    private LocalDate dueDate;
    
    public Invoice(Customer customer, LocalDate dueDate) {
        this.customer = customer;
        this.dueDate = dueDate;
        this.items = new ArrayList<>();
    }
    
    public void addItem(LineItem item) {
        items.add(item);
    }
    
    // Step 3: Move behavior that uses the getter into the object
    public double calculateTotal() {
        // Step 4: Create intention-revealing methods
        double total = 0;
        for (LineItem item : items) {
            total += item.price() * item.quantity();
        }
        return total;
    }
    
    public boolean isOverdue(date) {
        // Step 4: Create intention-revealing methods
        // Notice you inject the time control source
        // Removing the getter and breaking the coupling
        return date.isAfter(dueDate);
    }
    
    public String customerInformation() {
        // Step 4: Create intention-revealing methods
        // You no longer print with side effects 
        // And coupling to a global console
        return "Customer: " + customer.name();        
    }
    
    // For collections, return an unmodifiable view if needed
    // Only expose internal collaborators if the name 
    // is an actual behavior
    public List<LineItem> items() {
        return Collections.unmodifiableList(items);
    }
    
    // Only if required by frameworks 
    // or telling the customer is an actual responsibility
    // The caller should not assume the Invoice is actually
    // holding it
    public String customerName() {
        return customer.name();
    }
    
    // You might not need to return the dueDate
    // Challenge yourself if you essentially need to expose it
    // public LocalDate dueDate() {
    //     return dueDate;
    // }
}

// Client code (Step 5: Update client code)
Invoice invoice = new Invoice(customer, dueDate);
double total = invoice.calculateTotal();
boolean isOverdue = invoice.isOverdue(date);
System.out.println(invoice.customerInformation());