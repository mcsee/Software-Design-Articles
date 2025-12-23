# Code Smell 193 - Switch Instead of Formula
            
![Code Smell 193 - Switch Instead of Formula](Code%20Smell%20193%20-%20Switch%20Instead%20of%20Formula.png)

*Which is better, declarative or shorter code?*

> TL;DR: Be declarative enough but no more.

# Problems 😔 

- Readability

- [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Solutions 😃

1. Use a short version (or not).

2. Always favor readability >> Premature optimization.

3. Humans learn by examples, not by formulas.

4. Shorter is not always better.

# Context 💬

Last week, a tweet went viral because of a missing formula.

[X](https://twitter.com/JeroenFrijters/status/1615204074588180481)

It is the DigiD digital authentication iOS app in the Netherlands.

# Sample Code 📖

## Wrong?

<!-- [Gist Url](https://gist.github.com/mcsee/0a2979db94ff5288a342e2846155d955) -->

```csharp
private static string GetPercentageRounds(double percentage)
        {
            if (percentage == 0)
                return "⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪";
            if (percentage > 0.0 && percentage <= 0.1)
                return "🔵⚪⚪⚪⚪⚪⚪⚪⚪⚪";
            if (percentage > 0.1 && percentage <= 0.2)
                return "🔵🔵⚪⚪⚪⚪⚪⚪⚪⚪";
            if (percentage > 0.2 && percentage <= 0.3)
                return "🔵🔵🔵⚪⚪⚪⚪⚪⚪⚪";
            if (percentage > 0.3 && percentage <= 0.4)
                return "🔵🔵🔵🔵⚪⚪⚪⚪⚪⚪";
            if (percentage > 0.4 && percentage <= 0.5)
                return "🔵🔵🔵🔵🔵⚪⚪⚪⚪⚪";
            if (percentage > 0.5 && percentage <= 0.6)
                return "🔵🔵🔵🔵🔵🔵⚪⚪⚪⚪";
            if (percentage > 0.6 && percentage <= 0.7)
                return "🔵🔵🔵🔵🔵🔵🔵⚪⚪⚪";
            if (percentage > 0.7 && percentage <= 0.8)
                return "🔵🔵🔵🔵🔵🔵🔵🔵⚪⚪";
            if (percentage > 0.8 && percentage <= 0.9)
                return "🔵🔵🔵🔵🔵🔵🔵🔵🔵⚪";

            return "🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵";
        }
    }
}

// Full source
// https://github.com/MinBZK/
// woo-besluit-broncode-digid-app/
// blob/master/Source/DigiD.iOS/Services/NFCService.cs
```

## Right?

<!-- [Gist Url](https://gist.github.com/mcsee/e24ffc9ad7e587f44862ed7dff22e1b7) -->

```csharp
private static string GetPercentageRounds(double percentage)
{
    string dots = "🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪";
    int blueDots = (int) Math.Truncate (percentage* 10);
    int startingPoint = 10-blueDots;
    return dots. Substring(startingPoint, 10);
}
```

# Detection 🔍

[X] Semi-Automatic

This is a semantic smell. In this case, we can count the number of if clauses.

# Tags 🏷️

- Readability

# Conclusion 🏁

You can read the original [X thread](https://twitter.com/JeroenFrijters/status/1615204074588180481) to take your own conclusions. There's some serious debate and, of course, several premature optimizators bringing obscure and unneeded solutions with *(O) log(n)* complexity and stupid benchmarks evidence for a loop that executes only once.

And lots of memes.

As a final conclusion, I asked [ChatGPT](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/ChatGPT%20The%20Surprising%20Teacher%20of%20a%20+25%20Year%20Senior%20Programmer/readme.md) and was not able to simplify it.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Information 📕

[X](https://twitter.com/JeroenFrijters/status/1615204074588180481)

[GitHub Repo](https://github.com/MinBZK/woo-besluit-broncode-digid-app/)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies.

_C. A. R. Hoare_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)