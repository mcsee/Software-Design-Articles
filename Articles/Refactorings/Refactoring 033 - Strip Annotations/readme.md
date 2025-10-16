# Refactoring 033 - Strip Annotations

![Refactoring 033 - Strip Annotations](Refactoring%20033%20-%20Strip%20Annotations.jpg)

*Clean up your code by removing unnecessary annotations*

> TL;DR: Make your code simpler and more maintainable by removing redundant or unused annotations.

# Problems Addressed 😔

- [Obsolete comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)
- Cluttered code
- Lower readability
- Maintenance [overhead](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)
- Unnecessary metadata
- Overengineered solutions
- [Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)
- Hidden [design decisions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md)
- [To-dos](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md)

# Related Code Smells 💨

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 152 - Logical Comment](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20152%20-%20Logical%20Comment/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 168 - Undocumented Decisions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md)

[Code Smell 148 - ToDos](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md)

# Steps 👣

1. Identify annotations bloating your code.
2. Evaluate their purpose and necessity.
3. Remove annotations with no clear value.
4. Replace critical annotations with explicit code.

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/2a591a849322e205cdb56da9df35b093) -->

```php
<?php
// @author John Wick
// @version 3.14
// @description Service for user operations
class UserService {
    /**
     * @deprecated
     * @param int $id
     * @return string
     */
    public function userName($id) {
        // @todo Sanitize input
        return $this->database->query(
            "SELECT name FROM users WHERE id = $id");
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/79cc8eab9b0548e387957c6ae99d6dfd) -->

```php
<?php
class UserService {
    // Step 1: Identified annotations 
    //   (@author, @version, @description, 
    // Step 2: Evaluated their purpose 
    //   (metadata, deprecated, todo notes)
    // Step 3: Removed unnecessary annotations (no value added)
    // Step 4: Replaced critical annotations 
    //   with explicit code (none needed)
  
    // Type hintings are explicit
    public function userName(int $id): string {        
        $statement = $this->database->prepare(
          "SELECT name FROM users WHERE id = ?");
        // No tech debt 
        $statement->execute([$id]);
        return $statement->fetchColumn();
        // You can add a test to ensure there are 
        // no new calls to this deprecated method
    }
}
```

# Type 📝

[X] Semi-Automatic

You can rewrite them with expressions or with an AI assistant.

# Safety 🛡️

You can safely remove annotations if they’re purely metadata or documentation, but ensure any functional annotations (like @Deprecated) are replaced with explicit code or logic to maintain behavior.

# Why is the Code Better? ✨

You get cleaner, easier-to-read, and less cluttered code.

Removing unnecessary annotations reduces maintenance overhead and focuses on the core logic.

Explicit code over annotations improves clarity and reduces reliance on metadata that may become outdated.

# How Does it Improve the Bijection? 🗺️

You simplify the mapping between the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) problem and the code by removing annotations that don’t model the domain.

This creates a clearer, [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) correspondence with the problem space, reducing noise and improving maintainability.

# Limitations ⚠️

Some annotations *(e.g., @Override, @Transactional)* are critical for functionality in certain frameworks.

You must carefully evaluate each annotation’s role before removal to avoid breaking behavior.

# Refactor with AI 🤖

You can use AI tools like ChatGPT or GitHub Copilot to analyze your codebase. Ask the AI to identify annotations, explain their purpose, and suggest replacements with explicit code. Then, manually review and test the changes to ensure correctness.

> Suggested Prompt: 1. Identify annotations bloating your code.2. Evaluate their purpose and necessity. 3. Remove annotations with no clear value. 4. Replace critical annotations with explicit code.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+annotations+bloating+your+code.2.+Evaluate+their+purpose+and+necessity.+3.+Remove+annotations+with+no+clear+value.+4.+Replace+critical+annotations+with+explicit+code.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+annotations+bloating+your+code.2.+Evaluate+their+purpose+and+necessity.+3.+Remove+annotations+with+no+clear+value.+4.+Replace+critical+annotations+with+explicit+code.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+annotations+bloating+your+code.2.+Evaluate+their+purpose+and+necessity.+3.+Remove+annotations+with+no+clear+value.+4.+Replace+critical+annotations+with+explicit+code.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+annotations+bloating+your+code.2.+Evaluate+their+purpose+and+necessity.+3.+Remove+annotations+with+no+clear+value.+4.+Replace+critical+annotations+with+explicit+code.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+annotations+bloating+your+code.2.+Evaluate+their+purpose+and+necessity.+3.+Remove+annotations+with+no+clear+value.+4.+Replace+critical+annotations+with+explicit+code.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%2F%2F+%40author+John+Wick%0D%0A%2F%2F+%40version+3.14%0D%0A%2F%2F+%40description+Service+for+user+operations%0D%0Aclass+UserService+%7B%0D%0A++++%2F%2A%2A%0D%0A+++++%2A+%40deprecated%0D%0A+++++%2A+%40param+int+%24id%0D%0A+++++%2A+%40return+string%0D%0A+++++%2A%2F%0D%0A++++public+function+userName%28%24id%29+%7B%0D%0A++++++++%2F%2F+%40todo+Sanitize+input%0D%0A++++++++return+%24this-%3Edatabase-%3Equery%28%0D%0A++++++++++++%22SELECT+name+FROM+users+WHERE+id+%3D+%24id%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Comments

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# Credits 🙏

Image by [congerdesign](https://pixabay.com/users/congerdesign-509903/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)