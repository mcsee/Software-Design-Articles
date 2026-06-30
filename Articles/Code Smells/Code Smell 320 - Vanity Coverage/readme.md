# Code Smell 320 - Vanity Coverage

![Code Smell 320 - Vanity Coverage](Code%20Smell%20320%20-%20Vanity%20Coverage.jpg)

*Brushing Over Real Problems*

> TL;DR: You write tests that touch every line but verify nothing, creating false confidence in a broken system.

# Problems 😔

- False confidence
- Hidden production [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)
- Misleading metrics
- Wasted test effort
- Untested edge cases

# Solutions 😃

1. Use mutation testing
2. Test real behaviors
3. Write assertive tests
4. Delete coverage-only tests

# Refactorings ⚙️

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# Context 💬

Many teams set a coverage threshold: 80%, 90%, or even 100%.

When you chase that number, you write tests that call methods without checking the actual results.

A test that calls `calculateTax()` but only asserts `result is not None` executes the line.

It doesn't verify the tax calculation is correct.

The dashboard turns green.

Defects survive in production.

This is vanity coverage: cosmetic metrics that hide real problems. Like brushes that make surfaces look smooth while the rot stays underneath.

Mutation testing reveals the truth.

When you mutate production code and no tests fail, your coverage numbers lied.

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/31fdb014536013a1ffd0a06a58bdafdf) -->

```javascript
describe('BankAccount', () => {
  test('deposit', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    // Only checking it didn't crash
    expect(account).toBeDefined();
  });

  test('withdraw', () => {
    const account = new BankAccount(100);
    const result = account.withdraw(30);
    // No assertion about the result!
  });

  test('transfer', () => {
    const source = new BankAccount(200);
    const target = new BankAccount(0);
    // Just calling the method to "cover" the line
    source.transfer(50, target);
  });
});
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/624fafede8686ed55de06972e031bf44) -->

```javascript
describe('BankAccount', () => {
  test('deposit increases balance', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.balance()).toBe(150);
  });

  test('withdraw decreases balance', () => {
    const account = new BankAccount(100);
    account.withdraw(30);
    expect(account.balance()).toBe(70);
  });

  test('withdraw raises on insufficient funds', () => {
    const account = new BankAccount(50);
    expect(() => account.withdraw(100))
      .toThrow(InsufficientFundsError);
  });

  test('transfer moves money between accounts', () => {
    const source = new BankAccount(200);
    const target = new BankAccount(0);
    source.transfer(50, target);
    expect(source.balance()).toBe(150);
    expect(target.balance()).toBe(50);
  });
});
```

# Detection 🔍

[X] Semi-Automatic

Run a mutation testing tool ([PIT](https://pitest.org/) for Java, [Stryker](https://stryker-mutator.io/) for JavaScript, [mutmut](https://github.com/boxed/mutmut) for Python).

Count the surviving mutants.

If coverage is high but mutants survive, you have vanity coverage.

You can also search for assertion-free tests, single `assertNotNull()` assertions, or tests that still pass after you delete the entire production method body.

# Exceptions 🛑

Smoke tests that call endpoints to verify the system starts are acceptable without detailed assertions.

These work when they complement a real test suite, not replace it.

# Tags 🏷️

- Testing

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

Your test suite must map each test to a real behavior in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

When a test covers a line without verifying observable behavior, you break that [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

Coverage tools only measure "lines executed."

Chase the number without [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) and your suite looks complete while missing real requirements entirely.

# AI Generation 🤖

AI code generators sometimes produce vanity coverage.

Ask one to "add tests to reach 80% coverage," and it writes tests that call methods and assert trivially true facts.

The metric goes up.

Nothing gets verified.

# AI Detection 🧲

AI can detect vanity coverage, but only if you ask the right questions.

Try: "Find tests with no real assertions" or "Find tests that pass when I delete the production method body."

Without those prompts, most AI tools see a green test and call it good.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace vanity coverage tests with tests that verify real behaviors and fail when production code is wrong

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+vanity+coverage+tests+with+tests+that+verify+real+behaviors+and+fail+when+production+code+is+wrong%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+vanity+coverage+tests+with+tests+that+verify+real+behaviors+and+fail+when+production+code+is+wrong%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+vanity+coverage+tests+with+tests+that+verify+real+behaviors+and+fail+when+production+code+is+wrong%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+vanity+coverage+tests+with+tests+that+verify+real+behaviors+and+fail+when+production+code+is+wrong%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+vanity+coverage+tests+with+tests+that+verify+real+behaviors+and+fail+when+production+code+is+wrong%3A+%60%60%60javascript%0D%0Adescribe%28%27BankAccount%27%2C+%28%29+%3D%3E+%7B%0D%0A++test%28%27deposit%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++account.deposit%2850%29%3B%0D%0A++++%2F%2F+Only+checking+it+didn%27t+crash%0D%0A++++expect%28account%29.toBeDefined%28%29%3B%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27withdraw%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+account+%3D+new+BankAccount%28100%29%3B%0D%0A++++const+result+%3D+account.withdraw%2830%29%3B%0D%0A++++%2F%2F+No+assertion+about+the+result%21%0D%0A++%7D%29%3B%0D%0A%0D%0A++test%28%27transfer%27%2C+%28%29+%3D%3E+%7B%0D%0A++++const+source+%3D+new+BankAccount%28200%29%3B%0D%0A++++const+target+%3D+new+BankAccount%280%29%3B%0D%0A++++%2F%2F+Just+calling+the+method+to+%22cover%22+the+line%0D%0A++++source.transfer%2850%2C+target%29%3B%0D%0A++%7D%29%3B%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Coverage is a signal, not a goal.

When you treat it as a goal, you create vanity coverage that hides real [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

Use mutation testing to discover what your suite actually verifies.

Write tests that describe real behaviors, not tests that execute lines.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 104 - Assert True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20104%20-%20Assert%20True/readme.md)

[Code Smell 76 - Generic Assertions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2076%20-%20Generic%20Assertions/readme.md)

[Code Smell 175 - Changes Without Coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20175%20-%20Changes%20Without%20Coverage/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 203 - Irrelevant Test Information](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20203%20-%20Irrelevant%20Test%20Information/readme.md)

# More Information 📕

[Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing)

[Test Coverage Is Not Enough](https://martinfowler.com/bliki/TestCoverage.html)

[Stryker Mutation Testing](https://stryker-mutator.io/)

# Quote

> The most dangerous kind of waste is the waste we don't recognize.

_Shigeo Shingo_

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Jamie Street](https://unsplash.com/es/@jamie452) on [Unsplash](https://unsplash.com/es/fotos/foto-macro-de-tres-brochas-de-maquillaje-marrones-JBQdeLezIxQ)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)
