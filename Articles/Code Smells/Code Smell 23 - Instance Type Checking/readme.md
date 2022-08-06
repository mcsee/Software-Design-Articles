# Code Smell 23 - Instance Type Checking

![Code Smell 23 - Instance Type Checking](remy-gieling-DQmZCNLLmmc-unsplash.jpg)

*Do you check who are you talking to?*

> TL;DR: Trust your collaborators. Don't check who they are. Ask them to do instead.

# Problems

- [Coupling](Theory\Coupling - The one and only software design problem)

- Metamodel interference

- [IFs](Theory\How to Get Rid of Annoying IFs Forever)

# Solutions

1. Avoid *kind*, *isKindOf*, *instance*, *getClass()*, *typeOf*, etc..

2. Don't use Reflection and [Metaprogramming](Theory\Laziness I - Metaprogramming) for Domain Objects.

3. Replace [*IFs*](Theory\How to Get Rid of Annoying IFs Forever) with polymorphism. 

4. Avoid checking for *'undefined'*. Use [complete objects](Theory\Nude Models - Part I Setters), avoid [nulls](Code Smells\Code Smell  12 - Null) and setters, favor [immutability](Theory\The Evil Power of Mutants) and you will never have undefined and ifs.

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

Testing for a class type [couples](Theory\Coupling - The one and only software design problem) the objects with [accidental decisions](Theory\No Silver Bullet) and violates [bijection](Theory\The One and Only Software Design Principle) since no such control exists on real world. It is a smell our models are not good enough.

# Relations

[Code Smell 12 - Null](Code Smells\Code Smell  12 - Null)

# More Info

[How to Get Rid of Annoying IFs Forever](Theory\How to Get Rid of Annoying IFs Forever)

[Laziness I - Metaprogramming](Theory\Laziness I - Metaprogramming)

# Credits

Photo by [Remy Gieling](https://unsplash.com/@gieling) on [Unsplash](https://unsplash.com/s/photos/assembly-line)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()





