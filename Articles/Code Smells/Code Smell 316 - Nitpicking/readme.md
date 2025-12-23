# Code Smell 316 - Nitpicking

![Code Smell 316 - Nitpicking](Code%20Smell%20316%20-%20Nitpicking.jpg)

*When syntax noise hides real design problems*

> TL;DR: When you focus code reviews on syntax, you miss architecture, security, design and intent.

# Problems 😔

- Syntax fixation
- Design blindness
- Missed risks
- Bad feedback
- Useless discussions
- Reviewer fatigue
- False quality
- Shallow feedback
- Syntax Police
- Low team morale

# Solutions 😃

1. Leave the boring work to the IA
2. Automate [style checks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20032%20-%20Apply%20Consistent%20Style%20Rules/readme.md)
3. Review architecture first
4. Discuss intent early with technical analysis and control points
5. Enforce review roles
6. Raise abstraction level

# Refactorings ⚙️

[Refactoring 032 - Apply Consistent Style Rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20032%20-%20Apply%20Consistent%20Style%20Rules/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

# Context 💬

When you review code, you choose where to spend your valuable human attention.

When you spend that attention on commas, naming trivia, or formatting, you ignore the parts that matter.

This smell appears when teams confuse cleanliness with correctness. Syntax looks clean. Architecture rots.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/207cda2d66d6c44257cc81b87c5b61b6) -->

```php
<?php

class UserRepository {
    public function find($id){
        $conn = mysqli_connect(
             "localhost", // Pull Request comment - Bad indentation
            "root",
            "password123",
            "app"
        );

        $query = "Select * FROM users WHERE id = $id";
        // Pull Request comment - SELECT should be uppercase
        return mysqli_query($conn, $query);
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/65956b492933a751f412d955899f6365) -->

```php
<?php

final class UserRepository {
    private Database $database;

    public function __construct(Database $database) {
        $this->database = $database;
    }

    public function find(UserId $id): User {
        return $this->database->fetchUser($id);
    }
}

// You removed credentials, SQL, and infrastructure noise.
// Now reviewers can discuss design and behavior.
```

# Detection 🔍

[X] Manual

You can detect this smell by examining pull request comments.

When you see multiple comments about [formatting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md), [indentation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md), trailing commas, or variable naming conventions, you lack proper automation.

Check your continuos integration pipeline configuration. If you don't enforce linting and formatting before human review, you force reviewers to catch these issues manually.

Review your code review metrics. If you spend more time discussing style than architecture, you have this smell.

Automated tools like SonarQube, ESLint, and Prettier can identify when you don't enforce rules automatically.

# Tags 🏷️

- Standards

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

Code review represents the quality assurance process in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

When you break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by having humans perform mechanical checks instead of judgment-based evaluation, you mismodel the review process.

You no longer validate whether the concepts, rules, and constraints match the domain.

You only validate formatting.

That gap creates systems that look clean and behave wrong.

The broken bijection manifests as reviewer fatigue and missed bugs. You restore proper mapping by separating mechanical verification (automated) from architectural review (human).

# AI Generation 🤖

AI generators often create this smell.

They produce syntactically correct code with weak boundaries and unclear intent.

# AI Detection 🧲

AI can reduce this smell when you instruct it to focus on architecture, invariants, and risks instead of formatting.

Give them clear prompts and describe the role and skills of the reviewer.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Find real problems in the code beyond nitpicking, review this code focusing on architecture, responsibilities, security risks, and domain alignment. Ignore formatting and style.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Find+real+problems+in+the+code+beyond+nitpicking%2C+review+this+code+focusing+on+architecture%2C+responsibilities%2C+security+risks%2C+and+domain+alignment.+Ignore+formatting+and+style.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Find+real+problems+in+the+code+beyond+nitpicking%2C+review+this+code+focusing+on+architecture%2C+responsibilities%2C+security+risks%2C+and+domain+alignment.+Ignore+formatting+and+style.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Find+real+problems+in+the+code+beyond+nitpicking%2C+review+this+code+focusing+on+architecture%2C+responsibilities%2C+security+risks%2C+and+domain+alignment.+Ignore+formatting+and+style.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Find+real+problems+in+the+code+beyond+nitpicking%2C+review+this+code+focusing+on+architecture%2C+responsibilities%2C+security+risks%2C+and+domain+alignment.+Ignore+formatting+and+style.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Find+real+problems+in+the+code+beyond+nitpicking%2C+review+this+code+focusing+on+architecture%2C+responsibilities%2C+security+risks%2C+and+domain+alignment.+Ignore+formatting+and+style.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+UserRepository+%7B%0D%0A++++public+function+find%28%24id%29%7B%0D%0A++++++++%24conn+%3D+mysqli_connect%28%0D%0A+++++++++++++%22localhost%22%2C+%2F%2F+Pull+Request+comment+-+Bad+indentation%0D%0A++++++++++++%22root%22%2C%0D%0A++++++++++++%22password123%22%2C%0D%0A++++++++++++%22app%22%0D%0A++++++++%29%3B%0D%0A%0D%0A++++++++%24query+%3D+%22Select+%2A+FROM+users+WHERE+id+%3D+%24id%22%3B%0D%0A++++++++%2F%2F+Pull+Request+comment+-+SELECT+should+be+uppercase%0D%0A++++++++return+mysqli_query%28%24conn%2C+%24query%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Code reviews should improve systems, not satisfy linters.

When you automate syntax, you free humans to think.

That shift turns reviews into real design conversations.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 173 - Broken Windows](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20173%20-%20Broken%20Windows/readme.md)

[Code Smell 236 - Unwrapped Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20236%20-%20Unwrapped%20Lines/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Portuguese Gravity](https://unsplash.com/@portuguesegravity) on [Unsplash](https://unsplash.com/photos/gray-stainless-steel-fork-and-spoon-on-white-ceramic-plate-qxR_MIyCoAw)

* * *

> Design is about intent, not syntax.

_Grady Booch_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)