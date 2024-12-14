# Code Smell 62 - Flag Variables

![Code Smell 62 - Flag Variables](Code%20Smell%2062%20-%20Flag%20Variables.gif)

> TL;DR: Fun with Flags

*Flags indicate what happened. Unless their name is too generic.*

# Problems

-  Readability
 
- Maintainability

- Coupling

# Solutions

1.  Use meaningful names

2. Try to avoid flags. They generate coupling.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/694068de9cd2bbb8592d1a14bd89fe9e) -->

```php
<?

function dummy() {

    $flag = true;

    while ($flag == true) {

        $result = checkSomething();
        if ($result) {
            $flag = false;
        }
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/8a0de13a6fb13ae4da9c51a1b91c9705) -->

```php
<?

function dummy()
{
    $atLeastOneElementWasFound = false;

    while (!$atLeastOneElementWasFound) {

        $elementSatisfies = doSomething();
        if ($elementSatisfies) {
            $atLeastOneElementWasFound = true;
        }
    }
}
```

# Detection

We can search all the code for bad named flags.

# Tags

- Readability

# Conclusion

Flags are widespread on production code. We should restrict their usage and use clear and intention revealing names.
 
# Relations

[Code Smell 51 - Double Negatives](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2051%20-%20Double%20Negatives/readme.md)

[Code Smell 07 - Boolean Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2007%20-%20Boolean%20Variables/readme.md)

[Code Smell 118 - Return False](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20118%20-%20Return%20False/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/Boolean_flag)

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

* * *

> If you lie to the compiler, it will get its revenge.

_Henry Spencer_

* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)