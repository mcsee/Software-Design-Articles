def find_minimum_price(products):
    min_price = float('inf')
        
    for product in products:
        if product.price < min_price:
            # This is an essential IF, you should not remove it
            min_price = product.price
            # No accidental IF here (if min_price is None:)
    
    return min_price if min_price != float('inf') else None

def find_minimum_in_list(numbers):
    minimum = float('inf')
    
    for number in numbers:
        if number < minimum:
            minimum = number
    
    return minimum if minimum != float('inf') else None

# Cleaner usage - polymorphic behavior
prices = [10.5, 8.2, 15.0, 7.8]
min_price = find_minimum_in_list(prices)
print(f"Minimum price: ${min_price}")