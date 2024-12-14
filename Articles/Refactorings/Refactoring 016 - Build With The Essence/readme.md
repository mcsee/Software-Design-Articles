# Refactoring 016 - Build With The Essence

![Refactoring 016 - Build With The Essence](Refactoring%20016%20-%20Build%20With%20The%20Essence.jpg)

*Building Immutable foundations from the ground*

> TL;DR: Pass essential attributes during object creation to reduce mutability and eliminate getters and setters.

# Problems Addressed

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)
- [Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)
- [Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)
- Unclear object state
- Violating the least surprise principle

# Related Code Smells

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 131 - Zero Argument Constructor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20131%20-%20Zero%20Argument%20Constructor/readme.md)

# Steps

1. Identify essential attributes required for object creation
2. Create a constructor that accepts all essential attributes
3. Remove setter and getter methods 
4. Update object creation calls to pass all required attributes upfront

# Sample Code

## Before

<!-- [Gist Url](https://gist.github.com/mcsee/7dbe7a31b56db54fdb510b1cc44480b5) -->

```java
public class CreditCard {
    private String cardNumber;
    private String cardHolderName;
    private String expirationMonthYear;
    private int cvv;

    public CreditCard() {} // Empty Constructor

    public void setCardNumber(String cardNumber) { 
        this.cardNumber = cardNumber; 
    }
    public void setCardHolderName(String cardHolderName) { 
        this.cardHolderName = cardHolderName; 
    }
    public void setExpirationMonthYear(String expirationMonthYear) { 
        this.expirationMonthYear = expirationMonthYear;
    }
    public void setCvv(int cvv) { 
        this.cvv = cvv; 
    }

    public String getCardNumber() { 
        return cardNumber; 
    }
    public String getCardHolderName() {
        return cardHolderName;
    }
    public String getExpirationMonthYear() {
        return expirationMonthYear; 
    }
    public int getCvv() {
        return cvv; 
    }
}

CreditCard card = new CreditCard();
card.setCardNumber("1234-5678-9012-3456");
card.setCardHolderName("Lilywhite Lilith");
card.setExpirationMonthYear("12/25");
card.setCvv(123);
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/d78f13ba29b3b64b1a2fc3271dd3a0ac) -->

```java
public class CreditCard {
    private final String cardNumber;
    private final String cardHolderName;
    private final String expirationMonthYear;
    private final int cvv;

    public CreditCard(String cardNumber,
                      String cardHolderName,
                      String expirationMonthYear,
                      int cvv) {
        // 1. Identify essential attributes for object creation
        // 2. Create a constructor that accepts all essential attributes
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expirationMonthYear = expirationMonthYear;
        this.cvv = cvv;
    }

    // 3. Remove setter and getter methods 
    
    // Find real behavior related to credit card usage
  
}

// 4. Update object creation calls to pass all required attributes upfront
CreditCard card = new CreditCard("1234-5678-9012-3456",
                                 "Lilywhite Lilith", 
                                 "12/25", 
                                 123);
```

# Type

[X] Semi-Automatic

This is a step-by-step refactor.

# Safety

This refactoring is generally safe if you ensure you pass all essential attributes during object creation. 

You must update all object creation sites, which may require refactoring tools and careful review in larger codebases.

# Why is the Code Better?

The refactored code enforces object integrity by requiring all essential attributes at creation time.

The objects become thread-safe reducing the risk of being in an inconsistent state.

# AI Correction

Most AI tools can correct this code with explicit instructions. 

You can have clear pre-prompts requesting all your code samples to favor immutability.

## Try Them!

*Remember AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Make+it+immutable+by+passing+all+the+attributes+in+the+constructor+avoiding+all+setters+and+getters%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Make+it+immutable+by+passing+all+the+attributes+in+the+constructor+avoiding+all+setters+and+getters%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=Make+it+immutable+by+passing+all+the+attributes+in+the+constructor+avoiding+all+setters+and+getters%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Make+it+immutable+by+passing+all+the+attributes+in+the+constructor+avoiding+all+setters+and+getters%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Make+it+immutable+by+passing+all+the+attributes+in+the+constructor+avoiding+all+setters+and+getters%3A+%60%60%60java%0D%0Apublic+class+CreditCard+%7B%0D%0A++++private+String+cardNumber%3B%0D%0A++++private+String+cardHolderName%3B%0D%0A++++private+String+expirationMonthYear%3B%0D%0A++++private+int+cvv%3B%0D%0A%0D%0A++++public+CreditCard%28%29+%7B%7D+%2F%2F+Empty+Constructor%0D%0A%0D%0A++++public+void+setCardNumber%28String+cardNumber%29+%7B+%0D%0A++++++++this.cardNumber+%3D+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+void+setCardHolderName%28String+cardHolderName%29+%7B+%0D%0A++++++++this.cardHolderName+%3D+cardHolderName%3B+%0D%0A++++%7D%0D%0A++++public+void+setExpirationMonthYear%28String+expirationMonthYear%29+%7B+%0D%0A++++++++this.expirationMonthYear+%3D+expirationMonthYear%3B%0D%0A++++%7D%0D%0A++++public+void+setCvv%28int+cvv%29+%7B+%0D%0A++++++++this.cvv+%3D+cvv%3B+%0D%0A++++%7D%0D%0A%0D%0A++++public+String+getCardNumber%28%29+%7B+%0D%0A++++++++return+cardNumber%3B+%0D%0A++++%7D%0D%0A++++public+String+getCardHolderName%28%29+%7B%0D%0A++++++++return+cardHolderName%3B%0D%0A++++%7D%0D%0A++++public+String+getExpirationMonthYear%28%29+%7B%0D%0A++++++++return+expirationMonthYear%3B+%0D%0A++++%7D%0D%0A++++public+int+getCvv%28%29+%7B%0D%0A++++++++return+cvv%3B+%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0ACreditCard+card+%3D+new+CreditCard%28%29%3B%0D%0Acard.setCardNumber%28%221234-5678-9012-3456%22%29%3B%0D%0Acard.setCardHolderName%28%22Lilywhite+Lilith%22%29%3B%0D%0Acard.setExpirationMonthYear%28%2212%2F25%22%29%3B%0D%0Acard.setCvv%28123%29%3B%0D%0A%60%60%60) | 

# Tags

- Mutability

# Related Refactorings

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md) 

# See also

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits
 
Image by [Denis](https://pixabay.com/users/devolk-3045099/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)