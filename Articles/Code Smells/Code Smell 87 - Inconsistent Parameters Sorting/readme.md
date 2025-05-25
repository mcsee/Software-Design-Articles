# Code Smell 87 - Inconsistent Parameters Sorting

![Code Smell 87 - Inconsistent Parameters Sorting](Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting.jpg)

*Be consistent with the parameters you use. Code is prose.*

> TL;DR: Don't confuse you readers. Keep the order.

# Problems 😔 

- Readability

- Consistency

# Solutions 😃

1. Refactor and change parameters order.

2. Use [named parameters](https://en.wikipedia.org/wiki/Named_parameter)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1f21534bd7ddf9390271ed0badd7352b) -->

```javascript
function giveFirstDoseOfVaccine(person, vaccine) { }

function giveSecondDoseOfVaccine(vaccine, person) { }

giveFirstDoseOfVaccine(jane, flu);
giveSecondDoseOfVaccine(jane, flu);  
//Unnoticed mistake since you changed the parameters’ order
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e33e4b69f36750d7a24621f70aba155c) -->

```javascript
function giveFirstDoseOfVaccine(person, vaccine) { }

function giveSecondDoseOfVaccine(person, vaccine) { }

giveFirstDoseOfVaccine(jane, flu);
giveSecondDoseOfVaccine(jane, flu);
```

# Detection 🔍

- Some very smart linters may be able to compare arguments and hint for possible mistakes.

# Tags 🏷️

- Readability

# Level 🔋

[X] Beginner

# Conclusion 🏁

This is a very simple smell. 

Readability is very important to avoid mistakes.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 188 - Redundant Parameter Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)

# Credits 🙏

Photo by [Lance Grandahl](https://unsplash.com/@lg17) on [Unsplash](https://unsplash.com/s/photos/disorder)
  
%[https://twitter.com/BelloneDavide/status/1441462443364864006]

* * *

> Computers are good at following instructions, but not at reading your mind.

_Donald Knuth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)