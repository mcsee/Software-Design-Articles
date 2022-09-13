test("test10ComparisonIsCaseInsensitve", async function() {
    const firstWord = new Word('valid');
    const secondWord = new Word('VALID');
    expect(firstWord).toStrictEqual(secondWord); 
});