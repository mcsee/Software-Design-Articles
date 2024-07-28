const fs = require('fs');
const { jest } = require('@jest/globals');

function trimFile(data) {
    return data.trim();
}

function generateTestData() {
    return ' John Wick ';
}

test('test process file generated', () => {
    const data = generateTestData();
    expect(trimFile(data)).toBe('John Wick');
});

test('test process file mocked', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(' mocked data ');
    const data = fs.readFileSync('file.txt', 'utf8');
    expect(trimFile(data)).toBe('John Wick');
    fs.readFileSync.mockRestore();
});
