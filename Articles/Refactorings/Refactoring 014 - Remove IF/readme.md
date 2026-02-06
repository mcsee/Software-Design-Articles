# Refactoring 014 - Remove IF
            
![Refactoring 014 - Remove IF](Refactoring%20014%20-%20Remove%20IF.jpg)

*The first instruction you learned should be the least you use*

> TL;DR: Remove all your Accidental IF-sentences

# Problems Addressed 😔

- Code Duplication

- Possible Typos and defects

# Related Code Smells 💨

[Code Smell 07 - Boolean Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2007%20-%20Boolean%20Variables/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 133 - Hardcoded IF Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions/readme.md)

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

[Code Smell 145 - Short Circuit Hack](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20145%20-%20Short%20Circuit%20Hack/readme.md)

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 45 - Not Polymorphic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md)

# Context 💬

The if statement is often the first control structure you learn, but it is also one of the most abused. 

When logic is scattered across multiple conditional branches, you create Accidental Complexity. 

These "Accidental IFs" usually signal a missing abstraction in our domain model, forcing the caller to check the type or state of an object before deciding how to interact with it.

By replacing these branches with Polymorphic Message Sends, you delegate the decision-making to the objects themselves. 

This aligns with the Open/Closed Principle: you can add new behaviors by creating new classes rather than modifying existing, fragile conditional logic. 

The result is a system that is easier to extend, less prone to "Stairs Code" or "Arrow Code," and much closer to a true object-oriented design.

# Steps 👣 

1. Find or Create a Polymorphic Hierarchy

2. Move the Body of Each IF to the Corresponding Abstraction

3. Name the Abstractions

4. Name the Method

5. Replace if Statements with Polymorphic Message Sends

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/ffba17263f40053ed57698d0880b942c) -->

```java
public String handleMicrophoneState(String state) {
    if (state.equals("off")) {
        return "Microphone is off";
    } else {
        return "Microphone is on";
    }
}

/* The constant representing the 'off' state is
duplicated throughout the code, 
increasing the risk of typos and spelling mistakes. 
The "else" condition doesn't explicitly check for the 'on' state;
it implicitly handles any state that is 'not off'. 
This approach leads to repetition of the IF condition
wherever the state needs handling, 
exposing internal representation and violating encapsulation.
The algorithm is not open for extension and closed for modification,
meaning that adding a new state 
will require changes in multiple places in the code. */
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2c97cd57dc9e98c877e91fcb7ed3191c) -->

```java
// Step 1: Find or Create a Polymorphic Hierarchy

abstract class MicrophoneState { }
final class On extends MicrophoneState { }
final class Off extends MicrophoneState { }

// Step 2: Move the Body of Each IF to the Corresponding Abstraction

abstract class MicrophoneState {
    public abstract String polymorphicMethodFromIf();
}

final class On extends MicrophoneState {
    @Override
    public String polymorphicMethodFromIf() {
        return "Microphone is on";
    }
}

final class Off extends MicrophoneState {
    @Override
    public String polymorphicMethodFromIf() {
        return "Microphone is off";
    }
}

// Step 3: Name the Abstractions

abstract class MicrophoneState {}
final class MicrophoneStateOn extends MicrophoneState {}
final class MicrophoneStateOff extends MicrophoneState {}

// Step 4: Name the Method

abstract class MicrophoneState {
   public abstract String handle();
}

final class MicrophoneStateOn extends MicrophoneState {
    @Override
    String handle() {
        return "Microphone is on";
    }
}

final class MicrophoneStateOff extends MicrophoneState {
    @Override
    String handle() {
        return "Microphone is off";
    }
}

// Step 5: Replace if Statements with Polymorphic Message Sends

 public String handleMicrophoneState(String state) {
        Map<String, MicrophoneState> states = new HashMap<>();
        states.put("muted", new Muted());
        states.put("recording", new Recording());
        states.put("idle", new Idle());

        MicrophoneState microphoneState = 
            states.getOrDefault(state, new NullMicrophoneState());
        return microphoneState.handle();
    }
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

Most steps are mechanic. This is a pretty safe refactoring

# Why is the Code Better? ✨

The refactored code follows the open/closed principle and favors polymorphism instead of using IFs

# Limitations ⚠️

You should only apply it to [**Accidental IFs**](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md).

Leave the business rules as **"domain ifs"** and don't apply this refactoring

# Tags 🏷️

- IFs

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# See also 📚

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits 🙏

Image by [Renuagra](https://pixabay.com/users/renuagra-5667962/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)