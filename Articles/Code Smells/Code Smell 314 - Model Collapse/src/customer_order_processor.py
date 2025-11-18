class CustomerOrder:
    def __init__(self, customer, items, status):
        self._customer = customer
        self._items = items
        self._status = status
    
    def is_active(self):
        return self._status.is_active()
    
    def calculate_total(self):
        return self._customer.apply_pricing_tier(
            sum(item.price() for item in self._items)
        )
    
    def mark_as_processed(self):
        return ProcessedOrder(self, self.calculate_total())

class OrderProcessor:
    def process_active_orders(self, orders):
        return [
            order.mark_as_processed() 
            for order in orders 
            if order.is_active()
        ]