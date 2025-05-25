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