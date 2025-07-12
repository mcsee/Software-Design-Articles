# Code Smell 297 - Syntactic Noise

![Code Smell 297 - Syntactic Noise](Code%20Smell%20297%20-%20Syntactic%20Noise.jpg)

*Your code shouldn't look like alien hieroglyphics*

> TL;DR: Too many cryptic symbols make your code hard to understand and maintain.

# Problems 😔

- Readability
- Cognitive overload
- Maintenance nightmares
- Debugging challenges
- Learning curve
- [Unwrapped lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20236%20-%20Unwrapped%20Lines/readme.md)
- Hidden defects
- [Anonymous Functions Abuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

# Solutions 😃

1. Avoid language clever hacks
2. Prefer meaningful variable names
3. Extract complex expressions
4. Use language features wisely
5. Limit expression complexity

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Context 💬

[Syntactic noise](https://en.wikipedia.org/wiki/Syntactic_nois) refers to code constructs that don't directly map to real-world concepts.

While symbols like '[](){}' are valid syntax in many programming languages, excessive use creates code that looks like abstract art rather than a solution to a problem.

When you pack too many operators, brackets, and special characters into a single expression, you force readers to mentally parse complex syntax before understanding what the code does.

This disconnect between symbols and real-world meaning makes your code harder to understand, debug, and maintain.

Think of your code as a form of communication with other developers (and your future self).

Just as excessive punctuation!!! makes text!!?!? hard to read!!!

Excessive syntactic noise creates similar barriers in code.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/fc3d83aa6cf837463b5dae2137aa5881) -->

```cpp
[](){}

/* This valid lambda function:

Captures no variables.
Takes no arguments.
Performs no actions.

[]: This is the capture clause. 
It specifies which variables from the surrounding scope
are accessible inside the lambda function. 
An empty capture clause [] means the lambda
*does not capture* any variables from the surrounding scope.

(): This is the parameter list. 
It defines the arguments the lambda function accepts. 
An empty () means the lambda takes *no parameters*.

{}: This is the function body. 
It contains the code that the lambda executes when called. 
An empty {} means the lambda has no operations 
to perform—it does nothing.

*/
```

<!-- [Gist Url](https://gist.github.com/mcsee/990c4f8dcb4bce65f6b2d2000233ff70) -->

```javascript
const result = arr.filter(x => x !== null && x !== undefined)
  .map((y) => ({ val: y.value, meta: 
    y.meta ? y.meta : {default: true}}))
  .reduce((acc, {val, meta}) => 
    meta.default ? acc : [...acc, 
      {processed: val * 2, origin: meta}], [])
  .some(({processed}) => processed > 10 && processed < 50);
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2928b4ea3bd26eb6e8cdd079440e0437) -->

```javascript
function isNotNull(x) {
  return x !== null && x !== undefined
  // Another code smell here
}

function mapToValueAndMeta(y) {
  const meta = y.meta ? y.meta : { default: true }
  return { val: y.value, meta }
}

function reduceToProcessedList(acc, { val, meta }) {
  if (meta.default) {
    return acc
  }
  return [...acc, { processed: val * 2, origin: meta }]
}

function isProcessedInRange({ processed }) {
  return processed > 10 && processed < 50
}

// This is more declarative but far from 
// Domian business and too generic
const filtered = arr.filter(isNotNull)
const mapped = filtered.map(mapToValueAndMeta)
const processedList = mapped.reduce(reduceToProcessedList, [])
const result = processedList.some(isProcessedInRange)
```

# Detection 🔍

[X] Semi-Automatic

You can detect syntactic noise by looking for lines with multiple nesting levels of brackets, parentheses, or braces, chained operations that stretch across numerous lines, and expressions that make you pause to count opening and closing symbols.

Code that requires horizontal scrolling due to symbol density is another red flag, multiple ternary operators in a single expression, and nested [arrow functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md) with [implicit returns](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20294%20-%20Implicit%20Return/readme.md).

Modern IDEs and linters can help identify overly complex expressions.

ESLint rules like complexity and max-depth flag code with too many nested constructs.

The "cognitive complexity" metric in SonarQube also helps identify hard-to-understand code.

# Exceptions 🛑

- Code Optimized by Machines

# Tags 🏷️

- Complexity

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

Code should map one-to-one with the real-world concepts it represents.

Each variable, function, and expression should correspond to something tangible in your problem domain.

When you clutter code with excessive syntax that doesn't represent real-world entities, you create a disconnect between the problem and solution.

Remember that code is written once but read many times.

By maintaining a clear [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between code constructs and [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) concepts, you create software that stays maintainable throughout its lifecycle.

# AI Generation 🤖

AI code generators sometimes create syntactic noise.

When you ask for code with minimal prompt guidance, AI tools frequently optimize for brevity over readability, packing multiple operations into dense one-liners.

This approach produces "clever" but hard-to-maintain code with chained methods, nested ternaries, and complex expressions.

Modern AI generators like GPT models can also create exceptionally dense code when asked to solve problems in minimal lines, inadvertently producing syntactically noisy solutions.

They may not recognize when code crosses the readability threshold without specific instructions to prioritize clarity over conciseness.

Please don't prompt this.

# AI Detection 🥃

AI tools can help detect and fix syntactic noise with appropriate prompting.

If you use instructions like "refactor for readability" or "simplify this expression," you will get cleaner code.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove the syntactic noise and make it more declarative

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+the+syntactic+noise+and+make+it+more+declarative%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+the+syntactic+noise+and+make+it+more+declarative%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+the+syntactic+noise+and+make+it+more+declarative%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+the+syntactic+noise+and+make+it+more+declarative%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Remove+the+syntactic+noise+and+make+it+more+declarative%3A+%60%60%60javascript%0D%0Aconst+result+%3D+arr.filter%28x+%3D%3E+x+%21%3D%3D+null+%26%26+x+%21%3D%3D+undefined%29%0D%0A++.map%28%28y%29+%3D%3E+%28%7B+val%3A+y.value%2C+meta%3A+%0D%0A++++y.meta+%3F+y.meta+%3A+%7Bdefault%3A+true%7D%7D%29%29%0D%0A++.reduce%28%28acc%2C+%7Bval%2C+meta%7D%29+%3D%3E+%0D%0A++++meta.default+%3F+acc+%3A+%5B...acc%2C+%0D%0A++++++%7Bprocessed%3A+val+%2A+2%2C+origin%3A+meta%7D%5D%2C+%5B%5D%29%0D%0A++.some%28%28%7Bprocessed%7D%29+%3D%3E+processed+%3E+10+%26%26+processed+%3C+50%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Syntactic noise is like static interference in communication—technically valid, but gets in the way of understanding.

When you prioritize clear code over clever one-liners, you create software that's easier to understand, debug, and maintain.

Next time you're tempted to pack multiple operations into a dense expression, remember that you're not just writing for the computer—you're writing for people.

Break complex operations into named steps that reflect real-world concepts, and your code will tell a story that everyone can follow.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 294 - Implicit Return](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20294%20-%20Implicit%20Return/readme.md)

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

[Code Smell 162 - Too Many Parentheses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20162%20-%20Too%20Many%20Parentheses/readme.md)

[Code Smell 201 - Nested Ternaries](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20201%20-%20Nested%20Ternaries/readme.md)

[Code Smell 236 - Unwrapped Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20236%20-%20Unwrapped%20Lines/readme.md)

# More Information 📕

[Martin Fowler's blog](https://martinfowler.com/bliki/SyntacticNoise.html)

[Wikipedia](https://en.wikipedia.org/wiki/Syntactic_noise)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Elyas Pasban](https://unsplash.com/@elyaspasban) on [Unsplash](https://unsplash.com/photos/woman-in-blue-and-black-striped-long-sleeve-shirt-uAm_c9heHxo)

* * *

> The function of good software is to make the complex appear simple

_Graciano Cruz_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)