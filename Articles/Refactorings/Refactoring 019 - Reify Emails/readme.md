# Refactoring 019 - Reify Emails

![Refactoring 019 - Reify Emails](Refactoring%20019%20-%20Reify%20Emails.jpg)

*Sayit once and only once*

> TL;DR: Avoid duplicate email validations.

# Problems Addressed

- [Repeated email validation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md) logic in multiple places.
- Risk of inconsistent validation rules.
- Increased chance of introducing bugs.
- Difficult to maintain validation rules.
- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation

# Related Code Smells

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)
 
[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

# Steps

1. Identify where email validation logic is duplicated.
2. Create an `Email` class to encapsulate validation rules.
3. Refactor code to use the `Email` class instead of raw strings.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/1653269940ca6f9ea0618197d29eaf6f)

```java
public class Person {
    private String email;
    // Primitive Obsession

    public void setEmail(String email) {
        // Duplicated code
        if (!email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.email = email;
    }
}

public class JobApplication {
    private String applicantEmail;

    public void setApplicantEmail(String email) {
        // Duplicated code
        if (!email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.applicantEmail = email;
    }
}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/39efccf33d24bf297d200a6e9034381a)

```java
public class Email {
    // 2. Create an `Email` class to encapsulate validation rules.
    private final String value;

    public Email(String value) {
        // The rules are in a single place
        // And all objects are created valid
        if (!value.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.value = value;
    }
}

public class Person {
    private final Email email;

    public Person(Email email) {
        // 1. Identify where email validation logic is duplicated.
        // 3. Refactor code to use the `Email`
        // class instead of raw strings.
        // No validation is required
        this.email = email;
    } 
}

public class JobApplication {
    private Email applicantEmail;

    public JobApplication(Email applicantEmail) {
        this.applicantEmail = applicantEmail;
    }
}
```

# Type

[X] Semi-Automatic

# Safety

This refactoring is safe if you replace all occurrences of raw email strings with the Email class and ensure all tests pass.

# Why is the code better?

You make email validation consistent across your application. 

Since validation rules are centralized in one place, the code becomes easier to maintain. 

You also reduce the risk of bugs caused by inconsistent logic.

# Refactor with AI

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+Email+%7B%0D%0A++++%2F%2F+2.+Create+an+%60Email%60+class+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+Email%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%22Invalid+email+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+Email+email%3B%0D%0A%0D%0A++++public+Person%28Email+email%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.email+%3D+email%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+Email+applicantEmail%3B%0D%0A%0D%0A++++public+JobApplication%28Email+applicantEmail%29+%7B%0D%0A++++++++this.applicantEmail+%3D+applicantEmail%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | 

# Tags

- Encapsulation

# Related Refactorings

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)
 
[Refactoring 012 - Reify Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20012%20-%20Reify%20Associative%20Arrays/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Credits

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)