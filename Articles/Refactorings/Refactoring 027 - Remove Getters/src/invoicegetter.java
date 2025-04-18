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
        // This is the right way 
        // to manipulate the internal consistency
        // adding assertions and access control if necessary
        items.add(item);
    }
    
    public List<LineItem> getItems() {
        // You are exposing your internal implementation
        // In some languages, you also open a backdoor to
        // manipulate your own collection unless you return
        // a copy
        return items;
    }
    
    public Customer getCustomer() {
        // You expose your accidental implementation
        return customer;
    }
    
    public LocalDate getDueDate() {
        // You expose your accidental implementation
        return dueDate;
    }
}
 
Invoice invoice = new Invoice(customer, dueDate);
// Calculate the total violating encapsulation principle
double total = 0;
for (LineItem item : invoice.getItems()) {
    total += item.getPrice() * item.getQuantity();
}

// Check if the invoice is overdue
boolean isOverdue = LocalDate.now().isAfter(invoice.getDueDate());

// Print the customer information
System.out.println("Customer: " + invoice.getCustomer().getName());