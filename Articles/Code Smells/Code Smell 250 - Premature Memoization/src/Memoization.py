memo = {}
def factorial_with_memo(n):
    if n in memo:
        return memo[n]
    if n == 0:
        return 1
    result = n * factorial_with_memo(n-1)
    memo[n] = result
    return result
  
  # This function optimizes the computation of factorials
  # by storing previously computed values,
  # reducing redundant calculations 
  # and improving performance for large inputs.