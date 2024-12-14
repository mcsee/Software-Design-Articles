# Code Smell 184 - Exception Arrow Code
            
![Code Smell 184 - Exception Arrow Code](Code%20Smell%20184%20-%20Exception%20Arrow%20Code.jpg)

*Arrow code is a code smell. Exception polluting is another. This is a mortal combination.*

> TL;DR: Don't cascade your exceptions

# Problems

- Readability

- Complexity

# Solutions

1. Rewrite the nested clauses

# Context

In the same way [arrow code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md) is hard to read, handling exceptions is a usual case when we must address the topics in a cascade way.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/18a248332d86061c9cccdf5195a70ca8) -->

```java
class QuotesSaver {
    public void Save(string filename) {
        if (FileSystem.IsPathValid(filename)) {
            if (FileSystem.ParentDirectoryExists(filename)) {
                if (!FileSystem.Exists(filename)) {
                    this.SaveOnValidFilename(filename);
                } else {
                    throw new I0Exception("File exists: " + filename);
                }
            } else {
                throw new I0Exception("Parent directory missing at " + 
                    filename);
            }
        } else {
            throw new ArgumentException("Invalid path " + filename);
        }
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/7d40861212d1d475a25d740f10c8f34e) -->

```java
public class QuotesSaver {
    public void Save(string filename) {
        if (!FileSystem.IsPathValid(filename)) {
            throw new ArgumentException("Invalid path " + filename);
        } else if (!FileSystem.ParentDirectoryExists(filename)) {
            throw new I0Exception("Parent directory missing: " + filename);
        } else if (FileSystem.Exists(filename)) {
             throw new I0Exception("File exists: " + filename);
        }
        this.SaveOnValidFilename(filename);
    }
}
```

# Detection

[X] Semi-Automatic 

Some linters warn us when we have this kind of complexity

# Tags

- Exceptions

# Conclusion

Exceptions are less critical than normal cases.

If we need to read more exceptional code than normal then it is time to improve our code.

# Relations

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 119 - Stairs Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20119%20-%20Stairs%20Code/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Remy Gieling](https://unsplash.com/@gieling) on [Unsplash](https://unsplash.com/s/photos/archer)
  
* * *

> An error doesn't become a mistake until you refuse to correct it.

_Orlando Aloysius Battista_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
  