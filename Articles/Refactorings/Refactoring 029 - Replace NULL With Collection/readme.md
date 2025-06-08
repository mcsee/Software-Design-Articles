# Refactoring 029 - Replace NULL With Collection

![Refactoring 029 - Replace NULL With Collection](Refactoring%20029%20-%20Replace%20NULL%20With%20Collection.jpg)

*Transform optional attributes into empty collections for cleaner, safer, and polymorphic code, banishing the billion-dollar mistake*

> TL;DR: Replace nullable optional attributes with empty collections to eliminate null checks and leverage polymorphism.

# Problems Addressed 😔

- [Nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) reference exceptions
- Excessive conditional logic and [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)
- Fragile error handling
- [Optional Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)
- Complex validation code
- [Polymorphism Violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md)

# Related Code Smells 💨

[Code Smell 192 - Optional Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)

[Code Smell 19 - Optional Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2019%20-%20Optional%20Arguments/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 45 - Not Polymorphic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md)

# Steps 👣

1. Identify nullable optional attributes that could be collections
2. Replace single nullable objects with empty collections
3. Remove all null checks related to these optional attributes
4. Update methods to work with collections instead of single objects
5. If you need to keep the old behavior, assert no more than element is added

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/610e138b0ea61252ea4c40cb4e1bd494) -->

```java
public class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    private Coupon coupon = null;
    
    public void addItem(Item item) {
        this.items.add(item);
    }
    
    public void redeemCoupon(Coupon coupon) {
        this.coupon = coupon;
    }
    
    public double total() {
        double total = 0;
        
        for (Item item : this.items) {
            total += item.price();
        }
        
        // This a polluted IF and null check
        if (this.coupon != null) {
            total -= this.coupon.discount();
        }
        
        return total;
    }
    
    public boolean hasUnsavedChanges() {
        // Explicit null check
        return !this.items.isEmpty() || this.coupon != null;
    }
    
    public boolean hasCoupon() {        
        return this.coupon != null;
    }
}
```

<!-- [Gist Url](https://gist.github.com/mcsee/f212507baeb4654b70a3f11270fd9758) -->

```java
public class ShoppingCart {
    private final List<Item> items = new ArrayList<>();
  
    // This version uses Optionals
    // Not all programming languages support this feature
    private Optional<Coupon> coupon = Optional.empty();

    public void addItem(Item item) {
        items.add(item);
    }

    public void redeemCoupon(Coupon coupon) {
        // You need to understand how optionals work
        this.coupon = Optional.ofNullable(coupon);
    }
    
    public boolean hasUnsavedChanges() {
        return !items.isEmpty() || coupon.isPresent();
    }

    public boolean hasCoupon() {
        return coupon.isPresent();
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/de10cb98c6f8458c530a06339124299c) -->

```java
public class ShoppingCart {
  private List<Item> items = new ArrayList<>();
    
  // 1. Identify nullable optional attributes
  // that could be collections
  // 2. Replace single nullable objects with empty collections
  private List<Coupon> coupons = new ArrayList<>();
    
  public void addItem(Item item) {
      this.items.add(item);
  }
    
  // 4. Update methods to work with collections
  // instead of single nullable object
  public void redeemCoupon(Coupon coupon) {    
      // 5. If you need to keep the old behavior,
      // assert no more than element is added
      if (!this.coupons.isEmpty()) {
        throw new IllegalStateException(
          "Only one coupon can be added to the cart");
      }
      this.coupons.add(coupon);
  }
    
  // Simplified logic without null checks
  public double total() {
    double total = 0;
      
    for (Item item : this.items) {
        total += item.price();
    }
      
    // 3. Remove all null checks 
    // related to these optional attributes        
    for (Coupon coupon : this.coupons) {
        total -= coupon.discount();
    }
      
    return total;
  }
    
  // Consistent behavior with empty collections
  public boolean hasUnsavedChanges() {
    // 4. Update methods to work with collections
    // instead of single objects 
    return !this.items.isEmpty() || !this.coupons.isEmpty();
  }
    
  // 3. Remove all null checks 
  // related to these optional attributes
  // Collection-based check instead of null check
  public boolean hasCoupon() {
    return !this.coupons.isEmpty();
  }
}
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is generally safe when you control all access points to the collection attributes.

You need to ensure that no external code expects null values and deal with inside APIs.

The refactoring maintains the same external behavior while simplifying internal logic.

You should verify that all constructors and factory methods initialize collections properly.

# Why is the Code Better? ✨

The refactored code eliminates [null pointer exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) and reduces conditional complexity.

Empty collections and non-empty collections behave polymorphically, allowing you to treat them uniformly.

The code becomes more predictable since collections always exist (at least empty) and respond to the same operations.

Method implementations become shorter and more focused on business logic rather than null handling.

The approach aligns with the principle of making illegal states unrepresentable in your domain model, leading to more robust and maintainable code.

Empty collections and non-empty collections are **polymorphic**.

# How Does it Improve the Bijection? 🗺️

In the real world, containers exist even when empty.

By representing optional collections as empty collections rather than null, you create a more accurate model of reality.

Null does not exist in real world and it always breaks the  [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

This maintains the one-to-one correspondence between real-world concepts and your computational model, creating a good [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

When you return a collection instead of nulls, you also reduce the [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md).

# Limitations ⚠️

This refactoring may not be suitable when null has semantic meaning different from "empty". Some legacy APIs might expect null values, requiring adaptation layers.

You need to ensure all code paths initialize collections consistently to avoid mixed null and empty states.

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify nullable optional attributes that could be collections 2. Replace single nullable objects with empty collections 3. Remove all null checks related to these optional attributes 4. Update methods to work with collections instead of single objects 5. If you need to keep the old behavior, assert no more than element is added

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+nullable+optional+attributes+that+could+be+collections+2.+Replace+single+nullable+objects+with+empty+collections+3.+Remove+all+null+checks+related+to+these+optional+attributes+4.+Update+methods+to+work+with+collections+instead+of+single+objects+5.+If+you+need+to+keep+the+old+behavior%2C+assert+no+more+than+element+is+added%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+nullable+optional+attributes+that+could+be+collections+2.+Replace+single+nullable+objects+with+empty+collections+3.+Remove+all+null+checks+related+to+these+optional+attributes+4.+Update+methods+to+work+with+collections+instead+of+single+objects+5.+If+you+need+to+keep+the+old+behavior%2C+assert+no+more+than+element+is+added%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+nullable+optional+attributes+that+could+be+collections+2.+Replace+single+nullable+objects+with+empty+collections+3.+Remove+all+null+checks+related+to+these+optional+attributes+4.+Update+methods+to+work+with+collections+instead+of+single+objects+5.+If+you+need+to+keep+the+old+behavior%2C+assert+no+more+than+element+is+added%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+nullable+optional+attributes+that+could+be+collections+2.+Replace+single+nullable+objects+with+empty+collections+3.+Remove+all+null+checks+related+to+these+optional+attributes+4.+Update+methods+to+work+with+collections+instead+of+single+objects+5.+If+you+need+to+keep+the+old+behavior%2C+assert+no+more+than+element+is+added%3A+%60%60%60java%0D%0Apublic+class+ShoppingCart+%7B%0D%0A++++private+List%3CItem%3E+items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++private+Coupon+coupon+%3D+null%3B%0D%0A++++%0D%0A++++public+void+addItem%28Item+item%29+%7B%0D%0A++++++++this.items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+redeemCoupon%28Coupon+coupon%29+%7B%0D%0A++++++++this.coupon+%3D+coupon%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+double+total%28%29+%7B%0D%0A++++++++double+total+%3D+0%3B%0D%0A++++++++%0D%0A++++++++for+%28Item+item+%3A+this.items%29+%7B%0D%0A++++++++++++total+%2B%3D+item.price%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++%2F%2F+This+a+polluted+IF+and+null+check%0D%0A++++++++if+%28this.coupon+%21%3D+null%29+%7B%0D%0A++++++++++++total+-%3D+this.coupon.discount%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++%0D%0A++++++++return+total%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasUnsavedChanges%28%29+%7B%0D%0A++++++++%2F%2F+Explicit+null+check%0D%0A++++++++return+%21this.items.isEmpty%28%29+%7C%7C+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+boolean+hasCoupon%28%29+%7B++++++++%0D%0A++++++++return+this.coupon+%21%3D+null%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Null

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# See also 📚

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits 🙏

Image by [Eak K.](https://pixabay.com/users/eak_kkk-907811/) on [Pixabay](https://pixabay.com//)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)