# Code Smell 12 - Null

![Code Smell 12 - Null](Code%20Smell%2012%20-%20Null.jpg)

*Programmers use Null as different flags. It can hint an absence, an undefined value, en error etc. 
Multiple semantics lead to coupling and errors.*

> TL;DR: Null is schizophrenic and does not exist in real-world. His creator regretted and programmers around the world suffer it. Don't be a part of it.

# Problems

- Coupling among the callers and the senders.

- Mismatch among the callers and the senders. 

- If/Switch/Case Polluting.

- Null is not polymorphic with real objects. Hence, *Null Pointer Exception*

- Null does not exist on real-world. Thus, it violates [Bijection Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Solutions

- Avoid Null. 

- Use [NullObject pattern](https://en.wikipedia.org/wiki/Null_object_pattern) to avoid ifs.

- Use [Optionals](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html).

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/2f7aee362e99fbe447d8c1e8aaeb9f8e)

```javascript
class CartItem {
    constructor(price) {
        this.price = price;
    }
}

class DiscountCoupon {
    constructor(rate) {
        this.rate = rate;
    }
}

class Cart {
    constructor(selecteditems, discountCoupon) {
        this.items = selecteditems;
        this.discountCoupon = discountCoupon;
    }

    subtotal() {
        return this.items.reduce((previous, current) => 
            previous + current.price, 0);
    }

    total() {
        if (this.discountCoupon == null)
            return this.subtotal();
        else
            return this.subtotal() * (1 - this.discountCoupon.rate);
    }
}

cart = new Cart([
    new CartItem(1),
    new CartItem(2),
    new CartItem(7)
    ], new DiscountCoupon(0.15)]);
// 10 - 1.5 = 8.5

cart = new Cart([
    new CartItem(1),
    new CartItem(2),
    new CartItem(7)
    ], null);
// 10 - null  = 10
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a7571cf0ce9e7666bd6a393520f9a968)

```javascript
class CartItem {
    constructor(price) {
        this.price = price;
    }
}

class DiscountCoupon {
    constructor(rate) {
        this.rate = rate;
    }

    discount(subtotal) {
        return subtotal * (1 - this.rate);
    }
}

class NullCoupon {
    discount(subtotal) {
        return subtotal;
    }
}

class Cart {
    constructor(selecteditems, discountCoupon) {
        this.items = selecteditems;
        this.discountCoupon = discountCoupon;
    }

    subtotal() {
        return this.items.reduce(
            (previous, current) => previous + current.price, 0);
    }

    total() {
        return this.discountCoupon.discount(this.subtotal());
    }
}

cart = new Cart([
    new CartItem(1),
    new CartItem(2),
    new CartItem(7)
    ], new DiscountCoupon(0.15));
// 10 - 1.5 = 8.5

cart = new Cart([
    new CartItem(1),
    new CartItem(2),
    new CartItem(7)
    ], new NullCoupon());
// 10 - nullObject = 10
```

# Detection

Most Linters can show null usages and warn us.

# Exceptions

- APIs, Databases and external systems where NULL does exist.

# Tags

- Null

# Conclusion

- Null is the billion-dollar mistake. Yet, most program languages support them and libraries suggest its usage.

# More Info

[Null: The Billion-Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Credits

Photo by [Kurt Cotoaga](https://unsplash.com/@kydroon) on [Unsplash](https://unsplash.com/s/photos/black-hole)

* * *

> I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.

_Tony Hoare_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)