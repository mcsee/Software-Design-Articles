# CoDe SmElL 159 - mIxEd_cASe

![CoDe SmElL 159 - mIxEd_cASe](wolfgang-hasselmann-YAIGmqV4dFc-unsplash.jpg)

*Serious development is done by many different people. We have to start agreeing.*

> TL;DR: Don't mix different case conversions

# Problems

- Readability

- Maintainability

# Solutions

1. Choose a case standard

2. Hold on to it

# Context

When different people make software together they might have personal or cultural differences.

Some prefer [camelCase](https://en.wikipedia.org/wiki/Camel_case)🐫, others [snake_case](https://en.wikipedia.org/wiki/Snake_case)🐍, MACRO_CASE🗣️, and [many others](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Multiple-word_identifiers).

Code should be straightforward and readable.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f0858b7401a061b1d87ad5e488a85bc3)
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

## Right

[Gist Url]: # (https://gist.github.com/mcsee/3dd8fd30a0c8c50538b401cbfb746ecc)
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

# Detection

[X] Automatic 

We can tell our linters about our company's broad [naming standards](../../Theory/What%20exactly%20is%20a%20name%20—%20Part%20I%20The%20Quest/readme.md) and enforce them.

Whenever new people arrive at the organization, an automated test should politely ask him/her/.. to change the code.

# Exceptions

Whenever we need to interact with out of our scope code, we should use the client's standards, not ours.

# Tags

- Naming

# Conclusion

Dealing with standards is easy.

We need to enforce them.

# Relations

[Code Smell 48 - Code Without Standards](../../Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Info

[What exactly is a name — Part I The Quest](../../Theory/What%20exactly%20is%20a%20name%20—%20Part%20I%20The%20Quest/readme.md)

[All naming conventions](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Multiple-word_identifiers)

# Disclaimer

Code Smells are just my [opinion](../../Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Wolfgang Hasselmann](https://unsplash.com/@wolfgang_hasselmann) on [Unsplash](https://unsplash.com/s/photos/camel)  

* * *

> If you have too many special cases, you are doing it wrong.

_Craig Zerouni_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)