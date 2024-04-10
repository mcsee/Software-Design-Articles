def calculate(mathOperand, firstArgument, secondArgument):
    if mathOperand == '+':
        return firstArgument + secondArgument
    elif mathOperand == '-':
        return firstArgument - secondArgument
    elif mathOperand == '*':
        return firstArgument * secondArgument
    elif mathOperand == '/':
        if secondArgument != 0:
            return firstArgument / secondArgument
        else:
            return "Error: Division by zero"
    else:
        return "Error: Invalid operation - Do not hack!"
        
# This is a quick solution but another smell
# You should avoid this kind of switches and iterate to 
# a Polymorphic Hierarchy