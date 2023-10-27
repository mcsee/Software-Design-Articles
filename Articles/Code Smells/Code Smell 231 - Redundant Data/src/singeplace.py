class Transfer:
    def __init__(self, amount):
        self.amount = amount
        self.income = Income(self)
        self.expense = Expense(self)

class Income:
    def __init__(self, transfer):
        self.transfer = transfer

    def get_amount(self):
        return self.transfer.amount

class Expense:
    def __init__(self, transfer):
        self.transfer = transfer

    def get_amount(self):
        return self.transfer.amount

transfer_amount = 1000  
transfer = Transfer(transfer_amount)

print("Transfer amount:", transfer.amount)
print("Income amount:", transfer.income.get_amount())
print("Expense amount:", transfer.expense.get_amount())
