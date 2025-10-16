# Refactoring 032 - Apply Consistent Style Rules

![Refactoring 032 - Apply Consistent Style Rules](Refactoring%20032%20-%20Apply%20Consistent%20Style%20Rules.jpg)

*Make your code look the same everywhere for everybody*

> TL;DR: When machines generate large amounts of code, you need to apply one consistent style to all files.

# Problems Addressed 😔

- Inconsistent tabs
- Mixed [spaces](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20211%20-%20Tab%20over%20Spaces/readme.md)
- Uneven braces
- Disordered methods
- Inconsistent [indentation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)
- Mixed [formatting styles](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)
- Random spacing patterns
- Scattered method ordering
- Irregular brace placement
- etc, etc.

# Related Code Smells 💨

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

[Code Smell 164 - Mixed Indentations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

[Code Smell 211 - Tab over Spaces](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20211%20-%20Tab%20over%20Spaces/readme.md)

[CoDe SmElL 159 - mIxEd_cASe](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md)

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

[Code Smell 173 - Broken Windows](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20173%20-%20Broken%20Windows/readme.md)

# Steps 👣

1. Choose a consistent indentation standard (tabs or spaces)
2. Apply uniform brace placement rules throughout files
3. Standardize spacing around operators and keywords
4. Organize methods with public declarations before private ones
5. Configure automated formatting tools to maintain standards
6. Create tests to enforce your rules
7. Apply them as a [hook for git commits](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks)
8. Teach your AIs to [memorize these rules](https://windsurf.com/editor/directory) when generating code
9. etc, etc.

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/d6eb4096c5009e6b0c788a488f32663c) -->

```javascript
class User{
private name;
    public email;
  
constructor(name,email) {
this.name=name;
        this.email = email;
}

    private validateEmail() {
return this.email.includes('@');
    }

public getName(){
        return this.name;
}

  public setName(newName)
{
    this.name=newName;
  }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4fe4708741bc558dda3818181a7a04a7) -->

```javascript
class User {
  public email;
  private name;
  
  // Step 1: Choose consistent indentation (2 spaces)
  // Step 4: Public methods before private ones
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  public getName() {
    return this.name;
  }
  
  // Step 3: Standardize spacing around operators
  public setName(newName) {
    this.name = newName;
  }
  
  // Step 2: Apply uniform brace placement
  private validateEmail() {
    return this.email.includes('@');
  }
}
```

# Type 📝

[X] Automatic

# Safety 🛡️

This refactoring is safe, as it only changes visual formatting without altering the code's behavior.

Modern IDEs and formatters can apply these changes automatically without risk of introducing bugs.

# Why is the Code Better? ✨

You improve readability and make your code easier to navigate.

You remove the mental overhead of switching styles across files.

Your code reviews will focus on meaningful semantic changes.

Consistent formatting reduces cognitive load when reading code, makes code reviews more focused on logic rather than style, and enables better collaboration between team members.

You also establish a foundation for maintainable code that new developers can understand quickly.

# How Does it Improve the Bijection? 🗺️

You create clearer visual representations that mirror the logical structure of your [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  domain.

When formatting reflects the hierarchical relationships and importance levels in your business logic, you maintain better alignment between the problem space and solution space.

# Limitations ⚠️

You need team-wide agreement on formatting standards to be effective.

Different team members might have strong preferences for specific styles.

Large codebases require significant time investment and coordination to apply uniform styling across all files.

# Refactor with AI 🤖

> Suggested Prompt: 1. Choose a consistent indentation standard 2. Apply uniform brace placement rules throughout files 3. Standardize spacing around operators and keywords 4. Organize methods with public declarations before private ones 5. Configure automated formatting tools to maintain standards 6. Create tests to enforce your rules 

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Choose+a+consistent+indentation+standard+2.+Apply+uniform+brace+placement+rules+throughout+files+3.+Standardize+spacing+around+operators+and+keywords+4.+Organize+methods+with+public+declarations+before+private+ones+5.+Configure+automated+formatting+tools+to+maintain+standards+6.+Create+tests+to+enforce+your+rules+%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Choose+a+consistent+indentation+standard+2.+Apply+uniform+brace+placement+rules+throughout+files+3.+Standardize+spacing+around+operators+and+keywords+4.+Organize+methods+with+public+declarations+before+private+ones+5.+Configure+automated+formatting+tools+to+maintain+standards+6.+Create+tests+to+enforce+your+rules+%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Choose+a+consistent+indentation+standard+2.+Apply+uniform+brace+placement+rules+throughout+files+3.+Standardize+spacing+around+operators+and+keywords+4.+Organize+methods+with+public+declarations+before+private+ones+5.+Configure+automated+formatting+tools+to+maintain+standards+6.+Create+tests+to+enforce+your+rules+%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Choose+a+consistent+indentation+standard+2.+Apply+uniform+brace+placement+rules+throughout+files+3.+Standardize+spacing+around+operators+and+keywords+4.+Organize+methods+with+public+declarations+before+private+ones+5.+Configure+automated+formatting+tools+to+maintain+standards+6.+Create+tests+to+enforce+your+rules+%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Choose+a+consistent+indentation+standard+2.+Apply+uniform+brace+placement+rules+throughout+files+3.+Standardize+spacing+around+operators+and+keywords+4.+Organize+methods+with+public+declarations+before+private+ones+5.+Configure+automated+formatting+tools+to+maintain+standards+6.+Create+tests+to+enforce+your+rules+%3A+%60%60%60javascript%0D%0Aclass+User%7B%0D%0Aprivate+name%3B%0D%0A++++public+email%3B%0D%0A++%0D%0Aconstructor%28name%2Cemail%29+%7B%0D%0Athis.name%3Dname%3B%0D%0A++++++++this.email+%3D+email%3B%0D%0A%7D%0D%0A%0D%0A++++private+validateEmail%28%29+%7B%0D%0Areturn+this.email.includes%28%27%40%27%29%3B%0D%0A++++%7D%0D%0A%0D%0Apublic+getName%28%29%7B%0D%0A++++++++return+this.name%3B%0D%0A%7D%0D%0A%0D%0A++public+setName%28newName%29%0D%0A%7B%0D%0A++++this.name%3DnewName%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Standards

# Related Refactorings 🔄

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Level 🔋

[X] Beginner

# See also 📚

[Git Hooks](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks)

[Windsurf Rules Directory](https://windsurf.com/editor/directory)

# Credits 🙏

Image by [Michal Jarmoluk](https://pixabay.com/users/jarmoluk-143740/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)