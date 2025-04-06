# Refactoring 017 - Convert Attributes to Sets

![Refactoring 017 - Convert Attributes to Sets](Refactoring%20017%20-%20Convert%20Attributes%20to%20Sets.jpg)

*Favor immutability by converting attributes to sets*

> TL;DR: Using sets for attributes simplifies your code and makes state management easier

# Problems Addressed

- Mutability 
- Complexity
- [Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md) become polluted  
- Setters  

# Related Code Smells

[Code Smell 35 - State as Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2035%20-%20State%20as%20Properties/readme.md)

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

# Steps

1. Identify attributes representing states
2. Replace the attributes with sets: one for each state
3. Adjust methods to move items between sets instead of mutating attributes

# Sample Code

## Before

<!-- [Gist Url](https://gist.github.com/mcsee/18b119021e9a5c4e2340a72a0bd12978) -->

```typescript
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
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/f05f0411564b9a39697ebfa848e46995) -->

```typescript
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
```

# Type

[X] Semi-Automatic

# Safety

This refactoring is safe when your attributes don't rely on specific indexing behavior.

Since sets don't maintain element order, check if your logic depends on order.

# Why is the Code Better?

Entities are immutable in the essence.

Using sets ensures uniqueness and simplifies logic.

You no longer need to check for duplicates before adding elements.

Operations like union, intersection, and difference become straightforward, making your code more maintainable and flexible.

# Limitations

Sets don't preserve element order.

If your logic depends on sequence, converting to a set may not be appropriate and you should use an Ordered Collection or Array

# AI Refactoring

You can prompt your AI assistants to make this refactoring for you.

## Try Them!     

> Suggested Prompt: Convert internal attributes to external sets usage

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+internal+attributes+to+external+sets+usage%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+internal+attributes+to+external+sets+usage%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+internal+attributes+to+external+sets+usage%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+internal+attributes+to+external+sets+usage%3A+%60%60%60typescript%0D%0Aclass+Bill+%7B%0D%0A++amount%3A+number%3B%0D%0A++paid%3A+boolean%3B%0D%0A%0D%0A++constructor%28amount%3A+number%29+%7B%0D%0A++++this.amount+%3D+amount%3B%0D%0A++++this.paid+%3D+false%3B%0D%0A++%7D%0D%0A%0D%0A++pay%28%29+%7B%0D%0A++++if+%28%21this.paid%29+%7B%0D%0A++++++this.paid+%3D+true%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aconst+bill+%3D+new+Bill%28100%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+false%0D%0Abill.pay%28%29%3B%0D%0Aconsole.log%28bill.paid%29%3B+%2F%2F+true%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Tags

- Mutability

# Level 🔋

[X] Intermediate

# Related Refactorings

https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md

# See also

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits

Image by [Angelo Giordano](https://pixabay.com/users/angelo_giordano-753934/) in [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)