def find_minimum_price(products):
    min_price = None
    
    for product in products:
        if min_price is None:
            min_price = product.price
        elif product.price < min_price:
            min_price = product.price
    
    return min_price

def find_minimum_in_list(numbers):
    if not numbers:
        return None
    
    minimum = None
    for number in numbers:
        if minimum is None or number < minimum:
            minimum = number
    
    return minimum

# Usage leads to more None checks
prices = [10.5, 8.2, 15.0, 7.8]
min_price = find_minimum_in_list(prices)
if min_price is not None:
    print(f"Minimum price: ${min_price}")
else:
    print("No prices found")