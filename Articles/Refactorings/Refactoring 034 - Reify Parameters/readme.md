# Refactoring 034 - Reify Parameters

![Refactoring 034 - Reify Parameters](Refactoring%20034%20-%20Reify%20Parameters.jpg)

*Transform scattered inputs into one clear object*

> TL;DR: Wrap messy parameters into a single meaningful entity.

# Problems Addressed 😔

- Parameter [overload](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)
- [Order confusion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)
- [Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)
- Low readability
- Hard extension
- [DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)
- Weak semantics
- Repeated [validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)
- Accidental [argument swapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)
- [Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)
- [Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)
- Weak type safety
- Missing [Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)
- Missing [Intervals](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20194%20-%20Missing%20Interval/readme.md)

# Related Code Smells 💨

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 177 - Missing Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

[Code Smell 194 - Missing Interval](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20194%20-%20Missing%20Interval/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 188 - Redundant Parameter Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)

[Code Smell 93 - Send me Anything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2093%20-%20Send%20me%20Anything/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 19 - Optional Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2019%20-%20Optional%20Arguments/readme.md)

# Steps 👣

1. Identify multiple parameters of the same type
2. Create a meaningful entity to group them
3. Add missing validation rules to fail fast
4. Replace function signatures with the new entity
5. Adjust all callers to pass the entity
6. Add context-specific names to improve clarity

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/0bd165efd528becd130a142cca8f7c2b) -->

```typescript
function findHolidays(
 maxPrice: Currency, 
 startDate: Date,
 endDate: Date, 
 minPrice: Currency) {
  // Notice that maxPrice and minPrice are swapped by mistake
  // Also, dates are mixed
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/bd6e1bf62f3a6a3e0843bba573cc7638) -->

```typescript
// 2. Create a meaningful entity to group them  

class PriceRange {
  constructor(public min: Currency, public max: Currency) {
    if (min > max) {
      throw new Error(
        `Invalid price range: min (${min}) `+
        `cannot be greater than max (${max})`
      );
    }
    if (min < 0) {
      throw new Error(
        `Invalid price range: min (${min}) cannot be negative`);
    }
  }
}

class Interval {
  // 3. Add missing validation rules to fail-fast
  constructor(public start: Date, public end: Date) {
    if (start > end) {
      throw new Error(
        `Invalid date range: start (${start.toISOString()})  ` + 
        `cannot be after end (${end.toISOString()})`
      );
    }
  }
}

class HolidaySearchCriteria {
  constructor(
    public priceRange: PriceRange,
    public dateRange: Interval
  ) {}
}

function findHolidays(criteria: HolidaySearchCriteria): Holiday[] {
  // 1. Identify multiple parameters of the same type  
  // No need to call validate() - already validated in constructors
  // 4. Replace function signatures with the new entity  
  const { priceRange, dateRange } = criteria;
  // 5. Adjust all callers to pass the entity  
  // 6. Add context-specific names to improve clarity 
  
  return database.query({
    price: { $gte: priceRange.min, $lte: priceRange.max },
    startDate: { $gte: dateRange.start },
    endDate: { $lte: dateRange.end }
  });
}
 
try {
  const criteria = new HolidaySearchCriteria(
    new PriceRange(500, 1000),  // ✅ Valid
    new Inteval(
      new Date('2025-06-01'), 
      new Date('2025-06-15')
    )
  );
  
  findHolidays(criteria);
  
  // ❌ This will throw immediately
  // Great for UI and API validation
  new PriceRange(1000, 500);
  
} catch (error) {
  console.error(error.message);
}
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

Many IDEs support this pattern.

# Why is the Code Better? ✨

You avoid order confusion and increase readability.

You make functions easy to extend with new parameters.

You bring semantic meaning to the input data.

You eliminate the risk of passing arguments in the wrong order since the object properties have explicit names.

You make function calls self-documenting because each value clearly indicates its purpose.

You simplify adding new optional parameters without breaking existing code. 

You enable better IDE support with autocomplete showing parameter names.

You create opportunities to [reuse the parameter object type](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20194%20-%20Missing%20Interval/readme.md) across related functions.

You [fail fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md), asserting on the relations among parameters.

# How Does it Improve the Bijection? 🗺️

You move closer to a [one-to-one map](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) between the business concept of a "search request" and your code model.

You stop treating the data as loose numbers and give them an [explicit identity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) that matches the domain.

In the real world, you describe searches using named criteria rather than ordered lists.

When you ask someone to "search for products with a minimum price of 50 and a maximum price of 100," you use named concepts.

This refactoring mirrors that natural [language structure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) in your code.

The *SearchCriteria* becomes a first-class concept that [maps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) directly to how searching works in the real world.

# Refactor with AI 🤖

Ask AI to scan your codebase for functions that use two or more parameters of the same type.

Instruct it to propose an entity name, generate the type or class, and rewrite both the function and its callers to use the new entity.

> Suggested Prompt: 1. Identify multiple parameters of the same type  2. Create a meaningful entity to group them  3. Add missing validation rules to fail fast 4. Replace function signatures with the new entity  5. Adjust all callers to pass the entity  6. Add context-specific names to improve clarity  

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+multiple+parameters+of+the+same+type++2.+Create+a+meaningful+entity+to+group+them++3.+Add+missing+validation+rules+to+fail+fast+4.+Replace+function+signatures+with+the+new+entity++5.+Adjust+all+callers+to+pass+the+entity++6.+Add+context-specific+names+to+improve+clarity++%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+multiple+parameters+of+the+same+type++2.+Create+a+meaningful+entity+to+group+them++3.+Add+missing+validation+rules+to+fail+fast+4.+Replace+function+signatures+with+the+new+entity++5.+Adjust+all+callers+to+pass+the+entity++6.+Add+context-specific+names+to+improve+clarity++%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+multiple+parameters+of+the+same+type++2.+Create+a+meaningful+entity+to+group+them++3.+Add+missing+validation+rules+to+fail+fast+4.+Replace+function+signatures+with+the+new+entity++5.+Adjust+all+callers+to+pass+the+entity++6.+Add+context-specific+names+to+improve+clarity++%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+multiple+parameters+of+the+same+type++2.+Create+a+meaningful+entity+to+group+them++3.+Add+missing+validation+rules+to+fail+fast+4.+Replace+function+signatures+with+the+new+entity++5.+Adjust+all+callers+to+pass+the+entity++6.+Add+context-specific+names+to+improve+clarity++%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+multiple+parameters+of+the+same+type++2.+Create+a+meaningful+entity+to+group+them++3.+Add+missing+validation+rules+to+fail+fast+4.+Replace+function+signatures+with+the+new+entity++5.+Adjust+all+callers+to+pass+the+entity++6.+Add+context-specific+names+to+improve+clarity++%3A+%60%60%60typescript%0D%0Afunction+findHolidays%28%0D%0A+maxPrice%3A+Currency%2C+%0D%0A+startDate%3A+Date%2C%0D%0A+endDate%3A+Date%2C+%0D%0A+minPrice%3A+Currency%29+%7B%0D%0A++%2F%2F+Notice+that+maxPrice+and+minPrice+are+swapped+by+mistake%0D%0A++%2F%2F+Also%2C+dates+are+mixed%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Primitive Obsession

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Introduce Parameter Object](https://refactoring.guru/es/introduce-parameter-object)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 019 - Reify Email Addresses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20019%20-%20Reify%20Email%20Addresses/readme.md)

# Also known as

[Introduce Parameter Object](https://refactoring.guru/es/introduce-parameter-object)

# Credits 🙏

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)