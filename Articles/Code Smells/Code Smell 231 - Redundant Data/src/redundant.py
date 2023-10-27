class Transfer:
    def __init__(self, amount, income, expense):
        self.amount = amount
        self.income = income
        self.expense = expense

class Income:
    def __init__(self, amount):
        self.amount = amount
        # amount is the same for party and counterparty

class Expense:
    def __init__(self, amount):
        self.amount = amount

transfer_amount = 1000  
# simplification: should be a money object with the currency

income = Income(transfer_amount)
expense = Expense(transfer_amount)
transfer = Transfer(transfer_amount, income, expense)

print("Transfer amount:", transfer.amount)
print("Income amount:", transfer.income.amount)
print("Expense amount:", transfer.expense.amount)
