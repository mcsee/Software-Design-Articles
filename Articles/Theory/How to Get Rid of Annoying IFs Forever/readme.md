# How to Get Rid of Annoying IFs Forever

![How to Get Rid of Annoying IFs Forever](1_0bj3l7Fw0_WEIBW-JX3Aew.png)

*Why the first instruction we learn to program should be the last to use.*

Nobody uses [GOTO instruction](https://en.wikipedia.org/wiki/Goto) anymore and few programming languages still support it.

We have matured and confirmed [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code) is unmaintainable and error prone.
[Structured Programming](https://en.wikipedia.org/wiki/Structured_programming) solved that problem years ago.

We got rid of the sentence thanks to [Edsger Dijkstra's](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) incredible [paper](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf): Go To Statement Considered [Harmful](https://en.wikipedia.org/wiki/Goto#Criticism).

Next evolution step will be removing most [IF statements](https://en.wikipedia.org/wiki/Conditional_(computer_programming). 

**IFs** / **Cases** and **Switches** are *GOTOs* disguised as structured flow. 

Our tool will be Object Oriented Programming principles.

![roads](https://cdn.hashnode.com/res/hashnode/image/upload/v1604271082172/raods.jpeg)

Photo <a href="https://pixabay.com/es/users/przemko-1606435/">Przemysław Bromberek</a> en <a href="https://pixabay.com/">Pixabay</a>
 
 # The Problem

Most **IF** sentences are coupled to *accidental decisions*. This coupling generates ripple effect and make code harder to maintain.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

IFs are considered as [Harmful](https://sddconf.com/brands/sdd/library/If_considered_Harmful_-_Jules_May_-_SDD2017.pdf) as **GOTOs**.

%[https://www.youtube.com/watch?v=z43bmaMwagI]

*IF sentences* violate [open/closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle). Our designs will be less extensible and closed to extension.

What is more, **IFs** are open doors to even worse problems, like **switches**, **cases**, **defaults**, **return*, **continue** and **breaks**.

They make our algorithms darker and force us to build *accidentally complex* solutions. 

[No Silver Bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)

People out of software development cannot explain why we use this branching sentence. This is a code smell.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)

# Solutions

Before we move on and remove IF sentences we should decide if its an *essential* one or an *accidental* If.

To check this out we will look for answers in real world through bijection.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

## Essential Ifs

Let's see an *essential* **IF** statement

[Gist Url]: # (https://gist.github.com/mcsee/ab050467c32205a1b8623352f6bb8dd8)
```javascript
class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchXRatedMovie() {
    if (this.age < 18)
      throw new Error("You are not allowed to watch this movie");
    else
      this.watchMovie();
  }
  watchMovie() {
    // ..
  }
}

let jane = new Moviegoer(12);

jane.watchXRatedMovie();
// Throws exception since Jane is too young to watch the movie
```

We should decide whether to remove this **if sentence** or not.

We must understand whether it represents a business rule (*essential*) or an implementation artifact (*accidental*).

In the case above we will honor our [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md). So we will NOT replace the if.

> People In real world describe age constraints in natural language using **IFs**

## Accidental Ifs

Let us dive now into *bad* **IFs**.

[Gist Url]: # (https://gist.github.com/mcsee/3c0d6d285a537041900a92f71c9c73c8)
```javascript
class Movie {

  constructor(rate) {
    this.rate = rate;
  }
}

class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchMovie(movie) {
    if ((this.age < 18) && (movie.rate == 'Adults Only'))
      throw new Error("You are not allowed to watch this movie");
    
    // watch movie
  }
}

let jane = new Moviegoer(12);
let theExorcist = new Movie('Adults Only');

jane.watchMovie(theExorcist);
// Jane cannot watch the exorcist since she is 12
```

The movie rating **IF** is not related to a **real world If** but to accidental (and coupled) implementation.

Our design decision was to model *ratings* with *strings*.

This is a classic *neither open to extension, nor closed to modification* solution.

Let's see what happens with new requirements.

[Gist Url]: # (https://gist.github.com/mcsee/c237bf02c4ec561939b7ec5973fc913a)
```javascript
class Movie {

  constructor(rate) {
    this.rate = rate;
  }
}

class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchMovie(movie) {
    //!!!!!!!!!!!!!!!!! IFS ARE POLLUTING HERE !!!!!!!!!!!!!!!!!!!!!!!!!!
    if ((this.age < 18) && (movie.rate == 'Adults Only'))
      throw new Error("You are not allowed to watch this movie");
    else if ((this.age < 13) && (movie.rate == 'PG 13'))
      throw new Error("You are not allowed to watch this movie");
    // !!!!!!!!!!!!!!!! IFS ARE POLLUTING HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    // watch movie
  }
}

let theExorcist = new Movie('Adults Only');
let gremlins = new Movie('PG 13');

let jane = new Moviegoer(12);

jane.watchMovie(theExorcist);
// Jane cannot watch the exorcist since she is 12
jane.watchMovie(gremlins);
// Jane cannot watch gremlins since she is 12

let joe = new Moviegoer(16);

joe.watchMovie(theExorcist);
// Joe cannot watch the exorcist since he is 16
joe.watchMovie(gremlins);
// Joe CAN watch gremlins since he is 16
```

We can detect some *Code Smells*:

1. Code is polluted with IFs.
2. A default statement is missing.
3. New ratings will bring new IFs.
4. The strings representing ratings are not first class objects. A typo will introduce hard to find errors.
5. We are forced to add getters on *Movies* to take decisions.

# The Recipe

Let's fix this mess with these steps:

> 1. Create a Polymorphic Hierarchy for every IF condition (if it doesn't already exist).
> 2. Move every *IF Body* to the former abstraction .
> 3. Replace IF Call by polymorphic method call.

On our example:

[Gist Url]: # (https://gist.github.com/mcsee/747c2a4a6bb3531966b7e98ad92924e3)
```javascript
// 1. Create a Polymorphic Hierarchy for every IF condition
// (if it doesn't already exist)
class MovieRate {
  // If language permits this should be declared abstract
}

class PG13MovieRate extends MovieRate {
  //2. Move every *IF Body* to the former abstraction 
  warnIfNotAllowed(age) {
    if (age < 13)
      throw new Error("You are not allowed to watch this movie");    
  }
}

class AdultsOnlyMovieRate extends MovieRate {
  //2. Move every *IF Body* to the former abstraction 
  warnIfNotAllowed(age) {
    if (age < 18)
      throw new Error("You are not allowed to watch this movie");    
  }
}

class Movie {
  constructor(rate) {
    this.rate = rate;
  }
}

class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchMovie(movie) {
    // 3. Replace IF Call by polymorphic method call
    movie.rate.warnIfNotAllowed(this.age);     
    // watch movie
  }
}

let theExorcist = new Movie(new AdultsOnlyMovieRate());
let gremlins = new Movie(new PG13MovieRate());

let jane = new Moviegoer(12);

// jane.watchMovie(theExorcist);
// Jane cannot watch the exorcist since she is 12
// jane.watchMovie(gremlins);
// Jane cannot watch gremlins since she is 12

let joe = new Moviegoer(16);

// joe.watchMovie(theExorcist);
// Joe cannot watch the exorcist since he is 16
joe.watchMovie(gremlins);
// Joe CAN watch gremlins since he is 16
```

With this outcome:

1- Code is polluted with **IFs**.

*We should add no more **IFs**. Extending the model will be enough.

2- A default statement is missing.

*In this case default behaviour is no needed since exceptions break flow. In many times a Null Object will be enough.

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2012%20-%20Null/readme.md)

3- New ratings will bring new IFs.

*We will address it with polymorphic new instances.

4- The strings representing ratings are not first class objects. A typo will introduce hard to find errors.

*This is hidden in Ratings implementation.*

5- We are forced to add getters on *Movies* to take decisions.

*We will clear this problem favoring [Demeter's Law](https://en.wikipedia.org/wiki/Law_of_Demeter).*

[Code Smell 08 - Long Chains Of Collaborations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md)

* * *

## Breaking this collaborator chain

[Gist Url]: # (https://gist.github.com/mcsee/49382a7cff708d0b4a8c2e602295484f)
```javascript
 movie.rate.warnIfNotAllowed(this.age);  
```

[Gist Url]: # (https://gist.github.com/mcsee/c41292108e66a2db187151c10f690230)
```javascript
class Movie {
  constructor(rate) {
    this._rate = rate; // Rate is now private
  }
  warnIfNotAllowed(age) {
    this._rate.warnIfNotAllowed(age);
  }
}

class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchMovie(movie) { 
    movie.warnIfNotAllowed(this.age);     
    // watch movie
  }
}
```

Rating is private so we don't break encapsulation.

As a consequence we are safe to avoid *getters*.

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

## Applying the recipe to all IF conditions

Now we have the secret formula we can go further and try to remove the *essential* **IF condition** related to age.

[Gist Url]: # (https://gist.github.com/mcsee/884f18fcdf4e1ada78a4ad095abb5c1e)
```javascript
class Age {
}

class AgeLessThan13 extends Age {
  assertCanWatchPG13Movie() {
    throw new Error("You are not allowed to watch this movie");    
  }
  assertCanWatchAdultMovie() {
    throw new Error("You are not allowed to watch this movie");    
  }
}

class AgeBetween13And18 extends Age {
  assertCanWatchPG13Movie() {
    // No Problem
  }
  assertCanWatchAdultMovie() {
    throw new Error("You are not allowed to watch this movie");    
  }
}

class MovieRate {
  // If language permits this should be declared abstract
  // abstract assertCanWatch();
}

class PG13MovieRate extends MovieRate {
  //2. Move every *IF Body* to the former abstraction 
  assertCanWatch(age) {
    age.assertCanWatchPG13Movie()    
  }
}

class AdultsOnlyMovieRate extends MovieRate {
  //2. Move every *IF Body* to the former abstraction 
  assertCanWatch(age) {
     age.assertCanWatchAdultMovie()      
  }
}

class Movie {
  constructor(rate) {
    this._rate = rate; // Rate is now private
  }
  watchByMe(moviegoer) {
    this._rate.assertCanWatch(moviegoer.age);
  }
}

class Moviegoer {
  constructor(age) {
    this.age = age;
  }
  watchMovie(movie) { 
    movie.watchByMe(this);  
  }
}

let theExorcist = new Movie(new AdultsOnlyMovieRate());
let gremlins = new Movie(new PG13MovieRate());

let jane = new Moviegoer(new AgeLessThan13());

// jane.watchMovie(theExorcist);
// Jane cannot watch the exorcist since she is 12
// jane.watchMovie(gremlins);
// Jane cannot watch gremlins since she is 12

let joe = new Moviegoer(new AgeBetween13And18());

// joe.watchMovie(theExorcist);
// Joe cannot watch the exorcist since he is 16
joe.watchMovie(gremlins);
// Joe CAN watch gremlins since he is 16
```

We replaced all **IFs**. In the later case using [Double Dispatch Technique](https://en.wikipedia.org/wiki/Double_dispatch)

We used our formula and it worked. But there's a smell of **over design**.

1. Classes representing Ages are not related to real concepts on our [model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).
2. Model is too complex.
3. We will need new classes related to new age groups.
4. Age groups might not be disjoint.

We should avoid the last design and set a **clear boundary** between *essential* and *accidental* ifs.

>> A Good design rule is to create abstractions if they belong to the same domain (movies and ratings) and don't do it if they cross domains (movies and ages).

## Do Ifs stink?

According to evidence shown above. We should consider many *IFs* to be a code smell and tackle them with our recipe.

https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism

## Why this is happening?

This article (and many others) recommend avoiding most **IF sentences**. 
This will be very hard for all developers very comfortable with its usage.

Remember, Laziness and hidden assumptions are very rooted on our profession. We have been (ab)using **IFs** for decades and our software is not the best version of it. 

This is a root cause analysis of a serious SSL defect on IOS caused by a lazy case:

https://blog.codecentric.de/en/2014/02/curly-braces/

This article's thesis suggests there's a correlation between **IFs/Switch/Case** and defects.

You should give a try and avoid **IF conditionals.**

# Conclusions

With this simple technique we will be able to remove, in a procedural way, all accidental ifs.

This will make our models less coupled and more extensive.

Null object pattern is a special case of this technique. We will be able to remove all NULLs since:

> NULL ifs are always accidental.

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Credits

We have been using *If removal technique* at [Universidad de Buenos Aires](https://exactas.uba.ar/) for several years. Kudos to all my fellow teachers for all the experience we gathered together with it. 
 
![New Requirement](https://cdn.hashnode.com/res/hashnode/image/upload/v1604269685142/ID_Gu56EQ.jpeg)

* * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)




