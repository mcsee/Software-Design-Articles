# Code Smell 287 - Unused Local Assignment

![Code Smell 287 - Unused Local Assignment](Code%20Smell%20287%20-%20Unused%20Local%20Assignment.jpg)

*Are you using the returned value?*

> TL;DR: Avoid assigning values you never use.

# Problems

- Dead code
- Unclear intent
- [Maintenance overhead](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20154%20-%20Too%20Many%20Variables/readme.md)
- Hidden complexity
- Debugging leftovers 
- Bad [scoping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)
- Commented code
- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Solutions

1. Remove unused assignments.  
2. Try to avoid [side effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md).

# Context

When you assign a value to a *local variable* but never use it, you create unnecessary clutter in your code. 

This can confuse others and make the code harder to maintain.

Sometimes, when debugging you can assign temporal variables for better inspection.

This also happens when you assign the execution to an *object property* but it is harder to follow.

It is also a sign of a [mutating object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md) because if you remove the assignment, only the side effects remain.

Mutating objects can cause unexpected side effects, making it harder to track changes. 

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/c99bd3dae0c4f595955b075d7af0f858) -->

```javascript
function updateUserName(user, newname) {
  user.name = newname;
  return user;
}

function performMaintenance(existingUser) {
  let updatedUser = updateUserName(existingUser, "Bobby Peru");
  // Other tasks
}
// The variable updatedUser is never used
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/0f2709a03e2b36be4ae3f417933a66ef) -->

```javascript
function updateUserName(user, newname) {
  user.name = newname;
  // Just side effects without explicit return
}

function performMaintenance(existingUser) {
  updateUserName(existingUser, "Bobby Peru");
  // Other tasks
}
```

# Detection

[X] Automatic 

You can detect this smell using static analysis tools or code reviews that check for unused variables after assignment.

Most linters flag this as an issue.

# Tags

- Bloaters 

# Level

[x] Beginner 

# Why the Bijection Is Important 

It stays clean and efficient when your code accurately reflects [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) logic. 

Unused assignments break this connection, making it harder to understand the intent and maintain the code. 

# AI Generation

AI tools seldom generate unused variable assignments when they misunderstand intent. 

# AI Detection

AI-assisted refactoring with clear instructions can flag unused variables and suggest removals, but it might not always understand if the return value should have been used.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=remove+unused+variable%3A+%60%60%60javascript%0D%0Afunction+updateUserName%28user%2C+newname%29+%7B%0D%0A++user.name+%3D+newname%3B%0D%0A++return+user%3B%0D%0A%7D%0D%0A%0D%0Afunction+performMaintenance%28existingUser%29+%7B%0D%0A++let+updatedUser+%3D+updateUserName%28existingUser%2C+%22Bobby+Peru%22%29%3B%0D%0A++%2F%2F+Other+tasks%0D%0A%7D%0D%0A%2F%2F+The+variable+updatedUser+is+never+used%0D%0A%60%60%60) | 

# Conclusion

Unused variables after [mutations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md) create noise and confusion.

Don't assign the return value if you don't need it. 

If the method should return something meaningful, make sure you use it.

# Relations

[Code Smell 209 - Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md)

[Code Smell 176 - Changes in Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md)

[Code Smell 154 - Too Many Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20154%20-%20Too%20Many%20Variables/readme.md)

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

# More Information

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Evan Demicoli](https://unsplash.com/@evandemicoli) on [Unsplash](https://unsplash.com/photos/brown-and-green-houses-under-blue-sky-during-daytime-HGCqL-tRcac)
        
* * *

> If you have to spend effort to decipher code, you should rewrite it.

_Martin Golding_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)