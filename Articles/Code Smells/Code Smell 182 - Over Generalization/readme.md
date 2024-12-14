# Code Smell 182 - Over Generalization
            
![Code Smell 182 - Over Generalization](Code%20Smell%20182%20-%20Over%20Generalization.jpg)

*We are refactoring fans. Sometimes we need to stop and think.*

> TL;DR: Don't make generalizations beyond real knowledge.

# Problems

- Overgeneralization

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation

# Solutions

1. Think before making structural generalizations

# Context

Refactoring is not just looking at structural code. 

We need to refactor behavior and check if it needs an abstraction.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/2b7734f1f6c0ab46a88a71b37464ceeb) -->

```rust
fn validate_size(value: i32) {
    validate_integer(value);
}

fn validate_years(value: i32) {
    validate_integer(value);
}

fn validate_integer(value: i32) {
    validate_type(value, :integer);
    validate_min_integer(value, 0);
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/1eca09d9bb13cea966bcbe2eda95021c) -->

```rust
fn validate_size(value: i32) {
 	validate_type(value, Type::Integer);
	validate_min_integer(value, 0);
}
	
fn validate_years(value: i32) {
	validate_type(value, Type::Integer);
	validate_min_integer(value, 0);
}
	
// Duplication is accidental, therefore you should not abstract it
```

# Detection

[X] Manual

This is a semantic smell.

# Tags

- Duplication

# Conclusion

Software development is a thinking activity. 

We have automated tools to help and assist us. We need to be in charge.

# Relations

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

# More Info

- [DRY—The Evils of Duplication](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Matthew Henry](https://unsplash.com/@matthewhenry) on [Unsplash](https://unsplash.com/s/photos/duplicate)  
  
* * *

> Duplication is far cheaper than the wrong abstraction.

_Sandi Metz_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)