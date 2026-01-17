# Refactoring 036 - Replace String Concatenations with Text Blocks

![Refactoring 036 - Replace String Concatenations with Text Blocks](Refactoring%20036%20-%20Replace%20String%20Concatenations%20with%20Text%20Blocks.jpg)

*Replace messy string concatenation with clean, readable text blocks*

> TL;DR: You can eliminate verbose string concatenation and escape sequences by using text blocks for multi-line content.

# Problems Addressed 😔

- Poor code readability
- Excessive escape sequences
- String concatenation complexity
- Maintenance difficulties
- Code verbosity
- Translation Problems
- Indentation issues
- Complex formatting
- No, Speed is seldom a real problem unless you are a [premature optimizator](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Related Code Smells 💨

[Code Smell 295 - String Concatenation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20295%20-%20String%20Concatenation/readme.md)

[Code Smell 04 - String Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2004%20-%20String%20Abusers/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 236 - Unwrapped Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20236%20-%20Unwrapped%20Lines/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 243 - Concatenated Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20243%20-%20Concatenated%20Properties/readme.md)

# Steps 👣

1. Identify multi-line string concatenations or strings with excessive escape sequences
2. Replace opening quote and concatenation operators with triple quotes (""")
3. Remove escape sequences for quotes and newlines
4. Adjust indentation to match your code style
5. Add .strip() for single-line regex patterns or when trailing newlines cause issues

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/e8e9c14ecc8a9782c9af326f30cbdd61) -->

```java
public class QueryBuilder {
    public String buildEmployeeQuery() {
        String sql = "SELECT emp.employee_id, " +
                     "emp.first_name, emp.last_name, " +
                     "       dept.department_name, " +
                     "emp.salary " +
                     "FROM employees emp " +
                     "JOIN departments dept ON " +
                     "emp.department_id = " +
                     "dept.department_id " +
                     "WHERE emp.salary > ? " +
                     "  AND dept.location = ? " +
                     "ORDER BY emp.salary DESC";
        return sql;
    }
    
    public String buildJsonPayload(String name, int age) {
        String json = "{\n" +
                      "  \"name\": \"" + name + "\",\n" +
                      "  \"age\": " + age + ",\n" +
                      "  \"address\": {\n" +
                      "    \"street\": " +
                      "\"123 Main St\",\n" +
                      "    \"city\": \"New York\"\n" +
                      "  }\n" +
                      "}";
        return json;
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/620b031e05ace82bd594824109821fa9) -->

```java
public class QueryBuilder {
    public String buildEmployeeQuery() {
        // 1. Identify multi-line string concatenations or strings 
        // with excessive escape sequences
        // 2. Replace opening quote and concatenation operators 
        // with triple quotes (""")
        // 3. Remove escape sequences for quotes and newlines
        // 4. Adjust indentation to match your code style
        // 5. Add .strip() for single-line regex patterns or
        // when trailing newlines cause issues
        // pro tip: If you put a known prefix 
        // after the string delimiter
        // many IDEs will adjust the syntax highlighter and linter
        // in this case SQL
        String sql = """SQL
            SELECT emp.employee_id, emp.first_name, 
                   emp.last_name,
                   dept.department_name, emp.salary
            FROM employees emp
            JOIN departments dept ON 
                 emp.department_id = dept.department_id
            WHERE emp.salary > ?
              AND dept.location = ?
            ORDER BY emp.salary DESC
            """;
        return sql;
    }
    
    public String buildJsonPayload(String name, int age) {
        // 1. Identified concatenation with escape sequences
        // 2. Replaced with text block using """
        // 3. Removed \" and \n escapes
        // 4. Preserved natural indentation
        // 5. No .strip() needed here
        // pro tip: If you put a known prefix 
        // after the string delimiter
        // many IDEs will adjust the syntax highlighter and linter
        // in this case json5        
        String json = """json5
            {
              "name": "%s",
              "age": %d,
              "address": {
                "street": "123 Main St",
                "city": "New York"
              }
            }
            """.formatted(name, age);
        return json;
    }
}
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe.

It doesn't change the runtime behavior of strings; it only cleans up syntax and formatting.

You follow compilation rules carefully to avoid errors.

# Why is the Code Better? ✨

You reduce code noise caused by concatenations and escape sequences.

The multi-line strings become easier to read and maintain. Indentation and formatting are preserved without manual adjustments, making your code more natural and less error-prone.

How Does it Improve the Bijection? 🗺️

You make the code closer to the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) representation of the string content, preserving layout and format as seen by the developer.

This enhances the [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) mapping between intent and code, minimizing translation errors from concept to implementation.

# Limitations ⚠️

Some languages still lack multi-line string mechanisms.

Examples of languages with full support:

| Language   | Feature                         | Syntax       | Docs |
|------------|---------------------------------|--------------|------|
| Java       | Text Blocks                     | `"""`        | [JEP 378](https://openjdk.org/jeps/378) |
| Kotlin     | Raw Strings                     | `"""`        | [Kotlin Docs](https://kotlinlang.org/docs/strings.html) |
| Python     | Triple-Quoted Strings           | `"""` / `'''` | [Python Docs](https://docs.python.org/3/reference/lexical_analysis.html) |
| JavaScript | Template Literals               | `` ` ` ``    | [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) |
| Go         | Raw Strings                     | `` ` ` ``    | [Go Spec](https://go.dev/ref/spec#String_literals) |
| Swift      | Multiline Strings               | `"""`        | [Swift Docs](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters) |
| C#         | Raw String Literals             | `"""`        | [C# Docs](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/#raw-string-literals) |
| Ruby       | Heredocs                        | `<<EOF`      | [Ruby Docs](https://ruby-doc.org/core/doc/syntax/literals_rdoc.html) |
| PHP        | Heredoc / Nowdoc                | `<<<`        | [PHP Docs](https://www.php.net/manual/en/language.types.string.php) |
| Scala      | Multiline Strings               | `"""`        | [Scala 3 Docs](https://docs.scala-lang.org/scala3/reference/changed-features/multiline-strings.html) |

# Tags 🏷️

- Standards

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 025 - Decompose Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20025%20-%20Decompose%20Regular%20Expressions/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify multi-line string concatenations or strings with excessive escape sequences2. Replace opening quote and concatenation operators with triple quotes (""")3. Remove escape sequences for quotes and newlines

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+multi-line+string+concatenations+or+strings+with+excessive+escape+sequences2.+Replace+opening+quote+and+concatenation+operators+with+triple+quotes+%28%22%22%22%293.+Remove+escape+sequences+for+quotes+and+newlines%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+multi-line+string+concatenations+or+strings+with+excessive+escape+sequences2.+Replace+opening+quote+and+concatenation+operators+with+triple+quotes+%28%22%22%22%293.+Remove+escape+sequences+for+quotes+and+newlines%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+multi-line+string+concatenations+or+strings+with+excessive+escape+sequences2.+Replace+opening+quote+and+concatenation+operators+with+triple+quotes+%28%22%22%22%293.+Remove+escape+sequences+for+quotes+and+newlines%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+multi-line+string+concatenations+or+strings+with+excessive+escape+sequences2.+Replace+opening+quote+and+concatenation+operators+with+triple+quotes+%28%22%22%22%293.+Remove+escape+sequences+for+quotes+and+newlines%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+multi-line+string+concatenations+or+strings+with+excessive+escape+sequences2.+Replace+opening+quote+and+concatenation+operators+with+triple+quotes+%28%22%22%22%293.+Remove+escape+sequences+for+quotes+and+newlines%3A+%60%60%60java%0D%0Apublic+class+QueryBuilder+%7B%0D%0A++++public+String+buildEmployeeQuery%28%29+%7B%0D%0A++++++++String+sql+%3D+%22SELECT+emp.employee_id%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.first_name%2C+emp.last_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22+++++++dept.department_name%2C+%22+%2B%0D%0A+++++++++++++++++++++%22emp.salary+%22+%2B%0D%0A+++++++++++++++++++++%22FROM+employees+emp+%22+%2B%0D%0A+++++++++++++++++++++%22JOIN+departments+dept+ON+%22+%2B%0D%0A+++++++++++++++++++++%22emp.department_id+%3D+%22+%2B%0D%0A+++++++++++++++++++++%22dept.department_id+%22+%2B%0D%0A+++++++++++++++++++++%22WHERE+emp.salary+%3E+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22++AND+dept.location+%3D+%3F+%22+%2B%0D%0A+++++++++++++++++++++%22ORDER+BY+emp.salary+DESC%22%3B%0D%0A++++++++return+sql%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+String+buildJsonPayload%28String+name%2C+int+age%29+%7B%0D%0A++++++++String+json+%3D+%22%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22name%5C%22%3A+%5C%22%22+%2B+name+%2B+%22%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22age%5C%22%3A+%22+%2B+age+%2B+%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%5C%22address%5C%22%3A+%7B%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22street%5C%22%3A+%22+%2B%0D%0A++++++++++++++++++++++%22%5C%22123+Main+St%5C%22%2C%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++++%5C%22city%5C%22%3A+%5C%22New+York%5C%22%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22++%7D%5Cn%22+%2B%0D%0A++++++++++++++++++++++%22%7D%22%3B%0D%0A++++++++return+json%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Java sdk](https://openjdk.org/jeps/378)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)