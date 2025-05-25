# Code Smell 164 - Mixed Indentations
            
![Code Smell 164 - Mixed Indentations](Code%20Smell%20164%20-%20Mixed%20Indentations.png)

*Tabs vs Spaces. The most significant computer problem*

> TL;DR: Don't mix indentation styles

# Problems 😔 

- Readability

- Code consistency

- Standards violation

# Solutions 😃

1. Choose one of them

2. Stick to it

3. Enforce it with code standards tests

4. Share the rules on all the codebase

5. Use an IDE like VSCode or WebStorm that doesn't include tabs at all.

# Context 💬

Whenever I publish an article many people don't care about the sample intent and rush to point at indentation mistakes.

Choosing one standard over the other will be a great solution.

Spaces always count as one.

Tabs can count as many different options.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/17de024e249327b44a614f30e4961d94) -->

```javascript
function add(x, y) {
// --->..return x + y;

      return x + y;
}

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/49bfb99979315a69bfe809afb0ae2158) -->

```javascript
function add(x, y) {
// --->return x + y;
    return x + y;
}
```

# Detection 🔍

[X] Automatic 

Any parser can enforce this rule.

# Exceptions 🛑

Some languages like Python consider indent as part of the syntax.

In these languages, indentation is not accidental since it changes code semantics.

# Tags 🏷️

- Code Standards

# Conclusion 🏁

There's been so much debate on this subject.

The smell is related to mixing them, not about using one instead of another.

Some IDEs automatically convert one convention to the other one.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Information 📕

- [ES Lint](https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

![indentation joke](indentation%20joke.jpg)

> Whatever the device you use for getting your information out, it should be the same information.

_Tim Berners-Lee_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)