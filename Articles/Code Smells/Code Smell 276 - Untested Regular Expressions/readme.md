# Code Smell 276 - Untested Regular Expressions

![Code Smell 276 - Untested Regular Expressions](Code%20Smell%20276%20-%20Untested%20Regular%20Expressions.jpg)

*Regex Without Tests is Asking for Trouble - Don't be lazy. It is free with AI!*

> TL;DR: Use clear and concise regular expressions, and test them thoroughly.

# Problems

- Readability
- No test cases
- Missed edge cases
- Debugging challenges
- Unclear failures
- Hidden defects

# Solutions

1. Ask your favorite AI to write test cases
2. Break down complex regular expressions into smaller, more readable parts.
3. Check edge cases
4. Validate outputs
5. Refactor regex once you created the tests
6. Improve the [Error Messages](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

# Context

Regular expressions are powerful but tricky.

If you write a regex without tests, you're asking for unexpected errors. 

If you write a cryptic regex and skip automated testing, you could miss important cases, causing security issues or user frustration.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/311fe9e5b4509c7d0795b70e012ec248)

```java
public class PasswordValidator {
    public static boolean isValidPassword(String password) {
        return password.matches(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        // This is a cryptic Regular Expression
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/6569117489915db493b9a3f52429735d)

```java
import java.util.ArrayList;
import java.util.List;

public class PasswordValidator {
    public static List<String> validatePassword(String password) {
        List<String> errors = new ArrayList<>();

        if (password.length() < 8) {
            errors.add(
                "Password must be at least 8 characters long.");
        }
        if (!password.matches(".*[A-Z].*")) {
            errors.add(
                "Password must contain at least one uppercase letter.");
        }
        if (!password.matches(".*[a-z].*")) {
            errors.add(
                "Password must contain at least one lowercase letter.");
        }
        if (!password.matches(".*\\d.*")) {
            errors.add(
                "Password must contain at least one digit.");
        }
        if (errors.isEmpty()) {
            errors.add(
                "Password is valid.");
        }
        return errors;
        // You no longer need a Regular Expression!!
    }
}

import static org.junit.Assert.*;
import org.junit.Test;

public class PasswordValidatorTest {
    // Now you have a lot of tests
    // You can use a Regular Expression,
    // a String Validator
    // an External Library
    // Whatever you want as long as it passes the tests!

    @Test
    public void testValidPassword() {
        List<String> result = 
            PasswordValidator.validatePassword(
            "StrongPass1");
        assertEquals("Password is valid.", result.get(0));
    }

    @Test
    public void testTooShortPassword() {
        List<String> result = PasswordValidator.validatePassword(
            "Short1");
        assertTrue(result.contains(
            "Password must be at least 8 characters long."));
    }

    @Test
    public void testNoUppercase() {
        List<String> result = PasswordValidator.validatePassword(
            "nouppercase1");
        assertTrue(
            result.contains(
                "Password must contain at least one uppercase letter."));
    }

    @Test
    public void testNoLowercase() {
        List<String> result = PasswordValidator.validatePassword(
            "NOLOWERCASE1");
        assertTrue(result.contains(
            "Password must contain at least one lowercase letter."));
    }

    @Test
    public void testNoNumber() {
        List<String> result = PasswordValidator.validatePassword(
            "NoNumberPass");
        assertTrue(result.contains(
            "Password must contain at least one digit."));
    }
}
```

# Detection

[X] Automatic 

You can detect when your regex is uncovered by changing it to fail and running all your tests.

If your validation returns "false" without user-friendly explanations, it's a clear sign you need to refactor it and improve the feedback.

# Tags

- Testing

# Level

[X] Beginner

# AI Generation

AI can generate regular expressions but often fails to provide helpful error messages. 

Without proper instructions, AI-generated validators may fail to guide users through fixing their inputs.

# AI Detection

AI can detect basic regular expression patterns and missing feedback with clear prompting. 

it might not automatically create detailed test cases or descriptions unless asked specifically.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Cover+this+regex+with+tests+and+modify+the+function+to+provide+more+detailed+information+on+why+it+failed%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Cover+this+regex+with+tests+and+modify+the+function+to+provide+more+detailed+information+on+why+it+failed%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=Cover+this+regex+with+tests+and+modify+the+function+to+provide+more+detailed+information+on+why+it+failed%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Cover+this+regex+with+tests+and+modify+the+function+to+provide+more+detailed+information+on+why+it+failed%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Cover+this+regex+with+tests+and+modify+the+function+to+provide+more+detailed+information+on+why+it+failed%3A+%60%60%60java%0D%0Apublic+class+PasswordValidator+%7B%0D%0A++++public+static+boolean+isValidPassword%28String+password%29+%7B%0D%0A++++++++return+password.matches%28%0D%0A++++++++++++%22%5E%28%3F%3D.%2A%5Ba-z%5D%29%28%3F%3D.%2A%5BA-Z%5D%29%28%3F%3D.%2A%5C%5Cd%29%5Ba-zA-Z%5C%5Cd%5D%7B8%2C%7D%24%22%29%3B%0D%0A++++++++%2F%2F+This+is+a+cryptic+Regular+Expression%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | 

# Conclusion

A regular expression without clear feedback is user-unfriendly and prone to errors. 

It would help if you described why they failed and wrote thorough tests to ensure your regex works as expected.

# Relations

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

[Code Smell 185 - Evil Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20185%20-%20Evil%20Regular%20Expressions/readme.md) 

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [rc.xyz NFT gallery](https://unsplash.com/@moneyphotos) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-metal-plate-with-numbers-on-it-j7mGBT2hyM8)  
  
* * *

> Feedback is the breakfast of champions. 

_Ken Blanchard_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)