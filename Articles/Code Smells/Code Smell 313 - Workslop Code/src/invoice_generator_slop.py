def generate_invoice(data):
    if 'discount' in data:
        total = data['amount'] - (data['amount'] * data['discount'])
    else:
        total = data['amount']
    if data['tax']:
        total += total * data['tax']
    return {'invoice': total, 'message': 'success'}
