# Code Smell 289 - Shy Visitor

![Code Smell 289 - Shy Visitor](Code%20Smell%20289%20-%20Shy%20Visitor.jpg)

*Don't knock. You are accepted*

> TL;DR: Avoid combining the Visitor pattern with *instanceof* checks.

# Problems 😔

- Open/Closed principle violation
- Tight [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Maintainability
- Code duplication
- Poor readability
- Brittle design
- [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)
- [Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Solutions 😃

1. Implement the [Visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern) correctly.
2. Avoid *[instanceof](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2023%20-%20Instance%20Type%20Checking/readme.md)* checks.
3. Favor polymorphism.
4. Encapsulate behavior.

# Context 💬

When you use the *Visitor* pattern, you aim to **separate algorithms** from the objects they operate on.

Combining it with *instanceof* checks breaks this separation, leading to a **fragile and hard-to-maintain design**.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a711d744ab165746e0da20f51fadf5fe) -->

```php
<?php

class SpaceObjectVisitor {
    public function visit(SpaceObject $object) {
        if ($object instanceof NeutronStar) {
            $this->visitNeutronStar($object);
        } elseif ($object instanceof Magnetar) {
            $this->visitMagnetar($object);
        } elseif ($object instanceof BlackHole) {
            $this->visitBlackHole($object);
        } 
        // Not closed for modification
    }

    private function visitNeutronStar(NeutronStar $star) {
        // Handle neutron star observation
    }

    private function visitMagnetar(Magnetar $magnetar) {
        // Handle magnetar observation
    }

    private function visitBlackHole(BlackHole $blackHole) {
        // Handle black hole observation
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/360aace11de04e6cae87db8a8ed8cb7e) -->

```php
<?php

interface SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void;
}

class NeutronStar implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitNeutronStar($this);
  }
}

class Magnetar implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitMagnetar($this);
  }
}

class SpaceObjectRenderer implements SpaceObjectVisitor {
  // This is a concrete realization adhering to the protocol
  public function visitNeutronStar(NeutronStar $star): void {
    echo "Rendering a Neutron Star: Extremely dense and small!\n";
  }

  public function visitMagnetar(Magnetar $magnetar): void {
    echo "Rendering a Magnetar: A highly magnetic neutron star!\n";
  }

  public function visitBlackHole(BlackHole $blackHole): void {
    echo "Rendering a Black Hole: A strong gravitational pull!\n";
  }
}

class BlackHole implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitBlackHole($this);
  }
}

interface SpaceObjectVisitor {
  // Open for extension     
  public function visitNeutronStar(NeutronStar $star): void {
    // Handle neutron star
  }

  public function visitMagnetar(Magnetar $magnetar): void {
    // Handle magnetar
  }

  public function visitBlackHole(BlackHole $blackHole): void {
    // Handle black hole
  }
}
```

# Detection 🔍

You can detect this smell by looking for *instanceof* checks within the Visitor pattern.

Automated tools can flag these checks, and code reviews can help identify them.

[X] Manual

# Tags 🏷️

- IFs

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

When you model [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) objects, you should maintain a [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) correspondence between the real-world entities and your code.

Breaking this correspondence using *instanceof* checks **(which do not exist on the model but the metamodel)** leads to a **mismatch** between the real world and your program.

# AI Generation 🤖

AI generators might create this smell if they are not properly guided.

# AI Detection 🥃

AI can help fix this smell by suggesting refactoring steps to remove *instanceof* checks and **use polymorphism** instead.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove instanceOf checks

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+instanceOf+checks%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+instanceOf+checks%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+instanceOf+checks%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+instanceOf+checks%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+SpaceObjectVisitor+%7B%0D%0A++++public+function+visit%28SpaceObject+%24object%29+%7B%0D%0A++++++++if+%28%24object+instanceof+NeutronStar%29+%7B%0D%0A++++++++++++%24this-%3EvisitNeutronStar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+Magnetar%29+%7B%0D%0A++++++++++++%24this-%3EvisitMagnetar%28%24object%29%3B%0D%0A++++++++%7D+elseif+%28%24object+instanceof+BlackHole%29+%7B%0D%0A++++++++++++%24this-%3EvisitBlackHole%28%24object%29%3B%0D%0A++++++++%7D+%0D%0A++++++++%2F%2F+Not+closed+for+modification%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitNeutronStar%28NeutronStar+%24star%29+%7B%0D%0A++++++++%2F%2F+Handle+neutron+star+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitMagnetar%28Magnetar+%24magnetar%29+%7B%0D%0A++++++++%2F%2F+Handle+magnetar+observation%0D%0A++++%7D%0D%0A%0D%0A++++private+function+visitBlackHole%28BlackHole+%24blackHole%29+%7B%0D%0A++++++++%2F%2F+Handle+black+hole+observation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

When you use the Visitor pattern, avoid combining it with *iskindOf* checks.

Using the *accept()* method, the visitor class doesn't need to **explicitly check** the object **type**.

Each object will call the appropriate visitor method honoring the [Open/Closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

Favor **polymorphism and encapsulation** to keep your code **clean** and maintainable.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

[Code Smell 23 - Instance Type Checking](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2023%20-%20Instance%20Type%20Checking/readme.md)

# More Information 📕

[Open/Closed principle on Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Braňo](https://unsplash.com/@3dparadise) on [Unsplash](https://unsplash.com/photos/white-moon-in-black-background-K2MsWQc0M0k)

* * *

> The Visitor pattern is a way to add new operations to a set of objects without changing their classes.

_Erich Gamma_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)