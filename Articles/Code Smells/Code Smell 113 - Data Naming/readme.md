# Code Smell 113 - Data Naming

![Code Smell 113 - Data Naming](data.jpg)

*Use entity domain names to model entity domain objects.*

> TL;DR: Don't name your variables as Data.

# Problems

- Readability

- Bad Naming

# Solutions

1. Use role suggesting names.

2. Find names in the [Bijection](Theory\The One and Only Software Design Principle).

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

We can only infer it through behaviour.

We don't know the current temperature. We observe our thermometer pointing at 35 Degrees.

Our variables should reflect the domain and role they are fulfilling. 

Naming them as 'data' is lazy and hinders readability.

# Relations

[Code Smell 01 - Anemic Models](Code Smells\Code Smell 01 - Anemic Models)

[Code Smell 65 - Variables Named after Types](Code Smells\Code Smell 65 - Variables Named after Types)

# More Info

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

* * *

> Twenty percent of all input forms filled out by people contain bad data.

_Dennis Ritchie_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)