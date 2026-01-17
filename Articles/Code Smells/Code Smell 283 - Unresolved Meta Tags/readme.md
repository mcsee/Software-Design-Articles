# Code Smell 283 - Unresolved Meta Tags

![Code Smell 283 - Unresolved Meta Tags](Code%20Smell%20283%20-%20Unresolved%20Meta%20Tags.jpg)

*Incomplete Meta Tags are Unprofessional*

> TL;DR: Incomplete or null meta tags break functionality and user experience.

# Problems 😔 

- Tags appear in output
- Email texts include placeholders between human-readable text
- Missed placeholders confuse users
- Websites are rendered with strange characters
- [Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) values trigger errors
- Potential [security injection vulnerabilities](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

# Solutions 😃

1. Validate meta tags
2. Assert completeness early
3. [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)
4. Avoid [null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md) values
5. Throw meaningful exceptions
6. Automate meta validation
 
# Context 💬

When you leave meta tags unfinished, such as `{user_name}` or `{product_name}`, they often sneak into your final output. Imagine sending an email that says, "Hi {user_name}, your order for {product_name} is ready." 

It screams unprofessionalism and confuses users.

[Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md) values worsen things by causing crashes or silent failures, leading to bad user experiences or broken processes.

You can avoid this by asserting completeness before rendering or sending. 

When your code finds an incomplete meta tag or a null value, stop the process immediately and throw an exception.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/16a1523ba5df7b731ff3a0798df3c528) -->

```php
<?php

$emailBody = "Hello {user_name}, 
your order for {product_name} is confirmed.";

// You forget to make the replacements
sendEmail($emailBody);
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e71c0e334096a552ff886446b11b1a51) -->

```php
<?php

$emailBody = "Hello {user_name},
your order for {product_name} is confirmed.";

if (strpos($emailBody, '{') !== false) {
    throw new Exception(
        "Incomplete meta tags found in email body.");
}
sendEmail($emailBody);
```

# Detection 🔍

[X] Automatic 

You can detect this smell with automated tests or linters scanning unfinished placeholders ({} or similar patterns). 

# Tags 🏷️

- Fail-Fast

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

Your system must maintain a one-to-one mapping when representing user data with placeholders. 

You break this mapping if your {user_name} placeholder exists but lacks a corresponding real name. 

This causes errors, confusion, and a loss of trust in your application. 

Ensuring [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) compliance avoids these issues.

# AI Generation 🤖

AI tools sometimes introduce this smell when generating templates with placeholders but fail to substitute real data. 

You must validate and complete all placeholders before using the output.

# AI Detection 🥃

AI tools like linters or email rendering validators can detect unfinished meta tags if you configure them correctly. 

Use these tools to automate meta-tag detection and reduce human error.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace the metatags and warn if they are left over

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+the+metatags+and+warn+if+they+are+left+over%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+the+metatags+and+warn+if+they+are+left+over%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+the+metatags+and+warn+if+they+are+left+over%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+the+metatags+and+warn+if+they+are+left+over%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+the+metatags+and+warn+if+they+are+left+over%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24emailBody+%3D+%22Hello+%7Buser_name%7D%2C+%0D%0Ayour+order+for+%7Bproduct_name%7D+is+confirmed.%22%3B%0D%0A%0D%0A%2F%2F+You+forget+to+make+the+replacements%0D%0AsendEmail%28%24emailBody%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Incomplete meta tags are more than just sloppy they're harmful. Validate tags, assert completeness, and throw exceptions when needed. 

Handling meta tags carefully prevents errors and ensures a professional experience.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 139 - Business Code in the User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface/readme.md)

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

# More Information 📕

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Tomas Martinez](https://unsplash.com/@tomasmartinez) on [Unsplash](https://unsplash.com/photos/black-and-white-checkered-textile-axYekjy6Kn4)
        
* * *

> The best error message is the one that never shows up.

_Thomas Fuchs_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)