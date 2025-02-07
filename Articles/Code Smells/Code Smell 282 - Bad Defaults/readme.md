# Code Smell 282 - Bad Defaults

![Code Smell 282 - Bad Defaults](Code%20Smell%20282%20-%20Bad%20Defaults.jpg)

*Defaults Can Sink You*

> TL;DR: Treat unknown responses as unauthorized, not as valid.

# Problems

- Security risks
- Ignoring unknown cases
- Error Misinterpretation
- Defaulting to valid states
- Mismatch Authorizations
- Failing to log events
- Exploitation Potential

# Solutions

1. Validate all responses against a closed  set of known codes.
2. Default (and unknown) to unauthorized or [Remove Defaults](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md).
3. Log every mismatched or unexpected case for analysis.
4. Test with edge scenarios
5. Synchronize response pools with processors regularly to avoid outdated codes.
6. Focus on security making it a shift left process.
7. Design systems with change resilience to handle evolving scenarios.

# Context

Today is [computer security day](https://www.nationaldaycalendar.com/national-day/computer-security-day-november-30) and every programmer needs to acknowledge its responsibility. 

Imagine an application handling sales that relies on response pools from credit card processors to handle transactions. 

Each credit card processor provides predefined response codes for various situations, such as insufficient balance or expired cards.

The issue begins when a processor adds a new response code for denied transactions but doesn't notify the platform. 

The application doesn't recognize the new code, defaults to treating it as "not found," and authorizes the purchase. 

Users notice this flaw and exploit it to make unauthorized purchases. 

The platform's revenue plummets, leading to bankruptcy.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/a71157328cdafbfe6c0639fe6c64b361) -->

```java
String response = paymentProcessor.authorize(cardDetails);

switch (response) {
    case "DECLINED_INSUFFICIENT_FUNDS":
        // Handle insufficient funds
        break;
    case "DECLINED_EXPIRED_CARD":
        // Handle expired card
        break;
    default:
        // Authorize purchase
        break;
}
``` 

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/fc8724bf7b47ece2dad8a3ac2c44a85f) -->

```java
String response = paymentProcessor.authorize(cardDetails);

switch (response) {
    case "APPROVED":
        // Authorize purchase
        break;
    case "DECLINED_INSUFFICIENT_FUNDS":
        // Handle insufficient funds
        break;
    case "DECLINED_EXPIRED_CARD":
        // Handle expired card
        break;
    case "DECLINED_NEW_REASON":
        // Handle new declined reason
        break;
    default:
        // Reject purchase (default case for unknown responses)
        break;
}
``` 

# Detection

[X] Manual

You can detect this smell by reviewing error-handling logic. 

Check if the system logs and denies unrecognized cases. 

Automated tests can help identify if new or unexpected inputs default to valid actions.

Static analysis tools can help by flagging potentially incomplete error handling.

# Tags

- Security

# Level

[X] Intermediate 

# Why the Bijection Is Important

It's critical to maintain a one-to-one correspondence between your application's internal representation of payment processor responses and the actual codes returned by the processor. 

When you break the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), you create a mismatch. 

The application interprets unknown codes incorrectly, leading to unexpected behavior, security holes, and potentially disastrous business consequences.

# AI Generation

AI tools can create this smell if you don't specify how to handle unknown cases. 

For example, generic error handling might default to benign outcomes like "not found" or "success."

# AI Detection

AI generators can fix this smell when you instruct them to treat unknown cases as unauthorized and emphasize logging and testing unexpected scenarios.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=Remove+the+default+throwing+errors+on+unexpected+cases%3A+%60%60%60java%0D%0AString+response+%3D+paymentProcessor.authorize%28cardDetails%29%3B%0D%0A%0D%0Aswitch+%28response%29+%7B%0D%0A++++case+%22DECLINED_INSUFFICIENT_FUNDS%22%3A%0D%0A++++++++%2F%2F+Handle+insufficient+funds%0D%0A++++++++break%3B%0D%0A++++case+%22DECLINED_EXPIRED_CARD%22%3A%0D%0A++++++++%2F%2F+Handle+expired+card%0D%0A++++++++break%3B%0D%0A++++default%3A%0D%0A++++++++%2F%2F+Authorize+purchase%0D%0A++++++++break%3B%0D%0A%7D%0D%0A%60%60%60) | 

# Conclusion

Always handle unknown cases cautiously. 

Defaults like "not found" can lead to severe security issues and financial losses. 

Make logging and denying unknown responses part of your development practices.

Make shift-left decisions related to security while programming.

# Relations

[Code Smell 110 - Switches With Defaults](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Nathana Rebouças ](https://unsplash.com/@nathanareboucas) on [Unsplash](https://unsplash.com/photos/a-person-holding-a-credit-card-and-a-cell-phone-aGkR0b7hgI8)      

[Incident description (in Spanish)](https://www.youtube.com/watch?v=J2QOejhA6ek)

---

> Assumptions are the mother of all failures.

_Said Ouissal_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md) 

---

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)