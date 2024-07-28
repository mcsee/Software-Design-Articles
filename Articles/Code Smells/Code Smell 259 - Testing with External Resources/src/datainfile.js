const fs = require('fs');

function trimFile(data) {
    return data.trim();
}

// existing_file.txt holds the sample information
// "     John Wick    "

test('test process file', () => {
    const data = fs.readFileSync('existing_file.txt', 'utf8');
    expect(trimFile(data)).toBe('John Wick');
});
