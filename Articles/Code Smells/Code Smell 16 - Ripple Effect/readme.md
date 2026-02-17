# Code Smell 16 - Ripple Effect

![Code Smell 16 - Ripple Effect](Code%20Smell%2016%20-%20Ripple%20Effect.jpg)

*Small changes yield unexpected problems.*

> TL;DR: If small changes have big impact, you need to decouple your system.

# Problems 😔 

- High [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Low maintainability

- Side effects

- High risk

- Testing difficulty

# Solutions 😃

1. Decouple your components.
2. Cover with tests.
3. Refactor and isolate what is changing.
4. Depend on interfaces.

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Refactorings ⚙️

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

# Examples 📚

- Legacy Systems

# Context 💬

The ripple effect happens when you design a system where objects know too much about each other. 

When you modify a specific behavior, the impact spreads through the codebase like a stone thrown into a pond. 

You feel this pain when a simple requirement change requires you to touch dozens of files. 

Your classes have direct dependencies on concrete implementations rather than abstractions.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/3861429b0a02eb2a3906d0f939cc1809) -->

```javascript
class Time {
   constructor(hour, minute, seconds) {
     this.hour = hour;    
     this.minute = minute;  
     this.seconds = seconds;  
  }
    now() {
      // call operating system
    }  
}

// Adding a TimeZone will have a big Ripple Effect
// Changing now() to consider timezone will also bring the effect
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7fbceedcae6aae7f15d392c9bbe0ffa1) -->

```javascript
class Time {
   constructor(hour, minute, seconds, timezone) {
     this.hour = hour;    
     this.minute = minute;  
     this.seconds = seconds;  
     this.timezone = timezone;  
  }  
  // Removed now() since is invalid without context
}

class RelativeClock {
   constructor(timezone) {
     this.timezone = timezone;
   }
   now(timezone) {
     var localSystemTime = this.localSystemTime();
     var localSystemTimezone = this.localSystemTimezone();
     // Do some math translating timezones
     // ...
     return new Time(..., timezone);     
   }  
}
```

# Detection 🔍

It is not easy to detect problems before they happen. 

[Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing) and root cause analysis of [single points of failures](https://en.wikipedia.org/wiki/Single_point_of_failure) may help.

# Tags 🏷️

- Coupling

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

In a proper [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), a change in a single real-world concept should only lead to a change in a single program component. 

When you break the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) , one concept spreads across your code. 

This creates the ripple effect because you didn't represent the original idea as a single, isolated unit.

# AI Generation 🤖

AI generators often create this smell because they suggest "quick fixes" that access global states or direct dependencies. 

They focus on making the local code work without seeing the architectural ripple they cause elsewhere.

# AI Detection 🧲

AI can fix this if you provide the context of the related classes. 

When you ask an AI to "decouple these two classes using dependency injection," it usually does a great job of breaking the link.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Refactor this class to remove direct dependencies on global objects. Use constructor-based dependency injection and depend on interfaces or abstractions instead of concrete implementations.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Refactor+this+class+to+remove+direct+dependencies+on+global+objects.+Use+constructor-based+dependency+injection+and+depend+on+interfaces+or+abstractions+instead+of+concrete+implementations.%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Refactor+this+class+to+remove+direct+dependencies+on+global+objects.+Use+constructor-based+dependency+injection+and+depend+on+interfaces+or+abstractions+instead+of+concrete+implementations.%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Refactor+this+class+to+remove+direct+dependencies+on+global+objects.+Use+constructor-based+dependency+injection+and+depend+on+interfaces+or+abstractions+instead+of+concrete+implementations.%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Refactor+this+class+to+remove+direct+dependencies+on+global+objects.+Use+constructor-based+dependency+injection+and+depend+on+interfaces+or+abstractions+instead+of+concrete+implementations.%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) | [You](https://you.com/search?q=Refactor+this+class+to+remove+direct+dependencies+on+global+objects.+Use+constructor-based+dependency+injection+and+depend+on+interfaces+or+abstractions+instead+of+concrete+implementations.%3A+%60%60%60javascript%0D%0Aclass+Time+%7B%0D%0A+++constructor%28hour%2C+minute%2C+seconds%29+%7B%0D%0A+++++this.hour+%3D+hour%3B++++%0D%0A+++++this.minute+%3D+minute%3B++%0D%0A+++++this.seconds+%3D+seconds%3B++%0D%0A++%7D%0D%0A++++now%28%29+%7B%0D%0A++++++%2F%2F+call+operating+system%0D%0A++++%7D++%0D%0A%7D%0D%0A%0D%0A%2F%2F+Adding+a+TimeZone+will+have+a+big+Ripple+Effect%0D%0A%2F%2F+Changing+now%28%29+to+consider+timezone+will+also+bring+the+effect%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

There are multiple strategies to deal with Legacy and coupled systems. 

You should deal with this problem before it explodes under our eyes.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 08 - Long Chains Of Collaborations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md)

[Code Smell 176 - Changes in Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md)

# More Information 📕

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)
 
# Credits 🙏

Photo by [Jack Tindall](https://unsplash.com/@jtindall) on [Unsplash](https://unsplash.com/s/photos/big-wave)

* * *

> Architecture is the tension between coupling and cohesion.

_Neal Ford_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)