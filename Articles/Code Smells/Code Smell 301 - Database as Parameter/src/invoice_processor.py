class InvoiceProcessor:
    def process_invoice(self, invoice_data, database):
        # Business logic mixed with database access
        customer = database.execute(
            "SELECT * FROM customers WHERE id = ?", 
            invoice_data['customer_id']
        ).fetchone()
        
        if customer['credit_limit'] < invoice_data['amount']:
            raise Exception("Credit limit exceeded")
        
        # More business logic
        tax = invoice_data['amount'] * 0.21
        total = invoice_data['amount'] + tax
        
        # Direct database manipulation
        database.execute(
            "INSERT INTO invoices (customer_id, amount, tax, total) "
            "VALUES (?, ?, ?, ?)",
            (invoice_data['customer_id'], invoice_data['amount'], 
             tax, total)
        )
        
        database.commit()
        return total