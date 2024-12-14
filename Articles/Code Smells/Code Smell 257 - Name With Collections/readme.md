# Code Smell 257 - Name With Collections
            
![Code Smell 257 - Name With Collections](Code%20Smell%20257%20-%20Name%20With%20Collections.jpg)

*Avoid Using the Prefix "Collection" on Properties*

> TL;DR: Drop "collection" prefix for clarity.

# Problems

- Redundant Naming

- Verbose Code

- Reduced Readability

- Refactoring Challenges

- Coupled to implementation

# Solutions

1. Use Simple Names

2. Remove 'collection' [from the name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

3. Use plural names without the word 'collection'

# Context

When you prefix properties with terms like "collection," you introduce redundancy and verbosity into your code. 

This makes your code harder to read and maintain and adds unnecessary complexity. 

Coupling the name to a collection implementation prevents you from introducing a proxy or middle object to manage the relation.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b929bfe2ee406a7d9a822c5318db5b61) -->

```rust
struct Task {
    collection_of_subtasks: Vec<Subtask>,
    subtasks_collection: Vec<Subtask>,
}

impl Task {
    fn add_subtask(&mut self, subtask: Subtask) {
        self.collection_of_subtasks.push(subtask);
        self.subtasks_collection.push(subtask);
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/1c4c774f018e5f6cde339148962a4562) -->

```rust
struct Task {
    subtasks: Vec<Subtask>,
}

impl Task {
    fn add_subtask(&mut self, subtask: Subtask) {
        self.subtasks.push(subtask);
    }
}
```

# Detection

[X] Automatic 

You can add rules to your linter preventing these redundant names.

# Tags

- Naming

# Level

[X] Beginner

# AI Generation

AI code generators produce this smell if they try to over-describe property names. 

They tend to generate overly verbose names to be explicit, which can lead to redundancy.

# AI Detection

AI tools can fix this smell if you instruct them to simplify property names. They can refactor your code to use more concise and clear names.

# Conclusion

Simplifying property names by removing prefixes like "collection" leads to more readable and maintainable code.

It would be best to focus on clear, direct names that communicate the purpose without redundancy.

# Relations

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 171 - Plural Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20171%20-%20Plural%20Classes/readme.md)

[Code Smell 113 - Data Naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20113%20-%20Data%20Naming/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Karen Vardazaryan](https://unsplash.com/@bright) on [Unsplash](https://unsplash.com/photos/die-cast-car-collection-on-rack-JBrfoV-BZts)
   
* * *

> Good design adds value faster than it adds cost.

_Thomas C. Gale_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)