# CoDe SmElL 159 - mIxEd_cASe

![CoDe SmElL 159 - mIxEd_cASe](CoDe%20SmElL%20159%20-%20mIxEd_cASe.jpg)

*Serious development is done by many different people. We have to start agreeing.*

> TL;DR: Don't mix different case conversions

# Problems 😔 

- Readability
- Maintainability

# Solutions 😃

1. Choose a case standard
2. Hold on to it

# Context 💬

When different people make software together they might have personal or cultural differences.

Some prefer [camelCase](https://en.wikipedia.org/wiki/Camel_case)🐫, others [snake_case](https://en.wikipedia.org/wiki/Snake_case)🐍, MACRO_CASE🗣️, and [many others](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Multiple-word_identifiers).

Code should be straightforward and readable.

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/f0858b7401a061b1d87ad5e488a85bc3) -->

```json
{
    "id": 2,
    "userId": 666, 
    "accountNumber": "12345-12345-12345",
    "UPDATED_AT": "2022-01-07T02:23:41.305Z",
    "created_at": "2019-01-07T02:23:41.305Z",
    "deleted at": "2022-01-07T02:23:41.305Z"
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3dd8fd30a0c8c50538b401cbfb746ecc) -->

```json
{
    "id": 2,
    "userId": 666, 
    "accountNumber": "12345-12345-12345",
    "updatedAt": "2022-01-07T02:23:41.305Z",
    "createdAt": "2019-01-07T02:23:41.305Z",
    "deletedAt": "2022-01-07T02:23:41.305Z"
  // This doesn't mean THIS standard is the right one
}
```

# Detection 🔍

[X] Automatic 

We can tell our linters about our company's broad [naming standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md) and enforce them.

Whenever new people arrive at the organization, an automated test should politely ask him/her/.. to change the code.

# Exceptions 🛑

Whenever you need to interact with code out of your scope, you should use the client's standards, not yours.

# Tags 🏷️

- Standards

# Conclusion 🏁

Dealing with standards is easy.

We need to enforce them.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Information 📕

[What Exactly Is a Name? Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

[All naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Multiple-word_identifiers)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Wolfgang Hasselmann](https://unsplash.com/@wolfgang_hasselmann) on [Unsplash](https://unsplash.com/s/photos/camel)  

* * *

> If you have too many special cases, you are doing it wrong.

_Craig Zerouni_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)