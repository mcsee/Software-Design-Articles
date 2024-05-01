# Code Smell 113 - Data Naming

![Code Smell 113 - Data Naming](Code%20Smell%20113%20-%20Data%20Naming.jpg)

*Use entity domain names to model entity domain objects.*

> TL;DR: Don't name your variables as Data.

# Problems

- Readability

- Bad Naming

# Solutions

1. Use role suggesting names.

2. Find names in the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# Context

We use 'data' a lot in our variables.

We are used to doing it.

Using this kind of name favors the anemic treatment of objects.

We should think about domain-specific and role-suggesting names.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/0c0c6b9e9e8a5b2aa4dfe32828c9cbc5)

```javascript
if (!dataExists()) {
  return '<div>Loading Data...</div>';
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/945e6a64fd3167637ff1e1eb872ff179)

```javascript
if (!peopleFound()) {
  return '<div>Loading People...</div>';
}
```

# Detection

[X] Semi-Automatic 

We can check for this substring on our code and warn our developers.

# Tags

- Readability

- Naming

# Conclusion

Data is everywhere if you see the world as only data.

We can never see the data we manipulate. 

We can only infer it through behavior.

We don't know the current temperature. We observe our thermometer pointing at 35 Degrees.

Our variables should reflect the domain and role they are fulfilling. 

Naming them as 'data' is lazy and hinders readability.

# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 65 - Variables Named after Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

* * *

> Twenty percent of all input forms filled out by people contain bad data.

_Dennis Ritchie_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)