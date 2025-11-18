# Refactoring 035 - Separate Exception Types

![Refactoring 035 - Separate Exception Types](Refactoring%20035%20-%20Separate%20Exception%20Types.jpg)

*Distinguish your technical failures from business rules*

> TL;DR: Use separate exception hierarchies for business and technical errors.

# Problems Addressed 😔

- Confused contracts
- Mixed responsibilities and error treatment
- Difficult handling
- Poor readability
- Misleading signals
- Exceptions for [expected cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)
- Nested [Exceptions](https://maximilianocontieri.shcom/code-smell-80-nested-trycatch)
- Mixed exception hierarchies
- Improper error responses
- Tangled architectural concerns
- Mixed alarms

# Related Code Smells 💨

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

[Code Smell 80 - Nested Try/Catch](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2080%20-%20Nested%20Try%20Catch/readme.md)

[Code Smell 184 - Exception Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20184%20-%20Exception%20Arrow%20Code/readme.md)

[Code Smell 132 - Exception Try Too Broad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20132%20-%20Exception%20Try%20Too%20Broad/readme.md)

# Steps 👣

1. Identify business exceptions
2. Identify technical exceptions
3. Create two separate exception hierarchies
4. Update the code to throw the right one
5. Adjust handlers accordingly

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/cc4bb614c78c7da080657ca91dff7cb4) -->

```csharp
public void Withdraw(int amount) {
  if (amount > Balance) {
    throw new Exception("Insufficient funds");
    // You might want to show this error to end users
  }
  if (connection == null) {
    throw new Exception("Database not available");
    // Internal error, log and notify operators. 
    // Fail with a more generic error
  }
  Balance -= amount;
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/62941027cb9ec2015d1ec76871c989c4) -->

```csharp
// 1. Identify business exceptions
public class BusinessException : Exception {}
public class InsufficientFunds : BusinessException {}

// 2. Identify technical exceptions
public class TechnicalException : Exception {}
public class DatabaseUnavailable : TechnicalException {}

public void Withdraw(int amount) {
  // 3. Use the correct hierarchy
  if (amount > Balance) {
    throw new InsufficientFunds();
  }
  if (connection == null) {
    throw new DatabaseUnavailable();
  }

  // 4. Apply safe logic
  Balance -= amount;
}

// 5. Adjust handlers in the calling code
```

# Type 📝

[X] Manual

# Safety 🛡️

This refactoring is safe if you apply it gradually and update your code with care.

You must ensure all thrown exceptions are caught at the proper architectural level.

# Why is the Code Better? ✨

You make the code clearer and more predictable.

You express technical failures and business rules separately, taking corrective actions with different stakeholders.

You also reduce confusion for the caller and improve maintainability.

# How Does it Improve the Bijection? 🗺️

This refactoring strengthens the mapping between [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) concepts and code representation.

In reality, business rule violations and technical failures are fundamentally different situations.

Business exceptions represent *[expected](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)* alternative flows in your domain model.

Technical exceptions represent unexpected system problems that break the execution environment.

By separating these concerns, your code more accurately reflects the real-world distinction between "business says no" and "system cannot proceed".

# Limitations ⚠️

You need discipline to maintain two hierarchies.

If you misuse them, the benefits are lost. You also need to communicate the contract clearly to the clients of your code.

You should also create your own integrity tests to enforce these rules.

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify business exceptions 2. Identify technical exceptions 3. Create two separate hierarchies  4. Update code to throw the right one 5. Adjust handlers accordingly 

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+business+exceptions+2.+Identify+technical+exceptions+3.+Create+two+separate+hierarchies++4.+Update+code+to+throw+the+right+one+5.+Adjust+handlers+accordingly+%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+business+exceptions+2.+Identify+technical+exceptions+3.+Create+two+separate+hierarchies++4.+Update+code+to+throw+the+right+one+5.+Adjust+handlers+accordingly+%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+business+exceptions+2.+Identify+technical+exceptions+3.+Create+two+separate+hierarchies++4.+Update+code+to+throw+the+right+one+5.+Adjust+handlers+accordingly+%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+business+exceptions+2.+Identify+technical+exceptions+3.+Create+two+separate+hierarchies++4.+Update+code+to+throw+the+right+one+5.+Adjust+handlers+accordingly+%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+business+exceptions+2.+Identify+technical+exceptions+3.+Create+two+separate+hierarchies++4.+Update+code+to+throw+the+right+one+5.+Adjust+handlers+accordingly+%3A+%60%60%60csharp%0D%0Apublic+void+Withdraw%28int+amount%29+%7B%0D%0A++if+%28amount+%3E+Balance%29+%7B%0D%0A++++throw+new+Exception%28%22Insufficient+funds%22%29%3B%0D%0A++++%2F%2F+You+might+want+to+show+this+error+to+end+users%0D%0A++%7D%0D%0A++if+%28connection+%3D%3D+null%29+%7B%0D%0A++++throw+new+Exception%28%22Database+not+available%22%29%3B%0D%0A++++%2F%2F+Internal+error%2C+log+and+notify+operators.+%0D%0A++++%2F%2F+Fail+with+a+more+generic+error%0D%0A++%7D%0D%0A++Balance+-%3D+amount%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Exceptions

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 004 - Remove Unhandled Exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions/readme.md)

# Credits 🙏

Image by [Ottó](https://pixabay.com/users/konyvesotto-13230314/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)