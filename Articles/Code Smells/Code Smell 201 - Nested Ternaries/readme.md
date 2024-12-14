# Code Smell 201 - Nested Ternaries
            
![Code Smell 201 - Nested Ternaries](Code%20Smell%20201%20-%20Nested%20Ternaries.jpg)

*Arrow Code, Nested Conditions, switches, else, and many more*

> TL;DR: Don't use nested IFs or nested ternaries

# Problems

- Readability

- Default Case

# Solutions

1. Rewrite the code as an IF condition with an early return

# Context

Nesting is always a problem with complexity. 

We can fix it with polymorphism or early returns

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/45754a6d586d067627c4796748686384) -->

```javascript
const getUnits = secs => (
 secs <= 60       ? 'seconds' :
 secs <= 3600     ? 'minutes' :
 secs <= 86400    ? 'hours'   :
 secs <= 2592000  ? 'days'    :
 secs <= 31536000 ? 'months'  :
                    'years' 
)
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/4ac913c6d842c4f0fc9d8e9998348335) -->

```javascript
const getUnits = secs => {
 if (secs <= 60) return 'seconds'; 
 if (secs <= 3_600) return 'minutes'; 
 if (secs <= 86_400) return 'hours';   
 if (secs <= 2_592_000) return 'days';    
 if (secs <= 31_536_000) return 'months';  
 return 'years' 
}

// This is using ‘Numeric Separators’ notation from Javascript
// to favor readability.
// The underscores are ignored by the JavaScript engine
// and do not affect the value of the number.

const getUnits = secs => {
 if (secs <= 60) return 'seconds'; 
 if (secs <= 60 * 60) return 'minutes'; 
 if (secs <= 24 * 60 * 60) return 'hours';   
 if (secs <= 30 * 24 * 60 * 60) return 'days';    
 if (secs <= 12 * 30 * 24 * 60 * 60) return 'months';  
 return 'years' 
}

// You can read the premature optimization chapter to find out
// if this brings a considerable performance penalty
```

# Detection

[X] Automatic 

Linters can detect this complexity using parsing trees.

# Tags

- IFs

# Conclusion

We must deal with [accidental complexity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) to improve code readability.

# Relations

[Code Smell 133 - Hardcoded IF Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions/readme.md)

[Code Smell 78 - Callback Hell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)
 
# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [NIKHIL](https://unsplash.com/@vinikhill) on [Unsplash](https://unsplash.com/photos/pThIEv416pE)
  
  * * *

> One of the best things to come out of the home computer revolution could be the general and widespread understanding of how severely limited logic really is.

*Frank Herbert*
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)