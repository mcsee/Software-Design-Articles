# Code Smell 23 - Instance Type Checking

![Code Smell 23 - Instance Type Checking](remy-gieling-DQmZCNLLmmc-unsplash.jpg)

*Do you check who are you talking to?*

> TL;DR: Trust your collaborators. Don't check who they are. Ask them to do instead.

# Problems

- [Coupling](../../Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Metamodel interference

- [IFs](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Solutions

1. Avoid *kind*, *isKindOf*, *instance*, *getClass()*, *typeOf*, etc..

2. Don't use Reflection and [Metaprogramming](../../Theory/Laziness%20I%20-%20Metaprogramming/readme.md) for Domain Objects.

3. Replace [*IFs*](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) with polymorphism. 

4. Avoid checking for *'undefined'*. Use [complete objects](../../Theory/Nude%20Models - Part%20I Setters/readme.md), avoid [nulls](../../Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md) and setters, favor [immutability](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md) and you will never have undefined and ifs.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/a2307973172b62bb9dc7b11ef7450220)
```javascript
if (typeof(x) === 'undefined') {
    console.log('variable x is not defined');   
}

function isNumber(data) {
  return (typeof data === 'number');
}

function move(animal) {
  if (animal instanceof Rabbit) {
      animal.run()
  }
  if (animal instanceof Seagull) {
      animal.fly()
  } 
}
 
class Rabbit {
  run() {
    console.log("I'm running");
  }  
}

class Seagull {
  fly() {
    console.log("I'm flying");
  }  
}

let bunny = new Rabbit();
let livingstone = new Seagull();

move(bunny);
move(livingstone);
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/5c0218fcf1362228f406e463f79171a9)
```javascript
/*Avoid these methods
if (typeof(x) === 'undefined') {
    console.log('variable x is not defined');   
}

function isNumber(data) {
  return (typeof data === 'number');
}
*/

class Animal {
} 

class Rabbit extends Animal {
  move() {
    console.log("I'm running");
  }  
}

class Seagull extends Animal {
  move() {
    console.log("I'm flying");
  }  
}

let bunny = new Rabbit();
let livingstone = new Seagull();

bunny.move();
livingstone.move();
```

# Detection

Since type checking methods are well known it is very easy to set up a code policy checking the uses.

# Tags

- Metaprogramming

# Conclusion

Testing for a class type [couples](../../Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) the objects with [accidental decisions](../../Theory/No%20Silver%20Bullet/readme.md) and violates [bijection](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) since no such control exists on real world. It is a smell our models are not good enough.

# Relations

[Code Smell 12 - Null](../../Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# More Info

[How to Get Rid of Annoying IFs Forever](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Laziness I - Metaprogramming](../../Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Credits

Photo by [Remy Gieling](https://unsplash.com/@gieling) on [Unsplash](https://unsplash.com/s/photos/assembly-line)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)





