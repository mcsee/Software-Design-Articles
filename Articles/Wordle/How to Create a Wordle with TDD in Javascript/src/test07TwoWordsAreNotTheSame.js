test("test07TwoWordsAreNotTheSame", async function() {
    const firstWord = new Word('valid');
    const secondWord = new Word('happy');
    expect(firstWord).not.toStrictEqual(secondWord);
});

test("test08TwoWordsAreTheSame", async function() {
    const firstWord = new Word('valid');
    const secondWord = new Word('valid');
    expect(firstWord).toStrictEqual(secondWord);
});