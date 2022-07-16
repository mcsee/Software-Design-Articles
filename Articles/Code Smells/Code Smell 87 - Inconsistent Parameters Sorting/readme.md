# Code Smell 87 - Inconsistent Parameters Sorting

![Code Smell 87 - Inconsistent Parameters Sorting](lance-grandahl-VSXT9AV19Is-unsplash.jpg)

*Be consistent with the parameters you use. Code is prose.*

> TL;DR: Don't confuse you readers. Keep the order.

# Problems

- Readability

- Consistency

# Solutions

1. Refactor and change parameters order.

2. Use [named parameters](https://en.wikipedia.org/wiki/Named_parameter)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1f21534bd7ddf9390271ed0badd7352b)
```javascript
function giveFirstDoseOfVaccine(person, vaccine) {
  //
}

function giveSecondDoseOfVaccine(vaccine, person) {
  //
}


giveFirstDoseOfVaccine(jane, pfizer);
giveSecondDoseOfVaccine(jane, pfizer);  // Unnoticed mistake
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/e33e4b69f36750d7a24621f70aba155c)
```javascript
function giveFirstDoseOfVaccine(person, vaccine) {
  //
}

function giveSecondDoseOfVaccine(person, vaccine) {
  //
}


giveFirstDoseOfVaccine(jane, pfizer);
giveSecondDoseOfVaccine(jane, pfizer);  // Jane is immunized
```

# Detection

- Some very smart linters may be able to compare arguments and hint for possible mistakes.

# Tags

- Readability

# Conclusion

This is a very simple smell. 

Readability is very important to avoid mistakes.

# Relations

[Code Smell 10 - Too Many Arguments](Code Smells\Code Smell 10 - Too Many Arguments)

# Credits

Photo by [Lance Grandahl](https://unsplash.com/@lg17) on [Unsplash](https://unsplash.com/s/photos/disorder)
  
[Twitter](https://twitter.com/1441462443364864006)

* * *

> Computers are good at following instructions, but not at reading your mind.

_Donald Knuth_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()