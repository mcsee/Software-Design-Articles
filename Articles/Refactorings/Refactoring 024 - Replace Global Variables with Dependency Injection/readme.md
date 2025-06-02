# Refactoring 024 - Replace Global Variables with Dependency Injection

![Refactoring 024 - Replace Global Variables with Dependency Injection](Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection.jpg)

*Break Hidden Dependencies for Cleaner Code*

> TL;DR: Replace global variables with dependency injection to improve testability and reduce coupling. 💉

# Problems Addressed 😔

- Hidden Dependencies
- Tight [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Testing Challenges
- Maintainability
- [Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md)

# Related Code Smells 💨

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)
 
[Code Smell 106 - Production Dependent Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20106%20-%20Production%20Dependent%20Code/readme.md)

# Steps 🛠️

1. Identify global variables used across your codebase.
2. Create a real-world abstraction to encapsulate these variables.
3. Pass dependencies explicitly via function parameters or constructors.
4. Refactor existing code to use the new dependency-injected structure.
5. Remove the original global variable declarations.

# Sample Code 💻 

## Before ❌

<!-- [Gist Url](https://gist.github.com/mcsee/3ced2217865cf3d02f8e5cf07231cf16) -->

```javascript
// This global variable holds the API configuration  
const globalConfig = { apiUrl: "https://api.severance.com" };  

function fetchOuties() {  
  return fetch(`${globalConfig.apiUrl}/outies`);  
  // globalConfig is NOT passed as parameter
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/aba0e09a24d4aa35caeae0c06326cfe6) -->

```javascript
function fetchOuties(parameterConfig) {  
  return fetch(`${parameterConfig.apiUrl}/outies`);  
  // 1. Identify global variables
  // used across your codebase.
  // 4. Refactor the existing code 
  // to use the new dependency-injected structure. 
}  

const applicationConfig = { apiUrl: "https://api.severance.com" };  
// 2. Create a real-world abstraction
// to encapsulate these variables.

fetchOuties(applicationConfig); 
// 3. Pass dependencies explicitly 
// via function parameters or constructors.

//  const globalConfig = { apiUrl: "https://api.severance.com" };  
// 5. Remove the original 
// global variable declarations.

// Why Is 'config' a Dependency?
// Because:
// outies() depends on knowing the API URL to work
// Without this information, 
// The function can't perform its core task
// The dependency is 
// explicitly declared in the function signature
```

A Step Beyond: API Reification

<!-- [Gist Url](https://gist.github.com/mcsee/0bc9f68a147cdc9374fb5edc6d42d542) -->

```javascript
class ApiService {
  constructor(parameterConfig) {
    this.variableConfig = parameterConfig;
  }
  
  // parameterConfig, variableConfig
  // and applicationConfig
  // are very bad names. 
  // They are here to emphasize the change

  fetchOuties() {
    return fetch(`${this.variableConfig.apiUrl}/outies`);
  }
}

const apiService = 
  new ApiService({ apiUrl: "https://api.severance.com" });
apiService.fetchOuties();
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe if you audit all global variable references and thoroughly test the code after injection.

# Why is the Code Better? 🌱

Testability: Dependencies can be replaced (not [mocked](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)) for unit tests.

Explicit Contracts: Functions declare what they need.

Scalability: Configuration changes don’t require code edits.

Coupling: Code is less coupled.

# How Does it Improve the Bijection? 🗺️

By making dependencies explicit, the code mirrors [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) interactions where components rely on declared inputs, not hidden state.
 
You also reduce [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) which is usually the more important problem you must solve.

# Limitations ⚠️

Over-injection can lead to [parameter bloat](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md).
	   
# Common Misconceptions

"But it's just a parameter!"
- Exactly! Passing dependencies via parameters is [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection). Frameworks often obscure this basic principle.

"This is too simple to be DI!"
- Dependency Injection doesn't require complex frameworks. This is a pure, framework-less injection.

"Dependency Injection vs Dependency Inversion"
- [Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle) is the principle (why). It tells you to depend on abstractions to reduce coupling.
- Injection is the practice (how). It’s one way (there are many others) to apply the principle by passing dependencies from outside instead of creating them inside a class.

# Refactor with AI 🤖 

You can use AI tools to analyze your codebase and identify global variables. 

The AI can suggest where to implement dependency injection and help generate the necessary interfaces or classes for your dependencies.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: 1. Identify global variables used across your codebase.2. Create a real-world abstraction to encapsulate these variables. 3. Pass dependencies explicitly via function parameters or constructors. 4. Refactor existing code to use the new dependency-injected structure. 5. Remove the original global variable declarations.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+global+variables+used+across+your+codebase.2.+Create+a+real-world+abstraction+to+encapsulate+these+variables.+3.+Pass+dependencies+explicitly+via+function+parameters+or+constructors.+4.+Refactor+existing+code+to+use+the+new+dependency-injected+structure.+5.+Remove+the+original+global+variable+declarations.%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+global+variables+used+across+your+codebase.2.+Create+a+real-world+abstraction+to+encapsulate+these+variables.+3.+Pass+dependencies+explicitly+via+function+parameters+or+constructors.+4.+Refactor+existing+code+to+use+the+new+dependency-injected+structure.+5.+Remove+the+original+global+variable+declarations.%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+global+variables+used+across+your+codebase.2.+Create+a+real-world+abstraction+to+encapsulate+these+variables.+3.+Pass+dependencies+explicitly+via+function+parameters+or+constructors.+4.+Refactor+existing+code+to+use+the+new+dependency-injected+structure.+5.+Remove+the+original+global+variable+declarations.%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+global+variables+used+across+your+codebase.2.+Create+a+real-world+abstraction+to+encapsulate+these+variables.+3.+Pass+dependencies+explicitly+via+function+parameters+or+constructors.+4.+Refactor+existing+code+to+use+the+new+dependency-injected+structure.+5.+Remove+the+original+global+variable+declarations.%3A+%60%60%60javascript%0D%0A%2F%2F+This+global+variable+holds+the+API+configuration++%0D%0Aconst+globalConfig+%3D+%7B+apiUrl%3A+%22https%3A%2F%2Fapi.severance.com%22+%7D%3B++%0D%0A%0D%0Afunction+fetchOuties%28%29+%7B++%0D%0A++return+fetch%28%60%24%7BglobalConfig.apiUrl%7D%2Fouties%60%29%3B++%0D%0A++%2F%2F+globalConfig+is+NOT+passed+as+parameter%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Dependency Injection

# Level 🔋

[X] Intermediate

# Related Refactorings 👩‍❤️‍💋‍�

[Refactoring 018 - Replace Singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20018%20-%20Replace%20Singleton/readme.md)
 
[Refactoring Guru](https://refactoring.guru/es/introduce-parameter-object)

# See also 🔍

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Singleton - The Root of All Evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md)

[Wikipedia: Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)

[Wikipedia: Dependency Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

# Credits 🙏

Image by [Petra](https://pixabay.com/users/pezibear-526143/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)