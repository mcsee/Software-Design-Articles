# Code Smell 270 - Boolean APIs

![Code Smell 270 - Boolean APIs](Code%20Smell%20270%20-%20Boolean%20APIs.jpg)

*Avoid booleans, always*

> TL;DR: Replace boolean security flags in APIs with separate, more secure endpoints.

# Problems

- Overly simplistic security model
- Lack of granular control
- Potential for misuse
- Reduced traceability
- Difficult maintenance

# Solutions

1. Create separate endpoints
2. Implement granular permissions
3. Enhance logging capabilities
4. Deal with [code duplication](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Refactorings

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Context

Many APIs (like [WhatsApp](https://medium.com/@TalBeerySec/once-and-forever-whatsapps-view-once-functionality-is-broken-302a508390b0)) use boolean flags to toggle security features.

An API might have a secure parameter that enables additional security checks when set to *true*. 

While this approach seems simple, it introduces several problems. 

You sacrifice granular control, make the API more prone to misuse, and reduce your ability to track and audit security-related actions.

Instead of relying on [boolean flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md), you should create separate endpoints for different security levels. 

This is a special case of the [Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md) Refactoring.

This approach allows for more precise control, better traceability, and easier maintenance.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/6b2796c76d53e679606a484ed6317056) -->

```json
{
  "message": {
    "imageMessage": {
      "url": "https://mmg.whatsapp.net/v/art_vanderley.jpg",
      "mimetype": "image/jpeg",
      "fileSha256": "mJh9DKj34ao9Ph7cBm/CwKurgjbyMTFHJeo=",
      "fileLength": 24601,
      "height": 2048,
      "width": 1536
    },
    "viewOnce": true
  },
  "type": "notify"
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/3a8b97427a1dc2300b737bbdf4d62a47) -->

```python
# Instead of a single endpoint with a boolean flag:
def send_message(content, view_once = False):
    # Process message based on view_once flag
    pass

# Create separate endpoints:
def send_regular_message(content):
    # Process regular message
    pass

def send_view_once_message(content):
    # Process view once message with enhanced security
    pass
```

# Detection

[X] Semi-Automatic 

We can instruct our linters to warn us for boolean flags.

# Exceptions

- Real Business Booleans (There are just a few ones)

# Tags

- Security

# Level

[X] Intermediate

# AI Generation

AI code generators might create this smell if instructed to add security options to existing APIs. 

They often chose the simplest solution, leading to boolean flags for security features.

# AI Detection

AI-powered code analysis tools can detect this smell with specific instructions.

You can train them to flag APIs that use boolean parameters for security-related functionality and suggest creating separate endpoints instead.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove the boolean attributes replacing it with different endpoints

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+the+boolean+attributes+replacing+it+with+different+endpoints%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+the+boolean+attributes+replacing+it+with+different+endpoints%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+the+boolean+attributes+replacing+it+with+different+endpoints%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+the+boolean+attributes+replacing+it+with+different+endpoints%3A+%60%60%60json%0D%0A%7B%0D%0A++%22message%22%3A+%7B%0D%0A++++%22imageMessage%22%3A+%7B%0D%0A++++++%22url%22%3A+%22https%3A%2F%2Fmmg.whatsapp.net%2Fv%2Fart_vanderley.jpg%22%2C%0D%0A++++++%22mimetype%22%3A+%22image%2Fjpeg%22%2C%0D%0A++++++%22fileSha256%22%3A+%22mJh9DKj34ao9Ph7cBm%2FCwKurgjbyMTFHJeo%3D%22%2C%0D%0A++++++%22fileLength%22%3A+24601%2C%0D%0A++++++%22height%22%3A+2048%2C%0D%0A++++++%22width%22%3A+1536%0D%0A++++%7D%2C%0D%0A++++%22viewOnce%22%3A+true%0D%0A++%7D%2C%0D%0A++%22type%22%3A+%22notify%22%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Conclusion

Creating distinct endpoints for different security levels improves your API's clarity, security, and maintainability. 

This approach allows for better access control and more detailed logging

It also reduces the risk of accidentally processing sensitive data without proper security measures. Remember, when it comes to security, explicit is better than implicit.

# Relations

[Code Smell 62 - Flag Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

[Code Smell 07 - Boolean Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2007%20-%20Boolean%20Variables/readme.md)

# More Info

[WhatsApp ViewOnce Security Defect](https://medium.com/@TalBeerySec/once-and-forever-whatsapps-view-once-functionality-is-broken-302a508390b0)

[Boolean Flags](https://martinfowler.com/articles/feature-toggles.html)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Juan Gomez](https://unsplash.com/@nosoylasonia) on [Unsplash](https://unsplash.com/photos/dandelion-flower-nv7nR9jwNGw)
    
* * *

> Complexity is the worst enemy of security, and our systems are getting more complex all the time.

_Bruce Schneier_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)