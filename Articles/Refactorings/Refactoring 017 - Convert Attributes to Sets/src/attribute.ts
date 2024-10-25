class Bill {
  amount: number;
  paid: boolean;

  constructor(amount: number) {
    this.amount = amount;
    this.paid = false;
  }

  pay() {
    if (!this.paid) {
      this.paid = true;
    }
  }
}

const bill = new Bill(100);
console.log(bill.paid); // false
bill.pay();
console.log(bill.paid); // true
