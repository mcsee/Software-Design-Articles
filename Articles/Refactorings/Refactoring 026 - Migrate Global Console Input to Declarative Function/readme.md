# Refactoring 026 - Migrate Global Console Input to Declarative Function

![Refactoring 026 - Migrate Global Console Input to Declarative Function](Refactoring%20026%20-%20Migrate%20Global%20Console%20Input%20to%20Declarative%20Function.jpg)

*Transform manual hard-coded inputs into testable functions*

> TL;DR: Extract input logic into separate functions to make your code testable, with regressions and more maintainable.

# Problems Addressed 😔

- [Hard-coded](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions/readme.md) inputs
- Testing difficulty
- Poor reusability
- Hidden dependencies
- Rigid and [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) implementation
- Untestable code
- Unnecessary input validation
- Hardcoded values
- [Console side effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20235%20-%20Console%20Side%20Effects/readme.md)
- Poor regression

# Related Code Smells 💨

[Code Smell 186 - Hardcoded Business Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions/readme.md)

[Code Smell 235 - Console Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20235%20-%20Console%20Side%20Effects/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

# Steps 👣

1. Identify code that uses direct *input()* statements
2. Create a new function with a [meaningful name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)
3. Move input logic into the function with parameter options
4. Add external validation and error handling
5. Create unit tests for the new function

(If you follow [Test-Driven Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md), the step 5 becomes step 0)

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/71d5117eaab5e21ec580ee035e8d1f5d) -->

```python
n = int(input("Enter a positive integer: "))
# You need to make accidental castings 
# And deal with obscure data types validations
# which are a distraction for new programming students
if n <= 0:
    print("Please enter a positive integer.")
else: 
    print(f"Prime factors of {n}:")
    i = 2
    while i * i <= n:
        if n % i:
            i += 1
        else:
            n //= i
            print(i)
            # You use global resources like the console
            # And your code gets coupled from day one
    if n > 1:
        print(n)
# This example mixes data input and validation
# With algorithmic reasoning
# Violating the "separation of concerns" principle
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/37a76d8fdca330b499a245ba641c7884) -->

```python
def prime_factors(n):
    i = 2
    factors = []
    while i * i <= n:
        if n % i:
            i += 1
        else:
            n //= i
            factors.append(i)
    if n > 1:
        factors.append(n)
    return factors

# Step 1: Identify code that uses direct input() statements
# Step 2: Create a new function with a meaningful name
def prompt_positive_integer(prompt="Enter a positive integer: "):
  # Step 3: Move input logic into the function
  # with parameter options
  try:
      value = int(input(prompt))
      # Step 4: Add validation and error handling
      if value <= 0:
          raise ValueError("Number must be positive")
      return value
  except ValueError as e:
      if str(e) == "Number must be positive":
          raise
      raise ValueError("Invalid input. Please enter a number.")

def calculate_and_display_factors(number=None):
  try:
      if number is None:
          number = prompt_positive_integer()
      factors = prime_factors(number)
      print(f"Prime factors of {number}:")
      for factor in factors:
          print(factor)
      return factors
  except ValueError as e:
      print(f"Error: {e}")
      return None

# Step 5: Create unit tests for the new function
import unittest
from unittest.mock import patch

class TestPrimeFactors(unittest.TestCase):
  def test_prime_factors_of_12(self):
      self.assertEqual(prime_factors(12), [2, 2, 3])
        
  def test_prime_factors_of_13(self):
      self.assertEqual(prime_factors(13), [13])
        
  def test_prime_factors_of_20(self):
      self.assertEqual(prime_factors(20), [2, 2, 5])
        
  def test_prime_factors_of_1(self):
      self.assertEqual(prime_factors(1), [])

class TestInputFunction(unittest.TestCase):
  @patch('builtins.input', return_value='15')
  def test_get_positive_integer_valid(self, mock_input):
      self.assertEqual(get_positive_integer(), 15)
      
  @patch('builtins.input', return_value='0')
  def test_get_positive_integer_zero(self, mock_input):
      with self.assertRaises(ValueError):
          get_positive_integer()
            
  @patch('builtins.input', return_value='-5')
  def test_get_positive_integer_negative(self, mock_input):
      with self.assertRaises(ValueError):
          get_positive_integer()
            
  @patch('builtins.input', return_value='abc')
  def test_get_positive_integer_not_number(self, mock_input):
      with self.assertRaises(ValueError):
          get_positive_integer()
            
  @patch('builtins.input', return_value='42')
  def test_calculate_with_input(self, mock_input):
      with patch('builtins.print') as mock_print:
          result = calculate_and_display_factors()
          self.assertEqual(result, [2, 3, 7])
            
  def test_calculate_with_argument(self):
      with patch('builtins.print') as mock_print:
          result = calculate_and_display_factors(30)
          self.assertEqual(result, [2, 3, 5])
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe but requires careful testing.

Moving from direct input to function calls maintains the same behavior while improving structure.

Adding validation makes the code safer by preventing invalid inputs.

Each step can be tested independently, reducing the risk of introducing bugs and ensuring you have regression on previously tested inputs.

# Why is the Code Better? ✨

You can test it without manual input by passing arguments directly to ensure regression of previous cases.

You can reuse the reified functions across your codebase.

You get clear error messages with proper exception handling.

You separate UI logic (getting input) from business logic (running the algorithm).

You make the code more maintainable by following the single responsibility principle.

# How Does it Improve the Bijection? 🗺️

This refactoring creates a stronger bijection between the [real world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and your code by creating distinct functions that map to real-world actions (getting input vs. processing data)

You also add validation that enforces real-world constraints (for example, positive integers only)

In the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), it is essential to separate concerns that match actual domain boundaries.

The closer your code matches real-world concepts and constraints, the fewer bugs and surprises you'll encounter.

Dealing with input validation and modeling algorithms following real-world business rules are very different issues, and you should not mix them.

# Refactor with AI 🤖

AI can help identify input calls throughout larger codebases and suggest appropriate function signatures and validation rules.

> Suggested Prompt: 1. Identify code that uses direct *input()* statements 2. Create a new function with a meaningful name 3. Move input logic into the function with parameter options 4. Add external validation and error handling 5. Create unit tests for the new function

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+code+that+uses+direct+%2Ainput%28%29%2A+statements+2.+Create+a+new+function+with+a+meaningful+name+3.+Move+input+logic+into+the+function+with+parameter+options+4.+Add+external+validation+and+error+handling+5.+Create+unit+tests+for+the+new+function%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+code+that+uses+direct+%2Ainput%28%29%2A+statements+2.+Create+a+new+function+with+a+meaningful+name+3.+Move+input+logic+into+the+function+with+parameter+options+4.+Add+external+validation+and+error+handling+5.+Create+unit+tests+for+the+new+function%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+code+that+uses+direct+%2Ainput%28%29%2A+statements+2.+Create+a+new+function+with+a+meaningful+name+3.+Move+input+logic+into+the+function+with+parameter+options+4.+Add+external+validation+and+error+handling+5.+Create+unit+tests+for+the+new+function%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+code+that+uses+direct+%2Ainput%28%29%2A+statements+2.+Create+a+new+function+with+a+meaningful+name+3.+Move+input+logic+into+the+function+with+parameter+options+4.+Add+external+validation+and+error+handling+5.+Create+unit+tests+for+the+new+function%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+code+that+uses+direct+%2Ainput%28%29%2A+statements+2.+Create+a+new+function+with+a+meaningful+name+3.+Move+input+logic+into+the+function+with+parameter+options+4.+Add+external+validation+and+error+handling+5.+Create+unit+tests+for+the+new+function%3A+%60%60%60python%0D%0An+%3D+int%28input%28%22Enter+a+positive+integer%3A+%22%29%29%0D%0A%23+You+need+to+make+accidental+castings+%0D%0A%23+And+deal+with+obscure+data+types+validations%0D%0A%23+which+are+a+distraction+for+new+programming+students%0D%0Aif+n+%3C%3D+0%3A%0D%0A++++print%28%22Please+enter+a+positive+integer.%22%29%0D%0Aelse%3A+%0D%0A++++print%28f%22Prime+factors+of+%7Bn%7D%3A%22%29%0D%0A++++i+%3D+2%0D%0A++++while+i+%2A+i+%3C%3D+n%3A%0D%0A++++++++if+n+%25+i%3A%0D%0A++++++++++++i+%2B%3D+1%0D%0A++++++++else%3A%0D%0A++++++++++++n+%2F%2F%3D+i%0D%0A++++++++++++print%28i%29%0D%0A++++++++++++%23+You+use+global+resources+like+the+console%0D%0A++++++++++++%23+And+your+code+gets+coupled+from+day+one%0D%0A++++if+n+%3E+1%3A%0D%0A++++++++print%28n%29%0D%0A%23+This+example+mixes+data+input+and+validation%0D%0A%23+With+algorithmic+reasoning%0D%0A%23+Violating+the+%22separation+of+concerns%22+principle%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Coupling

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Credits 🙏

Image by [Spektrum78](https://pixabay.com/users/spektrum78-481166/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)