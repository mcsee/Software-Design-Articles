def calculate(mathOperand, firstArgument, secondArgument):
    return eval(f'{firstArgument} {mathOperand} {secondArgument}')

# Sample usage to multiply two numbers
result = calculate('*', 4, 6)

# Injection to remove all files
calculate('', "__import__('os').system('rm -rf *')",''))