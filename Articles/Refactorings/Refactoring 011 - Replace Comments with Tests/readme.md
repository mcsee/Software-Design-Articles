# Refactoring 011 - Replace Comments with Tests

![Refactoring 011 - Replace Comments with Tests](Refactoring%20011%20-%20Replace%20Comments%20with%20Tests.jpg)

*Comments are dead. Tests are alive*

> TL;DR: Take your comment, compact it, and name your functions.
> Now test it and remove the comments.

# Problems Addressed 😔

- Maintainability

- Readability

# Related Code Smells 💨

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

# Context 💬

Comments often act as a placeholder for missing logic or verification.

A comment explaining "what" a method does creates passive documentation.

This documentation is detached from execution.

As the code evolves, comments rot.

They stop reflecting the truth and mislead the reader.

When you convert comments into automated tests, you create active contracts.

These contracts prove what the code actually does.

# Steps 👣

1. Take the comment of the method explaining what the function does.

2. Rename the method with the comment description (the what).

3. Create tests to verify the comments.

4. Omit irrelevant implementation details.

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/99a20b92785fa34a4dd5c32a8623e8d4) -->

```python
def multiply(a, b):
    # This function multiplies two numbers and returns the result
    # If one of the numbers is zero, the result will be zero
    # If the numbers are both positive, the result will be positive
    # If the numbers are both negative, the result will be positive
    # The multiplication is done by invoking a primitive
    return a * b

# This code has a comment that explains what the function does.
# Instead of relying on this comment
# to understand the behavior of the code,
# You can write some unit tests
# that verify the behavior of the function.
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e73306c042cbc8f200fc149d78f24173) -->

```python
def multiply(first_multiplier, second_multiplier):
    return first_multiplier * second_multiplier

class TestMultiply(unittest.TestCase):
    def test_multiply_both_positive_outcome_is_positive(self):
        result = multiply(2, 3)
        self.assertEqual(result, 6)
    def test_multiply_both_negative_outcome_is_positive(self):
        result = multiply(-2, -4)
        self.assertEqual(result, 8)
    def test_multiply_first_is_zero_outcome_is_zero(self):
        result = multiply(0, -4)
        self.assertEqual(result, 0)
    def test_multiply_second_is_zero_outcome_is_zero(self):
        result = multiply(3, 0)
        self.assertEqual(result, 0)
    def test_multiply_both_are_zero_outcome_is_zero(self):
        result = multiply(0, 0)
        self.assertEqual(result, 0)

# You define a test function called test_multiply,
# which calls the multiply function with different arguments
# and verifies that the result
# is correct using the assertEqual method.

# 1. Take the comment of the method explaining what the function does.
# 2. Rename the method with the comment description (the what).
# 3. Create tests to verify the comments.
# 4. Omit irrelevant implementation details
```

# Type 📝

[X] Semi-Automatic

You can rewrite the comment and compact it.

It isn't always an algorithmic process.

# Safety 🛡️

This isn't a safe refactor, but it increases coverage.

# Why is the Code Better? ✨

Comments lie. The code doesn't.

# How Does it Improve the Bijection? 🗺️

Comments describe intended behavior as passive text.

Tests prove behavior as executable contracts.

Your code maps directly to the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) model.

# Limitations ⚠️

You can't test private methods directly.

When a comment is on a private method, test it indirectly.

Alternatively, extract the private method into a separate object.

You can leave comments reflecting important design decisions.

# Tags 🏷️

- Comments

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Take the comment of the method explaining what the function does.2. Rename the method with the comment description (the what).3. Create tests to verify the comments.4. Omit irrelevant implementation details.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Take+the+comment+of+the+method+explaining+what+the+function+does.2.+Rename+the+method+with+the+comment+description+%28the+what%29.3.+Create+tests+to+verify+the+comments.4.+Omit+irrelevant+implementation+details.%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Take+the+comment+of+the+method+explaining+what+the+function+does.2.+Rename+the+method+with+the+comment+description+%28the+what%29.3.+Create+tests+to+verify+the+comments.4.+Omit+irrelevant+implementation+details.%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Take+the+comment+of+the+method+explaining+what+the+function+does.2.+Rename+the+method+with+the+comment+description+%28the+what%29.3.+Create+tests+to+verify+the+comments.4.+Omit+irrelevant+implementation+details.%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Take+the+comment+of+the+method+explaining+what+the+function+does.2.+Rename+the+method+with+the+comment+description+%28the+what%29.3.+Create+tests+to+verify+the+comments.4.+Omit+irrelevant+implementation+details.%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Take+the+comment+of+the+method+explaining+what+the+function+does.2.+Rename+the+method+with+the+comment+description+%28the+what%29.3.+Create+tests+to+verify+the+comments.4.+Omit+irrelevant+implementation+details.%3A+%60%60%60python%0D%0Adef+multiply%28a%2C+b%29%3A%0D%0A++++%23+This+function+multiplies+two+numbers+and+returns+the+result%0D%0A++++%23+If+one+of+the+numbers+is+zero%2C+the+result+will+be+zero%0D%0A++++%23+If+the+numbers+are+both+positive%2C+the+result+will+be+positive%0D%0A++++%23+If+the+numbers+are+both+negative%2C+the+result+will+be+positive%0D%0A++++%23+The+multiplication+is+done+by+invoking+a+primitive%0D%0A++++return+a+%2A+b%0D%0A%0D%0A%23+This+code+has+a+comment+that+explains+what+the+function+does.%0D%0A%23+Instead+of+relying+on+this+comment%0D%0A%23+to+understand+the+behavior+of+the+code%2C%0D%0A%23+You+can+write+some+unit+tests%0D%0A%23+that+verify+the+behavior+of+the+function.%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Credits 🙏

Image by [philm1310](https://pixabay.com/users/philm1310-752382/) from [Pixabay](https://pixabay.com/)

* * *

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)
