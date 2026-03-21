# Refactoring 006 - Rename Result Variables

![Refactoring 006 - Rename Result Variables](Refactoring%20006%20-%20Rename%20Result%20Variables.jpg)

*'Result' is a very bad generic name. Rename it*

> TL;DR: Use the last call as a semantic guide.

# Problems Addressed 😔

- Bad naming on variables

# Related Code Smells 💨

[Code Smell 81 - Result](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2081%20-%20Result/readme.md)

[Code Smell 79 - TheResult](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2079%20-%20TheResult/readme.md)

# Context 💬

Generic names like result, data, or res are lazy placeholders. 

They acknowledge that a computation finished but hide the nature of the outcome. 

This forces the reader to track the variable's identity manually, increasing cognitive load as the method grows.

You should rename the variable to reflect its semantic role—often mirroring the function that created it—you transform a generic "thing" into a meaningful domain concept. 

This ensures the variable's purpose remains clear even when the assignment and its usage are far apart.

# Steps 👣 

1. Name the variable with the same name as the last function call.

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/c4f1e90fb0a61724ea5993e04d572b5c) -->

```javascript
function doubleFavoriteNumber(n) {
    return this.favoriteNumber * n;
}

var result = doubleFavoriteNumber(2);

// Many lines after we have no idea what does 
// result holds

// var result ???
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/5a9bbc54b45798a610f0a76b8c25a583) -->

```javascript
function doubleFavoriteNumber(n) {
    return this.favoriteNumber * n;
}

const favoriteNumberDoubled = doubleFavoriteNumber(2);

// Many instructions after

// We can use favoriteNumberDoubled knowing its semantics
```

# Type 📝

[X] Semi-Automatic

As with many name heuristics, we can replace the variable with another refactor *rename variable*

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

A variable scope can last a lot.

Assignment and usage might be very far away from each other.

# How Does it Improve the Bijection? 🗺️

When you rename generic variables to meaningful names, you create a clearer [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) between the real-world concept and the software representation. 

This improves the [Bijection](https://maximocontieri.com/the-one-and-only-software-design-principle) by reducing the cognitive gap between domain concepts and implementation details.

# Tags 🏷️

- Naming 

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

- Rename method

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify generic variable names like 'result', 'data', 'res'.2. Rename them based on the function that created them or their semantic purpose.3. Ensure the new names reflect the variable's role in the domain

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+generic+variable+names+like+%27result%27%2C+%27data%27%2C+%27res%27.2.+Rename+them+based+on+the+function+that+created+them+or+their+semantic+purpose.3.+Ensure+the+new+names+reflect+the+variable%27s+role+in+the+domain%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+generic+variable+names+like+%27result%27%2C+%27data%27%2C+%27res%27.2.+Rename+them+based+on+the+function+that+created+them+or+their+semantic+purpose.3.+Ensure+the+new+names+reflect+the+variable%27s+role+in+the+domain%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+generic+variable+names+like+%27result%27%2C+%27data%27%2C+%27res%27.2.+Rename+them+based+on+the+function+that+created+them+or+their+semantic+purpose.3.+Ensure+the+new+names+reflect+the+variable%27s+role+in+the+domain%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+generic+variable+names+like+%27result%27%2C+%27data%27%2C+%27res%27.2.+Rename+them+based+on+the+function+that+created+them+or+their+semantic+purpose.3.+Ensure+the+new+names+reflect+the+variable%27s+role+in+the+domain%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+generic+variable+names+like+%27result%27%2C+%27data%27%2C+%27res%27.2.+Rename+them+based+on+the+function+that+created+them+or+their+semantic+purpose.3.+Ensure+the+new+names+reflect+the+variable%27s+role+in+the+domain%3A+%60%60%60javascript%0D%0Afunction+doubleFavoriteNumber%28n%29+%7B%0D%0A++++return+this.favoriteNumber+%2A+n%3B%0D%0A%7D%0D%0A%0D%0Avar+result+%3D+doubleFavoriteNumber%282%29%3B%0D%0A%0D%0A%2F%2F+Many+lines+after+we+have+no+idea+what+does+%0D%0A%2F%2F+result+holds%0D%0A%0D%0A%2F%2F+var+result+%3F%3F%3F%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[What Exactly Is a Name? Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits 🙏

Image by [HeungSoon](https://pixabay.com/users/heungsoon-4523762/) from [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)