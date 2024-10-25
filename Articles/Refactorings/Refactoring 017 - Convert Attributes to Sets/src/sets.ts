// 1. Identify attributes representing states

class Accountant {  
   // 2. Replace the attributes with sets: one for each state
  unpaidBills: Set<Bill>;
  paidBills: Set<Bill>;

  constructor() {
    this.unpaidBills = new Set();
    this.paidBills = new Set();
  }

  addBill(bill: Bill) {
    this.unpaidBills.add(bill);
  }

  payBill(bill: Bill) {    
    // 3. Adjust methods to move items
    // between sets instead of mutating attributes
    if (this.unpaidBills.has(bill)) {
      this.unpaidBills.delete(bill);
      this.paidBills.add(bill);
    }
  }
}

class Bill {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }
}

const bill = new Bill(100);
const accountant = new Accountant();
accountant.addBill(bill);
console.log(accountant.unpaidBills.has(bill)); // true
accountant.payBill(bill);
console.log(accountant.paidBills.has(bill)); // true
