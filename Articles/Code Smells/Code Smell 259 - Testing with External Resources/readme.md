# Code Smell 259 - Testing with External Resources

![Code Smell 259 - Testing with External Resources](Code%20Smell%20259%20-%20Testing%20with%20External%20Resources.jpg)

*Don't rely on things that can change without you noticing them*

> TL;DR: Tests must be in full control.

# Problems 😔 

- Unreliable tests

- Difficult debugging

- Unexpected changes

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) to External dependencies

- [Mistery Guests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20254%20-%20Mystery%20Guest/readme.md)

- [Flaky](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md) tests

- Slowness

# Solutions 😃

1. Generate the file in the test

2. [Mock](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md) it

3. Use hardcoded streams instead

# Context 💬

Using an existing file for testing breaks the golden rule: tests must fully control their environment. 

When someone changes the file, the test becomes [erratic and unreliable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md).

That can result in an annoying debugging experience and non-deterministic test runs.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1b6f129a641e984ad18433c485270b21) -->

```javascript
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
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/50b5d79df54bf0c4239fb301b966a612) -->

```javascript
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
```

# Detection 🔍

[X] Automatic 

You can detect this smell by identifying tests that rely on external files instead of generating or mocking the data. 

Look for file path references and check if they are necessary.

# Tags 🏷️

- Testing

# Level 🔋

[X] Intermediate

# AI Generation 🤖

AI generators might create this smell if they aren't given clear instructions to generate or mock test data instead of using external files.

# AI Detection 🥃

GPT tools detect this smell if you guide them to check the code for external file dependencies.

# Conclusion 🏁

 
Never use existing files and keep your tests runnable to a known state.

You need to generate your test data either by the test or mock it out completely so that tests are in full control.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 254 - Mystery Guest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20254%20-%20Mystery%20Guest/readme.md)

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

[Code Smell 204 - Tests Depending on Dates](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20204%20-%20Tests%20Depending%20on%20Dates/readme.md)

# More Information 📕

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [William Warby](https://unsplash.com/@wwarby) on [Unsplash](https://unsplash.com/photos/a-couple-of-legos-standing-next-to-a-hard-drive-_zIq5WCzfHE)
  
* * *

> Code without tests is broken by design.

_Jacob Kaplan-Moss_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
