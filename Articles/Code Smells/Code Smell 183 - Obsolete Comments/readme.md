# Code Smell 183 - Obsolete Comments
            
![Code Smell 183 - Obsolete Comments](Code%20Smell%20183%20-%20Obsolete%20Comments.jpg)

*Comments are a code smell. Obsolete comments are a real danger*

> TL;DR: Don't trust comments. They are dead.

# Problems

- Bad documentation

- Maintainability

# Solutions

1. Replace comments with tests

# Refactorings

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Context

We know comments add almost no value to our code.

We need to restrict comments only to very important decisions.

Since most people change logic and forget to update comments they might become obsolete easily.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/fd5b6b44920df66b6558be35f729f0f7)
```cpp
void Widget::displayHarvesterPlugin(Unit* unit)
{

 // TODO the Plugin will be modified soon, so I don't implement this right now

 if (!isVisible) {
	// hide all widgets
	return;
 }

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/36f9dde4301f0ab77c034aeba7c0b391)
```cpp
void Widget::displayHarvesterPlugin(Unit* unit)
{
 
 if (!isVisible) {
	// hide all widgets
	return;
 }

}
```

# Detection

[X] Semi-Automatic

We can warn for comments in our code and try to remove them.

# Exceptions

- Very important design decisions

# Tags

- Comments

# Conclusion

We need to think before adding a comment. Once It is in the codebase is beyond our control and can start to lie anytime.

# Relations

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 152 - Logical Comment](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20152%20-%20Logical%20Comment/readme.md)

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Volodymyr Hryshchenko](https://unsplash.com/@lunarts) on [Unsplash](https://unsplash.com/s/photos/obsolete)


* * *

Obsolete comments tend to migrate away from the code they once described. They become floating islands of irrelevance and misdirection in the code.

_Bob Martin_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)