# Code Smell 100 - GoTo

![Code Smell 100 - GoTo](Code%20Smell%20100%20-%20GoTo.jpg)

*GOTO was considered harmful 50 years ago*

> TL;DR: Don't ever use GoTo.

# Problems

- Readability

- Hard to follow code

# Solutions

1. Replace [GOTO](https://en.wikipedia.org/wiki/Goto) with structured code

2. Use exceptions

# Context

I started programming in Basic. 

GOTO was heavily abused there. 

I had to learn structured programming from scratch in Rehab mode.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5d76fda8dfbe6f351e709baa00e0e61c)
```go
for x < 0 {
    if x > -1e-09 {
      goto small
    }
    z = z / x
    x = x + 1
  }
  for x < 2 {
    if x < 1e-09 {
      goto small
    }
    z = z / x
    x = x + 1
  }

  if x == 2 {
    return z
  }

  x = x - 2
  p = (((((x*_gamP[0]+_gamP[1])*x+_gamP[2])*x+_gamP[3])*x+_gamP[4])*x+_gamP[5])*x + _gamP[6]
  q = ((((((x*_gamQ[0]+_gamQ[1])*x+_gamQ[2])*x+_gamQ[3])*x+_gamQ[4])*x+_gamQ[5])*x+_gamQ[6])*x + _gamQ[7]
  return z * p / q

small:
  if x == 0 {
    return Inf(1)
  }
  return z / ((1 + Euler*x) * x)
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/da74b8e901f234b6bc400c9a6e0b7725)
```go
for x < 0 {
    if x > -1e-09 {
      return small(x, z)
    }
    z = z / x
    x = x + 1
  }
  for x < 2 {
    if x < 1e-09 {
      return small(x, z)
    }
    z = z / x
    x = x + 1
  }

  if x == 2 {
    return z
  }

  x = x - 2
  p = (((((x*_gamP[0]+_gamP[1])*x+_gamP[2])*x+_gamP[3])*x+_gamP[4])*x+_gamP[5])*x + _gamP[6]
  q = ((((((x*_gamQ[0]+_gamQ[1])*x+_gamQ[2])*x+_gamQ[3])*x+_gamQ[4])*x+_gamQ[5])*x+_gamQ[6])*x + _gamQ[7]
  return z * p / q

small(x, z) {
  if x == 0 {
     return Inf(1)
   }
   return z / ((1 + Euler*x) * x)
 }
}
```

# Detection

[X] Automatic 

In languages supporting *GOTO*, our linters can warn us against its usage.

# Tags

- Readability

# Conclusion

We acknowledged GOTO problems a few decades ago.

The problem is still present in [modern languages](https://en.wikipedia.org/wiki/Goto) like GoLang, PHP, Perl etc.

Most programmers luckily avoid GOTO sentence. Next goal will be to consider harmful [null usage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

![goto xkcd](goto%20xkcd.png)

*Courtesy [XKCD](https://xkcd.com/292/)*

# Relations

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# More Info

- [Goto Statement considered harmful](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf)

- [Wikipedia](https://en.wikipedia.org/wiki/Goto)

# Credits

Photo by [Jens Johnsson](https://unsplash.com/@jens_johnsson) on [Unsplash](https://unsplash.com/s/photos/sign)  

* * *

It is practically impossible to teach good programming to students that have had a prior exposure to BASIC: as potential programmers they are mentally mutilated beyond hope of regeneration.

_Edsger Dijkstra_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)