# Refactoring 011 - Replace Comments with Tests
            
![Refactoring 011 - Replace Comments with Tests](Refactoring%20011%20-%20Replace%20Comments%20with%20Tests.jpg)

*Comments are dead. Tests are alive*

> TL;DR: Take your comment, compact it, and name your functions. Now test it and remove the comments.

# Problems Addressed

- Maintainability

- Readability

# Related Code Smells

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

# Steps

1. Take the comment of the method explaining what the function does.

2. Rename the method with the comment description (the what).

3. Create tests to verify the comments. 

4. Omit irrelevant implementation details.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/99a20b92785fa34a4dd5c32a8623e8d4)

```python
def multiply(a, b):
    # This function multiplies two numbers and returns the result
    # If one of the numbers is zero, the result will be zero
    # If the number are both positive, the result will be positive
    # If the number are both negative, the result will be positive
    # The multiplication is done by invoking a primitive
    return a * b

# This code has a comment that explains what the function does.
# Instead of relying on this comment 
# to understand the behavior of the code,
# You can write some unit tests that verify the behavior of the function.
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/e73306c042cbc8f200fc149d78f24173)

```python
def multiply(first_multiplier, second_multiplier):
    return first_multiplier * second_multiplier
    
class TestMultiply(unittest.TestCase):
    def test_multiply_both_possitive_outcome_is_possitive(self):
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
# and verifies that the result is correct using the assertEqual method.

# 1. Take the comment of the method explaining what the function does.
# 2. Rename the method with the comment description (the what).
# 3. Create tests to verify the comments. 
# 4. Omit irrelevant implementation details
```

# Type

[X] Semi-Automatic

We can rewrite the comment and compact it, but it is not always in an algorithmic way.

# Safety

This is not a safe refactor but it increases coverage.

# Why code is better?

Comments lie. The code doesn't.

# Limitations

We cannot [test private methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md).

In the unlikely event that we need to replace a comment on a private method, we should test it indirectly or extract it into [another object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md).

We can leave comments reflecting important design decisions.

# Tags

- Comments

# Related Refactorings

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Credits

Image by [philm1310](https://pixabay.com/users/philm1310-752382/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles//readme.md)