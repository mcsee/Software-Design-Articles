<?php

class Invoice {
    // 1. Identify all public uses of sequential IDs
    // in APIs, URLs, or UI elements   
   
    private string $customerName;
    private array $items;

    public function __construct(
      string $customerName, array $items) {
        $this->customerName = $customerName;
        $this->items = $items;
    }
}

// 2. Generate UUIDs
// for each record during data migration or creation    
// 3. Replace exposed sequential IDs 
// with UUIDs in external-facing interfaces    

// 4. Map UUIDs internally to the original IDs 
// using a private lookup table or service    
$uuid = generate_uuid();

// 5. Ensure UUIDs are used 
// consistently across services and databases
$invoices[$uuid] =new Invoice(
    customerName: 'Roger Penrose',
    items: [
        new InvoiceItem(description: 'Laptop', price: 1200),
        new InvoiceItem(description: 'Black Hole', price: 50)
    ]
);

// Step 4: Keep the map internal
// Step 5: Share only UUID with the client