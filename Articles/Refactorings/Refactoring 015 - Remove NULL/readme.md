# Refactoring 015 - Remove NULL

![Refactoring 015 - Remove NULL](Refactoring%20015%20-%20Remove%20NULL.png)

*Eliminating The Billion-Dollar Mistake forever*

> TL;DR: Use the Null Object Pattern to eliminate null checks and simplify your code.

# Problems Addressed

- Frequent null checks and [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md) cluttering your code

- [Null pointer exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20260%20-%20Crowdstrike%20NULL/readme.md)

- Hard-to-read and maintain code

- Lack of extensibility

- Unnecessary complexity with excessive null checks.

- More [detail about NULL creation and regrets](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Related Code Smells

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 260 - Crowdstrike NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20260%20-%20Crowdstrike%20NULL/readme.md)

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)

[Code Smell 212 - Elvis Operator](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20212%20-%20Elvis%20Operator/readme.md)

[Code Smell 192 - Optional Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 208 - Null Island](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20208%20-%20Null%20Island/readme.md)

# Steps

These steps are a special case of [Remove IF Refactoring](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

1. Create a Null Object class that implements the same interface

2. Replace null checks with the polymorphic Null Object

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/11ff9fab5c27f29304b0b7e31ee3b71d)

```java
public class SoccerMatch {
    private Team homeTeam;
    private Team awayTeam;
    private TimeRecord regularTime;
    private TimeRecord extraTime;

    public SoccerMatch(Team homeTeam, 
                       Team awayTeam,
                       TimeRecord regularTime, 
                       TimeRecord extraTime) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.regularTime = regularTime;
        this.extraTime = extraTime;
    }

    public int totalGoals() {
        int goals = regularTime.goals();
        // You might forget this IF check 
        // resulting in a null error
        if (extraTime != null) {
            goals += extraTime.goals();
        }
        return goals;
    }
}

class TimeRecord {
    private int goals;

    public TimeRecord(int goals) {
        this.goals = goals;
    }

    public int goals() {
        return goals;
    }
}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/785aa63b08fbecb6ea243c80c3c36389)

```java
// 1. Create a Null Object class that implements the same interface

interface TimeRecord {
    // The common protocol between the real object 
    // and the Null Object
    int goals();
}

class PlayedTimeRecord implements TimeRecord {
    // This class is suitable both to be
    // a Regular Time or an Extra Time
    private int goals;

    public PlayedTimeRecord (int goals) {
        this.goals = goals;
    }

    public int goals() {
        return goals;
    }
}

class NoExtraTime implements TimeRecord {
    public int goals() {
        // They are polymorphic
        // They don't need IF checks
        return 0;
    }
}

public class SoccerMatch {
    private Team homeTeam;
    private Team awayTeam;
    private PlayedTimeRecord regularTime;
    private TimeRecord extraTime;

    public SoccerMatch(Team homeTeam, 
                       Team awayTeam,
                       PlayedTimeRecord regularTime,
                       TimeRecord extraTime) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;        
        // There's a business rule telling
        // regular time is not optional
        // Therefore is an instance of PlayedTimeRecord
        this.regularTime = regularTime;
        this.extraTime = extraTime;
    }

    public int totalGoals() {
        // 2. Replace null checks with the polymorphic Null Object
        // No Ifs 
        // No null checks
        return regularTime.goals() + extraTime.goals();
    }
}
```

*As a side note when you prompt Gemini-AI with the After version it says:*

> While the code is well-structured, there's a minor optimization opportunity. 
> The NoExtraTime class can be eliminated without compromising the code's 
> functionality.

* .. and suggests using the first version with [the billion-dollar mistake problem!](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)*

# Type

[X] Semi-Automatic

The refactoring has a semantic part that needs to find an existing NullObejct in the domain.

# Safety

This refactoring is generally safe.

You must ensure that the Null Object's behavior matches the expected behavior for real cases in your code.

The null object needs to be partially polymorphic with real ones.

In strongly typed languages, they must adhere to the same interface or belong to the same hierarchy.

# Why is the Code Better?

You eliminate null checks with [accidental IF conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md), making the code cleaner and easier to understand. 

The Null Object Pattern ensures you always work with objects, avoiding null pointer exceptions - [The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

# Limitations

# Tags

- Null

# Related Refactorings

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# See also

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Null_Object_pattern)

[Refactoring Guru](https://refactoring.guru/es/replace-conditional-with-polymorphism)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)