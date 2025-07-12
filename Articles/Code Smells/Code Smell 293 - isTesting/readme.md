# Code Smell 293 - isTesting

![Code Smell 293 - isTesting](Code%20Smell%20293%20-%20isTesting.jpg)

*Don’t let test code sneak into production*

> TL;DR: Avoid adding *isTesting* or similar flags.

# Problems 😔

- Leaky abstraction
- Non-Business code pollution
- Fragile Code
- Inconsistent behavior
- Hidden dependencies
- Difficult debugging
- [Boolean flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)
- Untrusted tests
- [Production dependant code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20106%20-%20Production%20Dependent%20Code/readme.md)

# Solutions 😃

1. Remove [behavior Ifs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)
2. Use dependency injection
3. Model external services (Don't [mock](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md) them)
4. Separate configurations
5. Isolate test logic
6. Maintain clean behavior boundaries

# Refactorings ⚙️

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Context 💬

When you add flags like *isTesting*, you mix testing and production code. 

This creates hidden paths that are only active in tests. 

Also, you don't cover real production code.

You risk shipping testing behavior to production, leading to bugs and unpredictable behavior.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/55c3d81ffe4d3555663b24d02e10d433) -->

```rust
struct PaymentService {
    is_testing: bool,
}

impl PaymentService {
    fn process_payment(&self, amount: f64) {
        if self.is_testing {
            println!("Testing mode: Skipping real payment");
            return;
        }
        println!("Processing payment of ${}", amount);
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/697d23ac26444ce0f2935535bc07460e) -->

```rust
trait PaymentProcessor {
    fn process(&self, amount: f64);
}

struct RealPaymentProcessor;
impl PaymentProcessor for RealPaymentProcessor {
    fn process(&self, amount: f64) {
        println!("Processing payment of ${}", amount);
    }
}

struct TestingPaymentProcessor;
impl PaymentProcessor for TestingPaymentProcessor {
    // Notice this is not a mock
    fn process(&self, _: f64) {
        println!("No payment: Skipping real transaction");
    }
}

struct PaymentService<T: PaymentProcessor> {
    processor: T,
}

impl<T: PaymentProcessor> PaymentService<T> {
    fn process_payment(&self, amount: f64) {
        self.processor.process(amount);
    }
}
```

# Detection 🔍

[X] Semi-Automatic 

You can detect this smell by looking for conditional flags like *isTesting*, *environment == 'test'*, *DEBUG_MODE*, and idioms like these. 

These indicate that testing behavior is leaking into the production code.

# Tags 🏷️

- Testing

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

You need a clear separation between test and production code. 

When you mix them, you break the one-to-one [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between real-world behavior and the program. 

Since environments are real-world entities you need to explicitly model them in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).
 
# AI Generation 🤖

AI-generated code often introduces this smell when you use quick hacks for testing. 

Some tools suggest flags like *isTesting* because they prioritize ease over proper design.

# AI Detection 🥃

AI tools can catch this smell if you configure them to flag conditional logic based on testing states.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove IsTesting method and replace it by modeling the environments

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+IsTesting+method+and+replace+it+by+modeling+the+environments%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+IsTesting+method+and+replace+it+by+modeling+the+environments%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+IsTesting+method+and+replace+it+by+modeling+the+environments%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+IsTesting+method+and+replace+it+by+modeling+the+environments%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Remove+IsTesting+method+and+replace+it+by+modeling+the+environments%3A+%60%60%60rust%0D%0Astruct+PaymentService+%7B%0D%0A++++is_testing%3A+bool%2C%0D%0A%7D%0D%0A%0D%0Aimpl+PaymentService+%7B%0D%0A++++fn+process_payment%28%26self%2C+amount%3A+f64%29+%7B%0D%0A++++++++if+self.is_testing+%7B%0D%0A++++++++++++println%21%28%22Testing+mode%3A+Skipping+real+payment%22%29%3B%0D%0A++++++++++++return%3B%0D%0A++++++++%7D%0D%0A++++++++println%21%28%22Processing+payment+of+%24%7B%7D%22%2C+amount%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Avoid using *isTesting* flags. 

Use dependency injection and model the environments to keep test and production logic separate.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 106 - Production Dependent Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20106%20-%20Production%20Dependent%20Code/readme.md)

[Code Smell 62 - Flag Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 242 - Zombie Feature Flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20242%20-%20Zombie%20Feature%20Flags/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Christian Gertenbach](https://unsplash.com/@kc_gertenbach) on [Unsplash](https://unsplash.com/photos/child-holding-photo-of-lips-0qjPdSvIa-M)
        
* * *

> When you add testing flags, you undermine confidence in production.

_Ward Cunningham_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)