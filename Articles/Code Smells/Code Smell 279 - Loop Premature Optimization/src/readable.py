# Clearer and easier to understand
result = []
for item in items:
    if item.is_valid():
        result.append(item.process())
