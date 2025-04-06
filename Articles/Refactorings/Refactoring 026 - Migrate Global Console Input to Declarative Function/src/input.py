n = int(input("Enter a positive integer: "))
# You need to make accidental castings 
# And deal with obscure data types valitaciones
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