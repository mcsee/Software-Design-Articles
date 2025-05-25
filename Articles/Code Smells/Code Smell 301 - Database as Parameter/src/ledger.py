class InvoiceProcessor:
    def __init__(self, billing_ledger):
        self.billing_ledger = billing_ledger
    
    def process_invoice(self, customer, amount):
        # Pure business logic with proper domain objects
        if customer.credit_limit < amount:
            raise CreditLimitExceededException()
        
        # Business calculations
        tax = amount * 0.21
        total = amount + tax
        
        # Create the domain object
        # No repositories are involved
        invoice = Invoice(
            customer=customer,
            amount=amount,
            tax=tax,
            total=total
        )
        
        self.billing_ledger.record(invoice)
        return total