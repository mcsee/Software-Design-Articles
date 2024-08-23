function processData(data) {
    if (!Array.isArray(data.items)) {
        throw new Error('Invalid data');
    }

    return data.items
        .filter(item => typeof item === 'object' && item !== null)
        .map(item => processItem(item));
}