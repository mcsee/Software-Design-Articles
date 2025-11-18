def process_data(d, t='standard'):
    """Process customer data"""
    if t == 'standard':
        result = []
        for item in d:
            if item.get('status') == 'active':
                temp = item.copy()
                temp['processed'] = True
                total = 0
                for x in temp.get('items', []):
                    total += x.get('price', 0)
                temp['total'] = total
                result.append(temp)
        return result
    elif t == 'premium':
        result = []
        for item in d:
            if item.get('status') == 'active' and \
               item.get('tier') == 'premium':
                temp = item.copy()
                temp['processed'] = True
                total = 0
                for x in temp.get('items', []):
                    total += x.get('price', 0) * 0.9
                temp['total'] = total
                result.append(temp)
        return result
    return []