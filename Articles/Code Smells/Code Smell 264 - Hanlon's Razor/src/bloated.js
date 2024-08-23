function processData(data) {
    if (typeof data === 'undefined') {
        throw new Error('Data is undefined');
    }

    if (typeof data !== 'object') {
        throw new Error('Data is not an object');
    }

    if (data === null) {
        throw new Error('Data is null');
    }

    if (Array.isArray(data)) {
        throw new Error('Data should not be an array');
    }

    if (!data.hasOwnProperty('items')) {
        return [];
    }

    if (!Array.isArray(data.items)) {
        throw new Error('Items should be an array');
    }

    if (data.items.length === 0) {
        return []; 
    }

    let processedItems = [];
    for (let item of data.items) {
        if (typeof item === 'undefined') {
            continue; // Skip undefined items
        }

        if (typeof item !== 'object') {
            continue; // Skip non-object items
        }

        if (item === null) {
            continue; // Skip null items
        }

        processedItems.push(processItem(item));
    }

    return processedItems;
}
