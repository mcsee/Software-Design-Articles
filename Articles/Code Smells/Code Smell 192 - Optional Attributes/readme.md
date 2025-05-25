# Code Smell 192 - Optional Attributes
            
![Code Smell 192 - Optional Attributes](Code%20Smell%20192%20-%20Optional%20Attributes.jpg)

*You need to model something optional. Have you tried collections?*

> TL;DR: Collections are fantastic. And Polymorphic.

# Problems 😔 

- [Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)
- [If Pollution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) 

# Solutions 😃

1. Change the optional attribute to a collection.

# Context 💬

If you need to model something that might be missing, some fancy languages will provide optional, nullable, and many other wrong solutions dealing with [The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

Empty collections and non-empty collections are polymorphic.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a6549bd6a333574a2ba7120a74bcb974) -->

```javascript
class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  email() {
    return this.email;
    // might be null    
  }  
}

// You cannot use safely person.email()
// You need to check for null explicitly
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ec3cca15f071ae1ecebb223675e0cf79) -->

```javascript
class Person {
  constructor(name, emails) {
    this.name = name;
    this.emails = emails;
    // emails should always be a collection. 
    // even an empty one
    // You can check it here
    if (emails.length > 1) {
       throw new Error(
         "Emails collection can have at most one element.");
  }
    
  emails() {
    return this.emails;
  }  
  // You can mutate the emails
  // since they are not essential
  
  addEmail(email) {
    this.emails.push(email);
  }
  
  removeEmail(email) {
    const index = this.emails.indexOf(email);
    if (index !== -1) {
      this.emails.splice(index, 1);
    }
  }
}

// You can iterate the person.emails() 
// in a loop without checking for null
```

# Detection 🔍

[X] Semi-Automatic 

You can detect nullable attributes and change them when necessary.

# Tags 🏷️

- Null 

# Level 🔋

[X] Beginner

# Conclusion 🏁

This is a generalization of the null object pattern.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)

[Code Smell 19 - Optional Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2019%20-%20Optional%20Arguments/readme.md)

# More Information 📕

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

- [Null Object Pattern](https://en.wikipedia.org/wiki/Null_object_pattern)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Levi Jones](https://unsplash.com/@levidjones) on [Unsplash](https://unsplash.com/photos/n0CTq0rroso)
  
* * *

> To iterate is human, to recurse divine

_Peter Deutsch_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)