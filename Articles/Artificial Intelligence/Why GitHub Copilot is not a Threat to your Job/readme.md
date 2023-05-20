# Why GitHub Copilot is not a Threat to your Job

![Why GitHub Copilot is not a Threat to your Job](Why%20GitHub%20Copilot%20is%20not%20a%20Threat%20to%20your%20Job.png)

> TL;DR: If you are a good software designer Copilot will not help you very much.

# What is GitHub Copilot?

GitHub Copilot is an AI pair programmer.
It was trained with a huge coding database of common small routines.
It also can recognize bad comments and create imperative code from them.

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

GitHub copilot is a text transformer similar to GPT-3.

It was developed by the same company: OpenAI.

[I've Recently Learned About GPT3 - This is my Journey](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/I've%20Recently%20Learned%20About%20GPT3%20-%20This%20is%20my%20Journey/readme.md)

# How does it work?

The OpenAI Codex engine powers GitHub Copilot.
It was trained with a lot of source code and also natural language.

To use it, we must apply to their [waiting list](https://copilot.github.com/). The approval process is fast.

We add it as a Visual Studio Code Extension that interacts in real-time with GitHub.

# Benefits(?)

## Autofill

Copilot can predict anemic structures once we describe their accidental data.

[Code Smell 70 - Anemic Model Generators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2070%20-%20Anemic%20Model%20Generators/readme.md)

They are suitable for implementative and anemic code generation.

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

## Bad comments to code

It converts bad comments (those that should never be present in our code) to straightforward algorithms.

We can assume that the training set was filled with bad implementative commented code.
We shouldn't rely much on the algorithm's declarative.

## Structural tests

CodePilot can generate tests on setters. These tests are coupled to implementation and fragile.

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

They test our getters, so they don't add much value to validating our system's behavior.

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

More insights [here](https://goldedem.hashnode.dev/github-co-pilot-in-a-nutshell).

# Should we worry about it?

Not now.

If you read the benefits above, most of the Copilot code belongs to the [code smell area](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md).

Very soon, transformers like Copilot will replace lazy and implementative programmers.

[Programmers losing their jobs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Opinion/(Most)%20Programmers%20are%20losing%20our%20jobs%20very%20soon/readme.md)

# What should be doing right now?

We need to be cleverer than it.

We need to create great behavioral models far from implementative structural data

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

The problem copilot is solving right now tackles software main mistakes. Thinking of programming as just dealing with data instead of behavior.

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

Once we decide to grow up and build serious software instead of dealing with strings and dates, we will push our jobs a few years away from this fancy robot.

Please do write me a line below with your thoughts on this.
