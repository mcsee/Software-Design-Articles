def calculate_total(amount, discount, tax):
    subtotal = amount - (amount * discount)
    total = subtotal + (subtotal * tax)
    return total

def create_invoice(amount, discount, tax):
    total = calculate_total(amount, discount, tax)
    return {'total': total, 'currency': 'USD'}
