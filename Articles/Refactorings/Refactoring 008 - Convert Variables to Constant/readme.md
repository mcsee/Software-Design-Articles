# Refactoring 008 - Convert Variables to Constant
            
![Refactoring 008 - Convert Variables to Constant](Refactoring%20008%20-%20Convert%20Variables%20to%20Constant.jpg)

*If I see a Variable that doesn't change. I call that variable a constant*

> TL;DR: Be explicit on what mutates and what doesn't.

# Problems Addressed 😔

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- Code Optimization

# Related Code Smells 💨

[Code Smell 158 - Variables not Variable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20158%20-%20Variables%20not%20Variable/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

# Context 💬

Variables that never change their value are not really variables. 

They’re constants pretending to be mutable state.

When we declare something as a variable, we tell the reader (and the compiler) to expect change.

If that change never happens, we’re sending misleading signals about what the code actually does.

Converting these to constants shrinks the state space a developer must track.

A constant signals that a value won’t change, preventing accidental reassignments and letting the compiler optimize better.

It’s honest: if something shouldn’t mutate, don’t let it.

# Steps 👣 

1. Find the scope of the variable

2. Define a constant with the same scope

3. Replace the variable 

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/3ae265e1ae7422164c175b16a7f822d3) -->

```javascript
let lightSpeed = 300000;
var gravity = 9.8;

// 1. Find the scope of the variable
// 2. Define a constant with the same scope
// 3. Replace the variable
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e25d1ded85b4547d20fee70e4c1f0ca6) -->

```javascript
const lightSpeed = 300000;
const gravity = 9.8;

// 1. Find the scope of the variable
// 2. Define a constant with the same scope
// 3. Replace the variable 

// If the object is compound, 
// we might need Object.freeze(gravity);
```

# Type 📝

[X] Automatic

IDEs can check if a variable is written but never updated.

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

Code is more compact and declares intent clearly.

Take it further with language-specific operators like *const*, *final*, or *let*.

The scope becomes obvious at a glance.

# How Does it Improve the Bijection? 🗺️

This refactoring improves [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by making it clear what mutates and what doesn't.

In the real world, most values don't change. They're constants.

Declaring them as variables creates [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) between what we're thinking and how we wrote it.

Constants remove that gap and align the code with the actual domain.

# Tags 🏷️

- Mutability

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 003 - Extract Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Find the scope of the variable.2. Define a constant with the same scope.3. Replace the variable

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Find+the+scope+of+the+variable.2.+Define+a+constant+with+the+same+scope.3.+Replace+the+variable%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Find+the+scope+of+the+variable.2.+Define+a+constant+with+the+same+scope.3.+Replace+the+variable%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Find+the+scope+of+the+variable.2.+Define+a+constant+with+the+same+scope.3.+Replace+the+variable%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Find+the+scope+of+the+variable.2.+Define+a+constant+with+the+same+scope.3.+Replace+the+variable%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Find+the+scope+of+the+variable.2.+Define+a+constant+with+the+same+scope.3.+Replace+the+variable%3A+%60%60%60javascript%0D%0Alet+lightSpeed+%3D+300000%3B%0D%0Avar+gravity+%3D+9.8%3B%0D%0A%0D%0A%2F%2F+1.+Find+the+scope+of+the+variable%0D%0A%2F%2F+2.+Define+a+constant+with+the+same+scope%0D%0A%2F%2F+3.+Replace+the+variable%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)