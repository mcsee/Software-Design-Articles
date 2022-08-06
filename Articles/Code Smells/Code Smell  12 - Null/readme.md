# Code Smell 12 - Null

![Code Smell 12 - Null](kurt-cotoaga-zvkBC8OrUJ0-unsplash.jpg)

*Programmers use Null as different flags. It can hint an absence, an undefined value, en error etc. 
Multiple semantics lead to coupling and errors.*

> TL;DR: Null is schizophrenic and does not exist in real world. His creator regretted and programmers around the world suffer it. Don't be a part of it.

# Problems

- Coupling among the callers and the senders.

- Mismatch among the callers and the senders. 

- If/Switch/Case Polluting.

- Null is not polymorphic with real objects. Hence, *Null Pointer Exception*

- Null does not exist on real world. Thus, it violates [Bijection Principle](Theory\The One and Only Software Design Principle)

# Solutions

- Avoid Null. 

- Use [NullObject pattern](https://en.wikipedia.org/wiki/Null_object_pattern) to avoid ifs.

- Use [Optionals](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html).

[Null: The Billion Dollar Mistake](Theory\Null - The Billion Dollar Mistake)

# Exceptions

- APIs, Databases and external systems where NULL does exist.

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
        return this.items.reduce((previous, current) => previous + current.price, 0);
    }

    total() {
        if (this.discountCoupon == null)
            return this.subtotal();
        else
            return this.subtotal() * (1 - this.discountCoupon.rate);
    }
}

cart = new Cart([new CartItem(1), new CartItem(2), new CartItem(7)], new DiscountCoupon(0.15));
//10 - 1.5 = 8.5

cart = new Cart([new CartItem(1), new CartItem(2), new CartItem(7)], null);
//10 - null  = 10
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
        return this.items.reduce((previous, current) => previous + current.price, 0);
    }

    total() {
        return this.discountCoupon.discount(this.subtotal());
    }
}

cart = new Cart([new CartItem(1), new CartItem(2), new CartItem(7)], new DiscountCoupon(0.15));
//10 - 1.5 = 8.5

cart = new Cart([new CartItem(1), new CartItem(2), new CartItem(7)], new NullCoupon());
//10 - nullObject  = 10
```

# Detection

Most Linters can show null usages and warn us.

# Tags

- Null

# Conclusion

- Null is the billion-dollar mistake. Yet, most program languages support them and libraries suggest its usage.

# More info

- [Null: The Billion-Dollar Mistake](Theory\Null - The Billion Dollar Mistake)

# Credits

Photo by [Kurt Cotoaga](https://unsplash.com/@kydroon) on [Unsplash](https://unsplash.com/s/photos/black-hole)

* * *

> I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.

_Tony Hoare_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()