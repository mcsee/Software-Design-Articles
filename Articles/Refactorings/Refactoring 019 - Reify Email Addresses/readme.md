# Refactoring 019 - Reify Email Addresses

![Refactoring 019 - Reify Email Addresses](Refactoring%20019%20-%20Reify%20Email%20Addresses.jpg)

*Sayit once and only once*

> TL;DR: Avoid duplicate email validations.

# Problems Addressed 😔

- [Repeated email validation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md) logic in multiple places.
- Risk of inconsistent validation rules.
- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation
- [Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)
- [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Related Code Smells 💨

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)
 
[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

[Code Smell 177 - Missing Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)				     

# Steps 👣 

1. Identify where email validation logic is duplicated.
2. Create an `Email Address` class to encapsulate validation rules.
3. Refactor code to use the `Email Address` class instead of raw strings.

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/1653269940ca6f9ea0618197d29eaf6f) -->

```java
public class Person {
    private String emailAddress;
    // Primitive Obsession

    public void setEmailAddress(String emailAddress) {
        // Duplicated code
        if (!emailAddress.matches(
            "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.emailAddress = emailAddress;
    }
}

public class JobApplication {
    private String applicantEmailAddress;

    public void setApplicantEmailAddress(String emailAddress) {
        // Duplicated code
        if (!emailAddress.matches(
            "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.applicantEmailAddress = emailAddress;
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/39efccf33d24bf297d200a6e9034381a) -->

```java
public class EmailAddress {
    // 2. Create an `EmailAddress` class 
    // to encapsulate validation rules.
    private final String value;

    public EmailAddress(String value) {
        // The rules are in a single place
        // And all objects are created valid
        if (!value.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.value = value;
    }
}

public class Person {
    private final EmailAddress emailAddress;

    public Person(EmailAddress emailAddress) {
        // 1. Identify where
        // email validation logic is duplicated.
        // 3. Refactor code to use the `Email Address`
        // class instead of raw strings.
        // No validation is required
        this.emailAddress = emailAddress;
    } 
}

public class JobApplication {
    private EmailAddress applicantEmailAddress;

    public JobApplication(EmailAddress applicantEmailAddress) {
        this.applicantEmailAddress = applicantEmailAddress;
    }
}
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe if you replace all occurrences of raw email strings with the 'EmailAddress' class and ensure all tests pass.

# Why is the Code Better? ✨

You make email validation consistent across your application. 

Since validation rules are centralized in one place, the code becomes easier to maintain. 

You also reduce the risk of bugs caused by inconsistent logic.

In the real world, `Email Addresses` are [small objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md) that exist and are not strings.

The refactored code is closer to the real world [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Notice that bijection names are essential. It would help to create an `EmailAddress`, not an `Email`, since the Email should [map](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) to the actual message.

Don't let [Premature Optimizators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) tell you this solution has a performance penalty. 

They never do actual benchmarks with real world data.

# Refactor with AI

> Suggested Prompt: 1. Identify where email validation logic is duplicated.2. Create an `Email Address` class to encapsulate validation rules.3. Refactor code to use the `Email Address` class instead of raw strings

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email+Address%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email+Address%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email+Address%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email+Address%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email+Address%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email+Address%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email+Address%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email+Address%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+where+email+validation+logic+is+duplicated.2.+Create+an+%60Email+Address%60+class+to+encapsulate+validation+rules.3.+Refactor+code+to+use+the+%60Email+Address%60+class+instead+of+raw+strings%3A+%60%60%60java%0D%0Apublic+class+EmailAddress+%7B%0D%0A++++%2F%2F+2.+Create+an+%60EmailAddress%60+class+%0D%0A++++%2F%2F+to+encapsulate+validation+rules.%0D%0A++++private+final+String+value%3B%0D%0A%0D%0A++++public+EmailAddress%28String+value%29+%7B%0D%0A++++++++%2F%2F+The+rules+are+in+a+single+place%0D%0A++++++++%2F%2F+And+all+objects+are+created+valid%0D%0A++++++++if+%28%21value.matches%28%22%5E%5B%5C%5Cw.%25%2B-%5D%2B%40%5B%5C%5Cw.-%5D%2B%5C%5C.%5Ba-zA-Z%5D%7B2%2C%7D%24%22%29%29+%7B%0D%0A++++++++++++throw+new+IllegalArgumentException%28%0D%0A++++++++++++++++%22Invalid+email+address+format%22%29%3B%0D%0A++++++++%7D%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Person+%7B%0D%0A++++private+final+EmailAddress+emailAddress%3B%0D%0A%0D%0A++++public+Person%28EmailAddress+emailAddress%29+%7B%0D%0A++++++++%2F%2F+1.+Identify+where%0D%0A++++++++%2F%2F+email+validation+logic+is+duplicated.%0D%0A++++++++%2F%2F+3.+Refactor+code+to+use+the+%60Email+Address%60%0D%0A++++++++%2F%2F+class+instead+of+raw+strings.%0D%0A++++++++%2F%2F+No+validation+is+required%0D%0A++++++++this.emailAddress+%3D+emailAddress%3B%0D%0A++++%7D+%0D%0A%7D%0D%0A%0D%0Apublic+class+JobApplication+%7B%0D%0A++++private+EmailAddress+applicantEmailAddress%3B%0D%0A%0D%0A++++public+JobApplication%28EmailAddress+applicantEmailAddress%29+%7B%0D%0A++++++++this.applicantEmailAddress+%3D+applicantEmailAddress%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Encapsulation

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)
 
[Refactoring 012 - Reify Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20012%20-%20Reify%20Associative%20Arrays/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Credits 🙏
 
Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/) from [Pixabay](https://pixabay.com/)	       

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)