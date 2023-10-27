def add_numbers():
    try:
        firstAddend = float(input("Enter the first number: "))
        secondAddend = float(input("Enter the second number: "))
        total = firstAddend + secondAddend
        return total
    except ValueError:
        print("Invalid input. Please enter valid numbers.")
        return None

def main():
    total = add_numbers()
    if total is not None:
        print("The sum is: {:.2f}".format(sum))

if __name__ == "__main__":
    main()
