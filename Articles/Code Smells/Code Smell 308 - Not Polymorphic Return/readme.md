# Code Smell 308 - Not Polymorphic Return

![Code Smell 308 - Not Polymorphic Return](Code%20Smell%20308%20-%20Not%20Polymorphic%20Return.jpg)

*When your methods return generic types, you break the call chain*

> TL;DR: Avoid methods that return Object, Any, or null instead of specific types. Make them fully polymorphic

# Problems 😔

- Missed Polymorphism
- Tight Coupling
- Excessive [Null Checks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)
- Confusing Returns
- Fragile Code
- Hard to Test
- Lost type safety
- [Ifs Pollution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)
- Broken polymorphism
- Runtime errors
- Unclear contracts
- Testing difficulties
- Poor maintainability

# Solutions 😃

1. Return [Polymorphic Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md)
2. Use [Null Object Pattern](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)
3. Avoid Returning *any*
4. Favor Exceptions for Errors
5. Rename for Clarity
6. Return specific types or Interfaces
7. Use proper abstractions
8. Create meaningful objects

# Refactorings ⚙️

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Context 💬

When you write a method that can return many types, such as an *any* or a *[null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)*, you lose polymorphism.

Polymorphism lets you treat objects that share an interface or a base type interchangeably, simplifying your code.

Returning null forces your callers to write extra checks and handle special cases, which clutters the code and increases coupling.

Returning any (or a type that erases actual type information) makes it harder to understand what the method actually returns, causing bugs and confusion.

You force callers to perform type checking and [casting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md).

This breaks the fundamental principle of polymorphism where objects should behave according to their [contracts](https://en.wikipedia.org/wiki/Design_by_contract).

Methods should return specific types that clearly communicate their intent and allow the compiler to verify correctness at compile time.

## Remember

> Two methods are polymorphic if their signatures are the same, the arguments are polymorphic, AND the return is also **polymorphic**.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/5bae947aa6410789541e18ab9f4e24b8) -->

```java
public class DatabaseConnection {
    public Object execute(String sql) {
        if (sql.startsWith("SELECT")) {
            return new ResultSet();
        } else if (sql.startsWith("INSERT")) {
            return Integer.valueOf(42);
        } else if (sql.startsWith("UPDATE")) {
            return Boolean.TRUE;
        }
        return null;
        // The billion dollar mistake
    }
}

public class QueryHandler {
    public void handle(String sql, DatabaseConnection db) {
        Object result = db.execute(sql);
        // The caller needs to be aware of many different types
        if (result instanceof ResultSet) {
            System.out.println("Fetched rows");
        } else if (result instanceof Integer) {
            System.out.println("Inserted " + result);
        } else if (result instanceof Boolean) {
            System.out.println("Updated " + result);
        } else {
            System.out.println("Unknown result");
        }
    }
}

// This second class has a method execute()
// which is NOT polymorphic since it returns 
// another types
public class NonRelationalDatabaseConnection {
    public Object execute(String query) {
        if (query.startsWith("FIND")) {
            return new Document();
        } else if (query.startsWith("INSERT")) {
            return Integer.valueOf(1);
        } else if (query.startsWith("UPDATE")) {
            return Boolean.TRUE;
        }
        return null; // The billion dollar mistake
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7f63810a37f827458c922f513daec329) -->

```java
interface QueryResult {
    void display();
}

class SelectResult implements QueryResult {
    public void display() {
        System.out.println("Fetched rows");
    }
}

class InsertResult implements QueryResult {
    private final int count;
    InsertResult(int count) { this.count = count; }
    public void display() {
        System.out.println("Inserted " + count);
    }
}

class UpdateResult implements QueryResult {
    private final boolean ok;
    UpdateResult(boolean ok) { this.ok = ok; }
    public void display() {
        System.out.println("Updated " + ok);
    }
}

class DocumentResult implements QueryResult {
    public void display() {
        System.out.println("Fetched documents");
    }
}

interface DatabaseConnection {
    QueryResult execute(String query);
}

public class RelationalDatabaseConnection 
  implements DatabaseConnection {
    public QueryResult execute(String sql) {
        // execute() is now polymorphic and returns a QueryResult
        if (sql.startsWith("SELECT")) {
            return new SelectResult();
        } else if (sql.startsWith("INSERT")) {
            return new InsertResult(42);
        } else if (sql.startsWith("UPDATE")) {
            return new UpdateResult(true);
        }
        // You remove null
        throw new IllegalArgumentException("Unknown SQL");
    }
}

public class NonRelationalDatabaseConnection 
  implements DatabaseConnection {
    public QueryResult execute(String query) {
        // execute() is now polymorphic and returns a QueryResult
        if (query.startsWith("FIND")) {
            return new DocumentResult();
        } else if (query.startsWith("INSERT")) {
            return new InsertResult(1);
        } else if (query.startsWith("UPDATE")) {
            return new UpdateResult(true);
        }
        throw new IllegalArgumentException("Unknown query");
    }
}

public class QueryHandler {
    public void handle(String sql, DatabaseConnection db) {
        QueryResult result = db.execute(sql);
        result.display();
    }
}
```

# Detection 🔍

[X] Semi-Automatic

Look for methods with return types like Object, Any, void*, or frequent null returns.

Also check for scattered if-null checks or type checks after method calls.

Tooling and static analyzers sometimes warn about methods returning any or null without documentation.

Search for instanceof checks or type casting after method calls.

Watch for methods that return different types based on parameters or their internal state.

# Exceptions 🛑

- Generic collection frameworks

- Serialization libraries

# Tags 🏷️

- Polymorphism

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

When a method always returns a type that aligns with the concept it represents, programmers don't need special cases.

Breaking this [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by returning any or null creates ambiguity.

The calling code must guess the actual type or deal with nulls, increasing bugs and maintenance cost.

[Real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) objects have specific types and behaviors.

# AI Generation 🤖

AI generators sometimes produce methods returning any or null because they prioritize flexibility or simplicity over strong typing and polymorphism.

# AI Detection 🧲

AI tools can fix this smell when given instructions to enforce typed returns and suggest [Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) or Optional patterns.

They can refactor null returns into polymorphic return hierarchies automatically if guided.

Simple prompts about "improving return types" often help AI suggest better alternatives.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace methods returning Object, Any, or null with specific return types. Create proper abstractions and null object patterns. Ensure type safety and clear contracts

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) | [ChatGPT](https://chat.openai.com/?q=Replace+methods+returning+Object%2C+Any%2C+or+null+with+specific+return+types.+Create+proper+abstractions+and+null+object+patterns.+Ensure+type+safety+and+clear+contracts%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) | [Claude](https://claude.ai/new?q=Replace+methods+returning+Object%2C+Any%2C+or+null+with+specific+return+types.+Create+proper+abstractions+and+null+object+patterns.+Ensure+type+safety+and+clear+contracts%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) | [Perplexity](https://www.perplexity.ai/?q=Replace+methods+returning+Object%2C+Any%2C+or+null+with+specific+return+types.+Create+proper+abstractions+and+null+object+patterns.+Ensure+type+safety+and+clear+contracts%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+methods+returning+Object%2C+Any%2C+or+null+with+specific+return+types.+Create+proper+abstractions+and+null+object+patterns.+Ensure+type+safety+and+clear+contracts%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) | [You](https://you.com/search?q=Replace+methods+returning+Object%2C+Any%2C+or+null+with+specific+return+types.+Create+proper+abstractions+and+null+object+patterns.+Ensure+type+safety+and+clear+contracts%3A+%60%60%60java%0D%0Apublic+class+DatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+sql%29+%7B%0D%0A++++++++if+%28sql.startsWith%28%22SELECT%22%29%29+%7B%0D%0A++++++++++++return+new+ResultSet%28%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22INSERT%22%29%29+%7B%0D%0A++++++++++++return+Integer.valueOf%2842%29%3B%0D%0A++++++++%7D+else+if+%28sql.startsWith%28%22UPDATE%22%29%29+%7B%0D%0A++++++++++++return+Boolean.TRUE%3B%0D%0A++++++++%7D%0D%0A++++++++return+null%3B%0D%0A++++++++%2F%2F+The+billion+dollar+mistake%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+QueryHandler+%7B%0D%0A++++public+void+handle%28String+sql%2C+DatabaseConnection+db%29+%7B%0D%0A++++++++Object+result+%3D+db.execute%28sql%29%3B%0D%0A++++++++%2F%2F+The+caller+needs+to+be+aware+of+many+different+types%0D%0A++++++++if+%28result+instanceof+ResultSet%29+%7B%0D%0A++++++++++++System.out.println%28%22Fetched+rows%22%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Integer%29+%7B%0D%0A++++++++++++System.out.println%28%22Inserted+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+if+%28result+instanceof+Boolean%29+%7B%0D%0A++++++++++++System.out.println%28%22Updated+%22+%2B+result%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++System.out.println%28%22Unknown+result%22%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+second+class+has+a+method+execute%28%29%0D%0A%2F%2F+which+is+NOT+polymorphic+since+it+returns+%0D%0A%2F%2F+another+types%0D%0Apublic+class+NonRelationalDatabaseConnection+%7B%0D%0A++++public+Object+execute%28String+qu) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Methods should return specific types that clearly communicate their purpose and enable compile-time verification.

When you replace non-polymorphic returns with proper abstractions, you create safer, more maintainable code that expresses its intent clearly.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 45 - Not Polymorphic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

# More Information 📕

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[Design by contract](https://en.wikipedia.org/wiki/Design_by_contract)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Randy Fath](https://unsplash.com/@randyfath) on [Unsplash](https://unsplash.com/photos/selective-focus-photography-of-chess-pieces-G1yhU1Ej-9A)

* * *

> Return the right type, always.

_Brian Goetz_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)