# Code Smell 12 - Null

![Code Smell 12 - Null](Code%20Smell%2012%20-%20Null.jpg)

*Programmers use Null as different flags. It can hint at an absence, an undefined value, en error etc. Multiple semantics lead to coupling and defects.*

> TL;DR: Null is schizophrenic and does not exist in real-world. Its creator regretted and programmers around the world suffer from it. Don't be a part of it.

# Problems 😔 

- Coupling between callers and senders.

- [If](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)/[Switch](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)/Case Polluting.

- Null is not polymorphic with real objects. Hence, *Null Pointer Exception*

- Null does not exist on real-world. Thus, it violates [Bijection Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Solutions 😃

1. Avoid Null.

2. Use the [NullObject pattern](https://en.wikipedia.org/wiki/Null_object_pattern) to avoid ifs.

3. Use [Optionals](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html).

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Refactorings ⚙️

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

[Refactoring 029 - Replace NULL With Collection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20029%20-%20Replace%20NULL%20With%20Collection/readme.md)

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Context 💬

When you use null, you encode multiple meanings into a single value.

Sometimes you want to represent an absence. 

Sometimes you mean you have not loaded your objects yet. 

Sometimes you mean error. 

Callers must guess your intent and add conditionals to protect themselves. 

You spread knowledge about internal states across your codebase.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2f7aee362e99fbe447d8c1e8aaeb9f8e) -->

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

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/a7571cf0ce9e7666bd6a393520f9a968) -->

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

# Detection 🔍

Most Linters can flag null usages and warn you.

# Exceptions 🛑

You sometimes need to deal with null when you integrate with databases, legacy APIs, or external protocols.

You must contain null at the boundaries and convert it immediately into meaningful objects.

# Tags 🏷️

- Null

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

When you use null, you break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your code and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Nothing in the mapper behaves like null. 

Absence, emptiness, and failure mean different things. 

When you collapse them into null, you force your program to guess reality and you invite defects.

# AI Generation 🤖

AI generators often introduce this smell. 

They default to null when they lack context or want to keep examples short and also because it is widespread (but harmful) industry default.

# AI Detection 🧲

You can instruct AI to remove nulls with simple rules. 

When you ask for explicit domain objects and forbid nullable returns, generators usually fix the smell correctly.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Rewrite this code to remove all null returns. Model absence explicitly using domain objects or collections. Do not add conditionals

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Rewrite+this+code+to+remove+all+null+returns.+Model+absence+explicitly+using+domain+objects+or+collections.+Do+not+add+conditionals%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Rewrite+this+code+to+remove+all+null+returns.+Model+absence+explicitly+using+domain+objects+or+collections.+Do+not+add+conditionals%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Rewrite+this+code+to+remove+all+null+returns.+Model+absence+explicitly+using+domain+objects+or+collections.+Do+not+add+conditionals%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Rewrite+this+code+to+remove+all+null+returns.+Model+absence+explicitly+using+domain+objects+or+collections.+Do+not+add+conditionals%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) | [You](https://you.com/search?q=Rewrite+this+code+to+remove+all+null+returns.+Model+absence+explicitly+using+domain+objects+or+collections.+Do+not+add+conditionals%3A+%60%60%60javascript%0D%0Aclass+CartItem+%7B%0D%0A++++constructor%28price%29+%7B%0D%0A++++++++this.price+%3D+price%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+DiscountCoupon+%7B%0D%0A++++constructor%28rate%29+%7B%0D%0A++++++++this.rate+%3D+rate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Cart+%7B%0D%0A++++constructor%28selecteditems%2C+discountCoupon%29+%7B%0D%0A++++++++this.items+%3D+selecteditems%3B%0D%0A++++++++this.discountCoupon+%3D+discountCoupon%3B%0D%0A++++%7D%0D%0A%0D%0A++++subtotal%28%29+%7B%0D%0A++++++++return+this.items.reduce%28%28previous%2C+current%29+%3D%3E+%0D%0A++++++++++++previous+%2B+current.price%2C+0%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++total%28%29+%7B%0D%0A++++++++if+%28this.discountCoupon+%3D%3D+null%29%0D%0A++++++++++++return+this.subtotal%28%29%3B%0D%0A++++++++else%0D%0A++++++++++++return+this.subtotal%28%29+%2A+%281+-+this.discountCoupon.rate%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+new+DiscountCoupon%280.15%29%5D%29%3B%0D%0A%2F%2F+10+-+1.5+%3D+8.5%0D%0A%0D%0Acart+%3D+new+Cart%28%5B%0D%0A++++new+CartItem%281%29%2C%0D%0A++++new+CartItem%282%29%2C%0D%0A++++new+CartItem%287%29%0D%0A++++%5D%2C+null%29%3B%0D%0A%2F%2F+10+-+null++%3D+10%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

- Null is the billion-dollar mistake. Yet, most program languages support them and libraries suggest its usage.
 
# Relations 👩‍❤️‍💋‍👨

[Code Smell 88 - Lazy Initialization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2088%20-%20Lazy%20Initialization/readme.md)

[Code Smell 157 - Balance at 0](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20157%20-%20Balance%20at%200/readme.md)

[Code Smell 93 - Send me Anything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2093%20-%20Send%20me%20Anything/readme.md)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)

[Code Smell 212 - Elvis Operator](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20212%20-%20Elvis%20Operator/readme.md)

[Code Smell 192 - Optional Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 208 - Null Island](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20208%20-%20Null%20Island/readme.md)

[Code Smell 160 - Invalid Id = 9999](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20160%20-%20Invalid%20Id%20=%209999/readme.md)

[Code Smell 100 - GoTo](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20100%20-%20GoTo/readme.md)

[Code Smell 42 - Warnings/Strict Mode Off](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2042%20-%20Warnings%20Strict%20Mode%20Off/readme.md)

[Code Smell 23 - Instance Type Checking](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2023%20-%20Instance%20Type%20Checking/readme.md)

# More Information 📕

[Null: The Billion-Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Credits 🙏

Photo by [Kurt Cotoaga](https://unsplash.com/@kydroon) on [Unsplash](https://unsplash.com/s/photos/black-hole)

* * *

> I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.

_Tony Hoare_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)