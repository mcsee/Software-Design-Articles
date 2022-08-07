# Why GitHub Copilot is not a Threat to your Job

![Why GitHub Copilot is not a Threat to your Job](cp-head-square.png)

> TD;DR: If you are a good software designer Copilot will not help you very much.

# What is GitHub Copilot?

GitHub Copilot is an AI pair programmer.
It was trained with a huge coding database of common small routines.
It also can recognize bad comments and create imperative code from them.

[Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

GitHub copilot is a text transformer similar to GPT-3.

It was developed by the same company: OpenAI.

[I've Recently Learned About GPT3 - This is my Journey](Artificial Intelligence\I've Recently Learned About GPT3 - This is my Journey)

# How does it work?

The OpenAI Codex engine powers GitHub Copilot.
It was trained with a lot of source code and also natural language.

To use it, we must apply to their [waiting list](https://copilot.github.com/). The approval process is fast.

We add it as a Visual Studio Code Extension that interacts in real-time with GitHub.

# Benefits(?)

## Autofill

Copilot can predict anemic structures once we describe their accidental data.

[Code Smell 70 - Anemic Model Generators](Code Smells\Code Smell 70 - Anemic Model Generators)

They are suitable for implementative and anemic code generation.

[Code Smell 01 - Anemic Models](Code Smells\Code Smell 01 - Anemic Models)

## Bad comments to code

It converts bad comments (those that should never be present in our code) to straightforward algorithms.

We can assume that the training set was filled with bad implementative commented code.
We shouldn't rely much on the algorithm's declarative.

## Structural tests

CodePilot can generate tests on setters. These tests are coupled to implementation and fragile.

[Code Smell 52 - Fragile Tests](Code Smells\Code Smell 52 - Fragile Tests)

They test our getters, so they don't add much value to validating our system's behavior.

[Code Smell 68 - Getters](Code Smells\Code Smell 68 - Getters)

More insights [here](https://goldedem.hashnode.dev/github-co-pilot-in-a-nutshell).

# Should we worry about it?

Not now.

If you read the benefits above, most of the Copilot code belongs to the [code smell area]().

Very soon, transformers like Copilot will replace lazy and implementative programmers.

[(Most) Programmers are losing our jobs very soon](Opinion\(Most) Programmers are losing our jobs very soon)

# What should be doing right now?

We need to be cleverer than it.

We need to create great behavioral models far from implementative structural data

[The One and Only Software Design Principle](Theory\The One and Only Software Design Principle)

The problem copilot is solving right now tackles software main mistakes. Thinking of programming as just dealing with data instead of behavior.

[What is (wrong with) software?](Theory\What is (wrong with) software)

Once we decide to grow up and build serious software instead of dealing with strings and dates, we will push our jobs a few years away from this fancy robot.

Please do write me a line below with your thoughts on this.
