# Code Smell 233 - Collections Count
            
![Code Smell 233 - Collections Count](Code%20Smell%20233%20-%20Collections%20Count.jpg)

*You count collections or collections.count?*

> TL;DR: Chose narrow names

# Problems

- Bad Naming

# Solutions

1. Accurately describe your collections

# Refactorings

%[

# Context


# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/75e43eb48e025f1e41e65c1e7439c7b7)
```javascript
const standardModelParticles = {
  quarks: [
    {
      name: "Up",
      charge: "2/3",
      type: "Quark",
    },
    {
      name: "Down",
      charge: "-1/3",
      type: "Quark",
    },
    // ...
  ],
  leptons: [
    {
      name: "Electron",
      charge: "-1",
      type: "Lepton",
    },
    {
      name: "Muon",
      charge: "-1",
      type: "Lepton",
    },
    // ...
  ],
  gaugeBosons: [
    {
      name: "Photon",
      charge: "0",
      type: "Boson",
    },
    {
      name: "W Boson",
      charge: "Â±1",
      type: "Boson",
    },
    // ...
  ],
  higgsBoson: [
    {
      name: "Higgs Boson",
      charge: "0",
      type: "Scalar Boson",
    },
  ],
};
 
const quarks = standardModelParticles.quarks.length; 
// Bad names name. It is not representing a count
```

## Right

%[quarkCount]

# Detection

[X] SemiAutomatic 

Some linters can check the types and names and infer a mistake

# Exceptions

-

# Tags

- 

# Conclusion



# Relations

%[

# More Info

[]()

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Sandy Millar](https://unsplash.com/@sandym10) on [Unsplash](https://unsplash.com/photos/a-group-of-three-nesting-dolls-sitting-on-top-of-a-wooden-table-5PCeHBkMCmk)
    
* * *

> Some people are good programmers because they can handle many more details than most people. But there are a lot of disadvantages in selecting programmers for that reason — it can result in programs that no one else can maintain.

_Butler Lampson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)