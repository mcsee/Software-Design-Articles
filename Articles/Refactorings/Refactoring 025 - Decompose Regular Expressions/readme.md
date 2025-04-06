# Refactoring 025 - Decompose Regular Expressions

![Refactoring 025 - Decompose Regular Expressions](Refactoring%20025%20-%20Decompose%20Regular%20Expressions.jpg)

*Make Regular Expressions Testable and Understandable*

> TL;DR: You can break down a complex validation regex into smaller parts to test each part individually and report accurate errors.

# Problems Addressed 😔

- Hard-to-test [regular expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)
- Unclear error reporting
- Debugging nightmares
- Maintenance challenges
- Too [long lines and methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)
- Unmaintainable expressions
- [Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)
- Error isolation
- Knowledge silos
- [Obsolete comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)
- [Errors without empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md) to end users

# Related Code Smells 💨

[Code Smell 276 - Untested Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20276%20-%20Untested%20Regular%20Expressions/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

# Steps 👣

1. Analyze the regex to identify its logical components.
2. Break the regex into smaller, named sub-patterns for each component.
3. Write [unit tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20276%20-%20Untested%20Regular%20Expressions/readme.md) for each sub-pattern to ensure it works correctly.
4. Combine the tested sub-patterns into the full validation logic.
5. Refactor the code to provide clear error messages for every failing part.

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/ac66dca1e2a7e69be53b518800cdbb25) -->

```javascript
function validateURL(url) {
  const urlRegex =
    /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/;
  // Criptic and untesteable
  return urlRegex.test(url);
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9f4d9abcbb59e785a0f8a3ad235c7a3a) -->

```javascript
// Step 1: Define individual regex components
const protocolPattern = /^(https?:\/\/)/; 
const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
const pathPattern = /^\/.*$/;

// Step 2: Write unit tests for each component
describe("Protocol Validation", () => {
  test("should pass for http://", () => {
    expect(protocolPattern.test("http://")).toBe(true);
  });

  test("should pass for https://", () => {
    expect(protocolPattern.test("https://")).toBe(true);
  });

  test("should fail for invalid protocols", () => {
    expect(protocolPattern.test("ftp://")).toBe(false);
  });
});

describe("Domain Validation", () => {
  test("should pass for valid domains", () => {
    expect(domainPattern.test("example.com")).toBe(true);
    expect(domainPattern.test("sub.domain.org")).toBe(true);
  });

  test("should fail for invalid domains", () => {
    expect(domainPattern.test("example")).toBe(false);
    expect(domainPattern.test("domain..com")).toBe(false);
  });
});

describe("Path Validation", () => {
  test("should pass for valid paths", () => {
    expect(pathPattern.test("/path/to/resource")).toBe(true);
    expect(pathPattern.test("/")).toBe(true);
  });

  test("should fail for invalid paths", () => {
    expect(pathPattern.test("path/to/resource")).toBe(false);
    expect(pathPattern.test("")).toBe(false);
  });
});

// Step 3: Validate each part and report errors
function validateURL(url) {
  if (!protocolPattern.test(url)) {
    throw new Error("Invalid protocol. Use http:// or https://.");
  }

  const domainStartIndex = url.indexOf("://") + 3;
  const domainEndIndex = url.indexOf("/", domainStartIndex);
  const domain = domainEndIndex === -1 ? 
        url.slice(domainStartIndex) :
        url.slice(domainStartIndex, domainEndIndex);

  if (!domainPattern.test(domain)) {
    throw new Error("Invalid domain name.");
  }

  const path = url.slice(domainEndIndex);
  if (path && !pathPattern.test(path)) {
    throw new Error("Invalid path.");
  }

  return true;
}

// Step 4: Add integration tests for the full URL validation
describe("Full URL Validation", () => {
  test("should pass for valid URLs", () => {
    expect(validateURL("https://lesluthiers.com/tour/")).toBe(true);
    expect(validateURL("https://bio.lesluthiers.org/")).toBe(true);
  });

  test("should fail for invalid URLs", () => {
    expect(() => validateURL("ftp://mastropiero.com")).
      toThrow("Invalid protocol");
    expect(() => validateURL("http://estherpsicore..com")).
      toThrow("Invalid domain name");
    expect(() => validateURL("http://book.warren-sanchez")).
      toThrow("Invalid path");
  });
});
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe if you follow the steps carefully.

Testing each component ensures that you catch errors early.

# Why is the Code Better? ✨

The refactored code is better because it improves readability, maintainability, and testability.

Breaking down the regex into smaller parts makes understanding what each part does easier.

You can also report specific errors when validation fails, which helps users fix their input.

This is also a great opportunity to apply the [Test-Driven Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md) technique, gradually increasing complexity by introducing new subparts.

# How Does it Improve the Bijection? 🗺️

By breaking down the regex into smaller, meaningful components, you create a closer mapping between the [Real-World](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  requirements (e.g., "URL must have a valid protocol") and the code.

This reduces ambiguity and ensures the code reflects the problem domain accurately.

# Limitations ⚠️

This approach might add some overhead for very simple regex patterns where breaking them down would be unnecessary.

# Refactor with AI 🤖

You can use AI tools to help identify regex components.

Ask the AI to explain what each part of the regex does, then guide you in breaking it into smaller, testable pieces. For example, you can ask, "What does this regex do?" and follow up with, "How can I split it into smaller parts?".

It's 2025, No programmer should write new [Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md) anymore.

You should leave this mechanical task to AI.

> Suggested Prompt: 1. Analyze the regex to identify its logical components.2. Break the regex into smaller, named sub-patterns for each component.3. Write unit tests for each sub-pattern to ensure it works correctly.4. Combine the tested sub-patterns into the full validation logic.5. Refactor the code to provide clear error messages for every failing part.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Analyze+the+regex+to+identify+its+logical+components.2.+Break+the+regex+into+smaller%2C+named+sub-patterns+for+each+component.3.+Write+unit+tests+for+each+sub-pattern+to+ensure+it+works+correctly.4.+Combine+the+tested+sub-patterns+into+the+full+validation+logic.5.+Refactor+the+code+to+provide+clear+error+messages+for+every+failing+part.%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Analyze+the+regex+to+identify+its+logical+components.2.+Break+the+regex+into+smaller%2C+named+sub-patterns+for+each+component.3.+Write+unit+tests+for+each+sub-pattern+to+ensure+it+works+correctly.4.+Combine+the+tested+sub-patterns+into+the+full+validation+logic.5.+Refactor+the+code+to+provide+clear+error+messages+for+every+failing+part.%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Analyze+the+regex+to+identify+its+logical+components.2.+Break+the+regex+into+smaller%2C+named+sub-patterns+for+each+component.3.+Write+unit+tests+for+each+sub-pattern+to+ensure+it+works+correctly.4.+Combine+the+tested+sub-patterns+into+the+full+validation+logic.5.+Refactor+the+code+to+provide+clear+error+messages+for+every+failing+part.%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Analyze+the+regex+to+identify+its+logical+components.2.+Break+the+regex+into+smaller%2C+named+sub-patterns+for+each+component.3.+Write+unit+tests+for+each+sub-pattern+to+ensure+it+works+correctly.4.+Combine+the+tested+sub-patterns+into+the+full+validation+logic.5.+Refactor+the+code+to+provide+clear+error+messages+for+every+failing+part.%3A+%60%60%60javascript%0D%0Afunction+validateURL%28url%29+%7B%0D%0A++const+urlRegex+%3D%0D%0A++++%2F%5E%28https%3F%3A%5C%2F%5C%2F%29%28%5Ba-zA-Z0-9.-%5D%2B%5C.%5Ba-zA-Z%5D%7B2%2C%7D%29%28%5C%2F.%2A%29%3F%24%2F%3B%0D%0A++%2F%2F+Criptic+and+untesteable%0D%0A++return+urlRegex.test%28url%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Tags 🏷️

- Testability

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# See also 📚

[The Great Programmer Purge: How AI Is Taking Over the Tech Workforce](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/86%20-%20The%20Great%20Programmer%20Purge%20How%20AI%20Is%20Taking%20Over%20the%20Tech%20Workforce/readme.md)

[Regex 101](https://regex101.com/)

[How to Squeeze Test Driven Development on Legacy Systems](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md)

# Credits 🙏

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/) on [Pixabay](https://pixabay.com//)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)