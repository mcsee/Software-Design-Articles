# Code Smell 08 - Long Chains Of Collaborations

![Code Smell 08 - Long Chains Of Collaborations](Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations.jpg)

*Making long chains generate coupling and ripple effect. Any chain change breaks the code.*

> TL;DR: Just sent messages to your acquaintances. 

# Problems 😔 

- Coupling

- Break encapsulation

# Solutions 😃

- Create intermediate methods.
- Think about [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter).
- Create higher level messages.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/de702945b0bb7cd80f696f8cbe19c91c) -->

```javascript
class Dog {
   constructor(feet) {
     this.feet = feet;    
  }
  getFeet() {    
    return this.feet;
  }  
}

class Foot {
  move() { }
}

feet = [new Foot(), new Foot(), new Foot(), new Foot()];
dog = new Dog(feet);

for (var foot of dog.getFeet()) {
  foot.move(); 
}

// Equivalent to dog.getFeet()[0].move(); dog.getFeet()[1].move() ...
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b3b7d73ffb6554df2c06fce3b93a134f) -->

```javascript
class Dog {
   constructor(feet) {
     this.feet = feet;    
  }
  walk() {
    // This is encapsulated on how the dog walks
    for (var foot of this.feet) {
      foot.move(); 
    }
  }
}

class Foot {
  move() { }
}

feet = [new Foot(), new Foot(), new Foot(), new Foot()];
dog = new Dog(feet);
dog.walk();
```

# Detection 🔍

 Automatic detection is possible using parsing trees.
 
# Tags 🏷️

- Complexity
 
# Conclusion 🏁

Avoid successive message calls. Try to hide the intermediate collaborations and create new protocols.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 67 - Middle Man](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/smells/message-chains)

# Also Known as 🪪

- Message Chains

- Law of Demeter

# Credits 🙏

Photo by [Chewy](https://unsplash.com/@chewy) on [Unsplash](https://unsplash.com/s/photos/dog)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)