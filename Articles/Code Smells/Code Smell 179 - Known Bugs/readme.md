# Code Smell 179 - Known Bugs
            
![Code Smell 179 - Known Bugs](Code%20Smell%20179%20-%20Known%20Bugs.jpg)

*Every software has a list of known bugs. Why?*

> TL;DR: Don't track bugs. Fix them.

# Problems

- Hard to-track lists

- Technical Debt

- Functional Debt

# Solutions

0. Stop calling it a [Bug](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)

1. Reproduce the [Defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

2. Cover the scenario with automation

3. Make the most straightforward fix (even hardcoding solutions)

4. Refactor

Welcome to TDD!

# Context

We don't like to be interrupted. 

Then, we create lists and delay fixes and solutions.

We should be able to change software easily.

We need to improve our software if we can't do quick fixes and corrections. 

Not by creating To-Fix lists.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/352ade4d98a059ed49e4312ae3bab44e)

```php
<?

function divide($numerator, $denominator) {
  return $numerator / $denominator;  
  // FIXME denominator value might be 0
  // TODO Rename function
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/d1323654df40648970e8058c0cbd55cc)

```php
<?

function integerDivide($numerator, $denominator) {
  if (denominator == 0) {
    throw new DivideByZero();
  }
  return $numerator / $denominator;  
}

// You pay your debts
```

# Detection

[X] Automatic 

We need to avoid creating bugs and issues.

# Tags

- Technical Debt

# Conclusion

We need to discourage bugs and issue trackers on the engineering side.

Of course, customers need to track their findings and we need to address them ASAP.

# Relations

[Code Smell 148 - ToDos](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md)

# More Info

[Famous Bugs](https://en.wikipedia.org/wiki/List_of_software_bugs)

[Stop Calling them 'Bugs'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Justin Lauria](https://unsplash.com/@justinlauria) on [Unsplash](https://unsplash.com/s/photos/bug)
  
* * *

> In general, the longer you wait before fixing a bug, the costlier (in time and money) it is to fix.

_Joel Spolsky_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)