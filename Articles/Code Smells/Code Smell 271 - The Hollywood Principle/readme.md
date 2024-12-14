# Code Smell 271 - The Hollywood Principle

![Code Smell 271 - The Hollywood Principle](Code%20Smell%20271%20-%20The%20Hollywood%20Principle.jpg)

*Don't Call Us, We'll Call You*

> TL;DR: The Hollywood Principle promotes loose coupling by inverting control. High-level components decide when and how to use low-level components.

# Problems

- Tight [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Difficult to extend
- Reduced flexibility
- Increased complexity
- Violation of SOLID principles
- Lack of Testability

# Solutions

1. Apply Inversion of control
2. Use Dependency injection
3. Depend on abstractions

# Context

The [Hollywood Principle](https://en.wiktionary.org/wiki/Hollywood_principle) is a software design principle emphasizing loose coupling between components. 

High-level components *should not* directly control the execution flow in low-level components. 

Low-level components should register themselves with high-level components, and high-level components should decide *when* and *how* to use them.

This is also known as *Inversion of Control*.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/d925b228b08c4772a5ac7aac291221af) -->

```typescript
class TicketCart {
    private paymentMethod: PaymentMethod;

    constructor(paymentMethodType: string) {
        // TicketCart is tightly coupled
        // to specific payment method classes 
        // like CreditCardProcessor and CryptoService.  
        if (paymentMethodType === 'creditCard') {
            this.paymentMethod = new CreditCardProcessor();
        } else if (paymentMethodType === 'Crypto') {
            this.paymentMethod = new CryptoService();
        } else {
            throw new Error('Invalid payment method');
        }
    }

    checkout(money: Money): void {
        this.paymentMethod.pay(money);
    }
}

const cart = new TicketCart('creditCard');
const money = new Money(126, 'USD');
cart.checkout(money);
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/8b20655d72060014443b93b8a4578ca8) -->

```typescript
interface PaymentMethod {
    pay(total: Money): void;
}

class TicketCart {
    private paymentMethod: PaymentMethod;

    constructor(paymentMethod: PaymentMethod) {
        // This solution is more open and less coupled
        // because it relies on abstractions
        this.paymentMethod = paymentMethod;
    }

    checkout(total: Money): void {
        this.paymentMethod.pay(total);
    }
}

class CreditCardProcessor implements PaymentMethod {
    pay(total: Money): void {
        console.log(`Processing payment of ${total.Amount()} 
        ${total.currency()} using credit card.`);
    }
}

const creditCardProcessor = new CreditCardProcessor();
const cart = new TicketCart(creditCardProcessor);
const total = new Money(126, 'USD');
cart.checkout(total);
```

# Detection

[X] Manual

This is a design smell
 
# Tags

- Coupling

# Level

[X ] Intermediate

# AI Generation

AI generators can sometimes create code that violates the Hollywood Principle if you don't explicitly instruct them to follow [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) patterns. 

They often generate straightforward, tightly coupled code by default.

# AI Detection

AI tools can effectively detect violations of the Hollywood Principle by analyzing code dependencies and identifying tight coupling with proper instructions. (see below).

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+the+direct+dependency+and+use+dependency+injection%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+the+direct+dependency+and+use+dependency+injection%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=Remove+the+direct+dependency+and+use+dependency+injection%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+the+direct+dependency+and+use+dependency+injection%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Remove+the+direct+dependency+and+use+dependency+injection%3A+%60%60%60typescript%0D%0Aclass+TicketCart+%7B%0D%0A++++private+paymentMethod%3A+PaymentMethod%3B%0D%0A%0D%0A++++constructor%28paymentMethodType%3A+string%29+%7B%0D%0A++++++++%2F%2F+TicketCart+is+tightly+coupled%0D%0A++++++++%2F%2F+to+specific+payment+method+classes+%0D%0A++++++++%2F%2F+like+CreditCardProcessor+and+CryptoService.++%0D%0A++++++++if+%28paymentMethodType+%3D%3D%3D+%27creditCard%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CreditCardProcessor%28%29%3B%0D%0A++++++++%7D+else+if+%28paymentMethodType+%3D%3D%3D+%27Crypto%27%29+%7B%0D%0A++++++++++++this.paymentMethod+%3D+new+CryptoService%28%29%3B%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++throw+new+Error%28%27Invalid+payment+method%27%29%3B%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%0D%0A++++checkout%28money%3A+Money%29%3A+void+%7B%0D%0A++++++++this.paymentMethod.pay%28money%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aconst+cart+%3D+new+TicketCart%28%27creditCard%27%29%3B%0D%0Aconst+money+%3D+new+Money%28126%2C+%27USD%27%29%3B%0D%0Acart.checkout%28money%29%3B%0D%0A%60%60%60) | 

# Conclusion

This principle can improve your code quality, reduce complexity, and enhance testability.

# Relations

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 16 - Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

[Code Smell 61 - Coupling to Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2061%20-%20Coupling%20to%20Classes/readme.md)

[Code Smell 64 - Inappropriate Intimacy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2064%20-%20Inappropriate%20Intimacy/readme.md)

# More Info

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Inversion_of_control)

[Wiktionary](https://en.wiktionary.org/wiki/Hollywood_principle)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> Dependency Injection is fundamentally about passing dependencies to objects, rather than having objects create or find them.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)