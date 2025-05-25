# Code Smell 277 - UPPERCASE Acronyms

![Code Smell 277 - UPPERCASE Acronyms](Code%20Smell%20277%20-%20UPPERCASE%20Acronyms.jpg)

*Avoid Jumbled Acronyms for Clarity*

> TL;DR: Treat acronyms like normal words to improve human readability.

# Problems 😔 

- Reduced readability
- Breaking naming style
- Words confusion
- Harder to pronounce 

# Solutions 😃

1. Treat acronyms as *Capitalized* words
2. Use *[camelCase](https://en.wikipedia.org/wiki/Camel_case)* or *[snake_case](https://en.wikipedia.org/wiki/Snake_case)*
 
# Context 💬

Acronyms in uppercase (like *JSON, XML, REST*) in [camel case](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md) break the natural reading flow.

You may think *sendJSONRequestOnHTTPREST* is a clear name, but it makes your code harder to read, especially when you string multiple acronyms together. 

Treating acronyms like normal words in camelCase (*sendJsonRequest*) keeps your code more readable and easier to understand.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/3fb92baefac7fb65577e03e196472f67) -->

```swift
class NetworkConnector {
    func validateXMLFile() { /*...*/ }
    func sendJSONRequest() { /*...*/ }
    func parseURLResponse() { /*...*/ }
    func setRESTAPIURL() { /*...*/ }
    func retrieveHTTPStatusCode() { /*...*/ }
    func updateDBConnection() { /*...*/ }
    func configureSSLCertificate() { /*...*/ }
    func setHTMLTemplate() { /*...*/ }
    func generateUUID() { /*...*/ }
    func connectViaFTP() { /*...*/ }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/280cb3e2dd681b0039b9604aac32330a) -->

```swift
class NetworkConnector {
    func validateXmlFile() { /*...*/ }
    func sendJsonRequest() { /*...*/ }
    func parseUrlResponse() { /*...*/ }
    func setRestApiUrl() { /*...*/ }
    func retrieveHttpStatusCode() { /*...*/ }
    func updateDbConnection() { /*...*/ }
    func configureSslCertificate() { /*...*/ }
    func setHtmlTemplate() { /*...*/ }
    func generateUuid() { /*...*/ }
    func connectViaFtp() { /*...*/ }
}
```

# Detection 🔍

[X] Semi-Automatic 

It would help if you had a smart thesaurus.

To detect this smell, look for methods or variable names with uppercase acronyms that disrupt readability. 

Code reviewers or linters can also flag camelCase inconsistencies.

# Tags 🏷️

- Code Standards

# Level 🔋

[X] Beginner 

# AI Generation 🤖

Modern AI code generators may produce inconsistent acronym casing. 

Always review and adjust their output to match your conventions.

# AI Detection 🥃

With prompts, AI can fix these naming issues and suggest improvements based on *[camelCase](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md)* style.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Correct the case to CamelCase

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Correct+the+case+to+CamelCase%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Correct+the+case+to+CamelCase%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Correct+the+case+to+CamelCase%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+the+case+to+CamelCase%3A+%60%60%60swift%0D%0Aclass+NetworkConnector+%7B%0D%0A++++func+validateXMLFile%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+sendJSONRequest%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+parseURLResponse%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setRESTAPIURL%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+retrieveHTTPStatusCode%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+updateDBConnection%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+configureSSLCertificate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+setHTMLTemplate%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+generateUUID%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A++++func+connectViaFTP%28%29+%7B+%2F%2A...%2A%2F+%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Naming conventions are key to readable code. 

Treat acronyms like normal words, and avoid uppercase blocks to keep your code easy to understand.

# Relations 👩‍❤️‍💋‍👨

[CoDe SmElL 159 - mIxEd_cASe](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Information 📕

[Original Post](https://www.linkedin.com/posts/danielmoka_clean-code-tip-name-acronyms-as-normal-words-activity-7251472396438687744-C4kx/)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Csabi Elter](https://unsplash.com/@bulgakovmihaly) on [Unsplash](https://unsplash.com/photos/assorted-color-chip-piled-IIDxzNru2GY)

Thank you @Daniel Moka for this tip.
    
* * *

> Simple can be harder than complex

_Steve Jobs_
  
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)