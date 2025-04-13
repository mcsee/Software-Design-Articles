# Code Smell 296 - Unhappy to the Right

![Code Smell 296 - Unhappy to the Right](Code%20Smell%20296%20-%20Unhappy%20to%20the%20Right.jpg)

*Keep your happy path flowing, not nesting*

> TL;DR: Arrange your code so the main logic flows along the left margin, handling edge cases early with guard clauses.

# Problems 😔

* Cognitive overhead
* Readability
* Excessive [indentation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)
* Maintainability
* Control flow confusion
* [Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

# Solutions 😃

1. Use early returns
2. Apply guard clauses
3. Handle errors first
4. Keep the main flow to the left
5. Minimize nesting depth

# Context 💬

When you write code with deeply nested conditional structures, you create "[arrow code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)" or "pyramid of doom."

This makes your program's primary flow hard to follow as it zigzags deeper into indentation levels.

Your main logic (the "happy path") gets buried under layers of [conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20184%20-%20Exception%20Arrow%20Code/readme.md), making the code harder to read, understand, and maintain.

This becomes even more problematic when dealing with internationalization and localization.

Nested conditionals often create fragmented contexts for strings, making accurate translations difficult because translators lose the surrounding context needed for proper translation.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/787e440619c8eb79915c985b562fbf64) -->

```javascript
function processUserOrder(user, items) {
  if (user) {
    if (user.isActive()) {
      if (items.length > 0) {
        if (user.hasEnoughCredit()) {
          // The actual business logic is buried 4 levels deep
          let order = createOrder(user, items);
          notifyUser(user, 
            `Your order has been processed`);
          return order;
        } else {
          throw new Error("Insufficient credit");
        }
      } else {
        throw new Error("No items in cart");
      }
    } else {
      throw new Error("Your account is inactive");
    }
  } else {
    throw new Error("No user provided");
  }
}
``` 

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4385d0a20fb323f3019d9aa00977c61a) -->

```javascript
function processUserOrder(user, items) {
  if (!user) throw new Error("No user provided");
  if (!user.isActive()) throw new Error("Your account is inactive");
  if (items.length === 0) throw new Error("No items in cart");
  if (!user.hasEnoughCredit()) throw new Error("Insufficient credit");

  const order = createOrder(user, items);
  notifyUser(user,
    `Your order has been processed`);
  return order;
}

// This is even more readable

function assertValidOrder(user, items) {
  if (!user) throw new Error("No user provided");
  if (!user.isActive()) throw new Error("Your account is inactive");
  if (items.length === 0) throw new Error("No items in cart");
  if (!user.hasEnoughCredit()) throw new Error("Insufficient credit");
}

function processUserOrder(user, items) {
  assertValidOrder(user, items);
  const order = createOrder(user, items);
  notifyUser(user,
    `Your order has been processed`);
  return order;
}
``` 

# Detection 🔍

[X] Semi-Automatic

You can detect this smell by looking for multiple indentation levels (more than 2 or 3).

You can also analyse ASTs with advanced linters.

# Tags 🏷️

- IFs

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

When you write code with deep nesting, you break the clean [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the logical flow of your business rules and their representation in code.

The real-world business process likely follows a series of validations followed by a main action, but deeply nested code obscures this natural sequence.

This one-to-one correspondence breaks down because the primary operation (what the function is supposed to do) gets buried deep in indentation layers

The logical sequence of validations isn't separated from the main action.

By keeping your happy path to the left, you create a natural bijection between the actual process flow and the code structure, making it easier to reason about and modify in the future.

# AI Generation 🤖

AI code generators often create nested conditional structures, especially when generating code from prompts that don't explicitly request early returns or guard clauses.

Many AI systems mimic common patterns they observe in training data, where deeply nested conditions are unfortunately prevalent.

# AI Detection 🥃

Most AI code assistants can identify and fix this code smell with proper instructions.

If you ask an AI to refactor code to "use early returns" or "apply guard clauses" or "keep the happy path to the left," it can typically transform nested conditionals into flatter structures.

You can also prompt the AI to "reduce nesting in this function" or "refactor this code to avoid deep indentation," and set it as a meta-prompt following your style preferences.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove the deep nesting

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+the+deep+nesting%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+the+deep+nesting%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+the+deep+nesting%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+the+deep+nesting%3A+%60%60%60javascript%0D%0Afunction+processUserOrder%28user%2C+items%29+%7B%0D%0A++if+%28user%29+%7B%0D%0A++++if+%28user.isActive%28%29%29+%7B%0D%0A++++++if+%28items.length+%3E+0%29+%7B%0D%0A++++++++if+%28user.hasEnoughCredit%28%29%29+%7B%0D%0A++++++++++%2F%2F+The+actual+business+logic+is+buried+4+levels+deep%0D%0A++++++++++let+order+%3D+createOrder%28user%2C+items%29%3B%0D%0A++++++++++notifyUser%28user%2C+%0D%0A++++++++++++%60Your+order+has+been+processed%60%29%3B%0D%0A++++++++++return+order%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++throw+new+Error%28%22Insufficient+credit%22%29%3B%0D%0A++++++++%7D%0D%0A++++++%7D+else+%7B%0D%0A++++++++throw+new+Error%28%22No+items+in+cart%22%29%3B%0D%0A++++++%7D%0D%0A++++%7D+else+%7B%0D%0A++++++throw+new+Error%28%22Your+account+is+inactive%22%29%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++throw+new+Error%28%22No+user+provided%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Keep your happy path to the left by using early returns and guard clauses, you will create more readable, maintainable code.

You communicate business logic more clearly, reduce cognitive load for other developers (including your future self), and create more resilient code to change.

Remember to handle the special cases early, and let your main logic flow naturally along the left margin.
Your colleagues (and future you) will thank you.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md) 

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

[Code Smell 294 - Implicit Return](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20294%20-%20Implicit%20Return/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 184 - Exception Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20184%20-%20Exception%20Arrow%20Code/readme.md)

[Code Smell 164 - Mixed Indentations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 184 - Exception Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20184%20-%20Exception%20Arrow%20Code/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Alexander Hipp](https://unsplash.com/@alexanderhipp) on [Unsplash](https://unsplash.com/photos/time-lapse-photo-of-waterfalls-5tIuYKRRHj8)

---

> A function should follow the "arrow shape" of reading naturally from top to bottom, not wander into deeper nesting like a poorly designed maze.

Venkat Subramaniam

__

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md) 

---

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)