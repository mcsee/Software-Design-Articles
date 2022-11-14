# Code Smell 126 - Fake Null Object

![Code Smell 126 - Fake Null Object](Code%20Smell%20126%20-%20Fake%20Null%20Object.jpg)

*Null Objects are great alternatives to The Billion Dollar Mistake. Sometimes we don't need them*

![Fake Null Object](Code%20Smell%20126%20-%20Fake%20Null%20Object.jpg)

> TL;DR: Don't abuse patterns. Even NullObject.

# Problems

- Empty Classes

- Namespace Polluting

- Duplicated Behavior

# Solutions

1. Create [Null Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) instantiating real-object classes.

# Context

Null Object pattern is a great alternative to [Nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md) and [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md) (Both are code smells).

The structure of the pattern tells us to create a hierarchy.

This is not really necessary, we need real objects to be polymorphic to null objects.

Inheritance is not a proper way to achieve polymorphism.

A simple solution is to create a real object behaving like a null one.

For example: '0' is numbers' null object.

'' (or "") is String's null object

An empty collection is collection's null object.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/36ff0b92d6365291ba000de230e3924e)
```java
abstract class Address {
	public abstract String getCity();
	public abstract String getState();
	public abstract String getZipCode();
}

// Using inheritance for null objects is a mistake
// We should use interfaces (when available)
public class NullAddress extends Address {
	
	public NullAddress() { }
	
	public String getCity() {
		return Constants.EMPTY_STRING;
	}

	public String getState() {
		return Constants.EMPTY_STRING;
	}

	public String getZipCode() {
		return Constants.EMPTY_STRING;
	}

}

public class RealAddress extends Address {
	
	private String zipCode;
	private String city;
	private String state;

	public RealAddress(String city, String state, String zipCode) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
	}

	public String getZipCode() {
		return zipCode;
	}
	
	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/baa5c877b821b807ef9c691569a4174d)
```java
// There are just "addresses"
public class Address {
	
	private String zipCode;
	private String city;
	private String state;

	public Address(String city, String state, String zipCode) {
    // Looks anemic :(
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
	}

	public String zipCode() {
		return zipCode;
	}
	
	public String city() {
		return city;
	}

	public String state() {
		return state;
	}

}

Address nullAddress = new Address(Constants.EMPTY_STRING, Constants.EMPTY_STRING, Constants.EMPTY_STRING);
// we have our null object
// we should NOT assign it to a singleton, static or global
// It behaves like a null object. That's enough
// No premature optimizations

```

# Detection

[X] Manual

This is a semantic smell.

# Tags

- Null

# Conclusion

Creating Null Object classes is sometimes overdesign.

We need to create a real object.

This real object should never be [global](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md), [singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md), or [static](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md).

Too many smells to avoid.

# Relations

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md) 

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

# More Info

- [Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

- [Null Object Wikipedia](https://en.wikipedia.org/wiki/Null_object_pattern)

- [Refactoring.guru](https://refactoring.guru/es/introduce-null-object)

# Credits

Photo by [Juan Davila](https://unsplash.com/@juanster) on [Unsplash](https://unsplash.com/s/photos/void)
  
Thanks to Hernan Wilkinson for this idea on his course [Diseño a la Gorra](https://academia.10pines.com/disenio_a_la_gorra) (in Spanish)  

* * *

> All models are wrong but some models are useful

_George Box_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)