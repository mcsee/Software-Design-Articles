# Code Smell 274 - Cascaded Returns

![Code Smell 274 - Cascaded Returns](Code%20Smell%20274%20-%20Cascaded%20Returns.jpg)

*Stop the Return Roller-coaster*

> TL;DR: Prevent chaining return statements for better code readability and flow.

# Problems 😔 

- Confusing flow
- Debugging Difficulty
- Buried logic
- Low readability
- Risk of errors
- Overuse of IF Sentences

# Solutions 😃

1. Early return
2. Clear conditions
3. Use guard clauses
4. Replace IFs with [Polymorphism](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Refactorings ⚙️

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Context 💬

When you chain multiple return statements within a function, you create a confusing flow. 

This leads to spaghetti code where understanding the exit points becomes hard. 

Cascaded returns can hide important logic deep within the function, making it harder to follow and debug. 

You read through multiple branches to determine when and where the function ends.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/edb3a375c0b798f14447fe4c7230d2e8) -->

```javascript
function discount(price, isMember) {
  if (price < 20) {
    if (isMember) {
      return 5;
    } else {
      return 2;
    }
  } else {
    if (isMember) {
      return 10;
    } else {
      return 0;
    }
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b3b1ce40384367e300872e989faf6ead) -->

```javascript
class Member {
  discount(price) {
    return price < 20 ? 5 : 10;
    // This ternary is an essential IF
    // And you should NOT remove it
  }
}

class NonMember {
  discount(price) {
    return price < 20 ? 2 : 0;
    // This ternary is an essential IF
    // And you should NOT remove it
  }
}

function discount(price, status) {
  return status.discount(price);
}

const member = new Member();
const nonMember = new NonMember();
```

# Detection 🔍

[X] Automatic 

You can spot cascaded returns by looking for multiple nested return statements. 

If you see deep indentation or many layers of conditions, that's a sign of this code smell.
 
# Tags 🏷️

- IFs

# Level 🔋

[X ] Beginner

# AI Generation 🤖

AI generators might create this smell when tasked with solving complex problems quickly. 

Cascaded returns often happen when the generator handles multiple conditions without optimizing the flow.

# AI Detection 🥃

With clear instructions, AI tools can avoid cascaded returns. 

You can ask the AI to use guard clauses, polymorphism and simplify returns for a cleaner solution.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace the Cascaded IF sentences with Polymorphism

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+the+Cascaded+IF+sentences+with+Polymorphism%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+the+Cascaded+IF+sentences+with+Polymorphism%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+the+Cascaded+IF+sentences+with+Polymorphism%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+the+Cascaded+IF+sentences+with+Polymorphism%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+the+Cascaded+IF+sentences+with+Polymorphism%3A+%60%60%60javascript%0D%0Afunction+discount%28price%2C+isMember%29+%7B%0D%0A++if+%28price+%3C+20%29+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+5%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+2%3B%0D%0A++++%7D%0D%0A++%7D+else+%7B%0D%0A++++if+%28isMember%29+%7B%0D%0A++++++return+10%3B%0D%0A++++%7D+else+%7B%0D%0A++++++return+0%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Avoid cascaded returns to make your code more readable, maintainable, and easier to debug. 

Stick to early returns and guard clauses to prevent unnecessary complexity.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 78 - Callback Hell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

# More Information 📕

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Mike Lewis HeadSmart Media](https://unsplash.com/@mikeanywhere) on [Unsplash](https://unsplash.com/photos/waterfall-at-daytime-waAAaeC9hns)
    
* * *

> Even when a module is old and stable, bad code may be a time bomb and we might defuse it by isolating that code in its own library

_Adam Tornhill_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)