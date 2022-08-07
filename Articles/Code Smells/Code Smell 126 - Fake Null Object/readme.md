# Code Smell 126 - Fake Null Object

![Code Smell 126 - Fake Null Object](juan-davila-WBMEwUsMWMQ-unsplash.jpg)

*Null Objects are great alternatives to The Billion Dollar Mistake. Sometimes we don't need them*

![Fake Null Object](juan-davila-WBMEwUsMWMQ-unsplash.jpg)

> TL;DR: Don't abuse patterns. Even NullObject.

# Problems

- Empty Classes

- Namespace Polluting

- Duplicated Behavior

# Solutions

1. Create [Null Objects](Theory\Null - The Billion Dollar Mistake) instantiating real-object classes.

# Context

Null Object pattern is a great alternative to [Nulls](Code Smells\Code Smell 12 - Null) and [IFs](Code Smells\Code Smell 36 - Switch case elseif else if statements) (Both are code smells).

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

This real object should never be [global](Code Smells\Code Smell 17 - Global Functions), [singleton](Code Smells\Code Smell 32 - Singletons), or [static](Code Smells\Code Smell 18 - Static Functions).

Too many smells to avoid.

# Relations

[Code Smell 12 - Null](Code Smells\Code Smell 12 - Null)

[Code Smell 32 - Singletons](Code Smells\Code Smell 32 - Singletons)

[Code Smell 114 - Empty Class](Code Smells\Code Smell 114 - Empty Class)

[Code Smell 18 - Static Functions](Code Smells\Code Smell 18 - Static Functions) 

[Code Smell 17 - Global Functions](Code Smells\Code Smell 17 - Global Functions)

# More Info

- [Null: The Billion Dollar Mistake](Theory\Null - The Billion Dollar Mistake)

- [Null Object Wikipedia](https://en.wikipedia.org/wiki/Null_object_pattern)

- [Refactoring.guru](https://refactoring.guru/es/introduce-null-object)

# Credits

Photo by [Juan Davila](https://unsplash.com/@juanster) on [Unsplash](https://unsplash.com/s/photos/void)
  
Thanks to Hernan Wilkinson for this idea on his course [Diseño a la Gorra](https://academia.10pines.com/disenio_a_la_gorra) (in Spanish)  

* * *

> All models are wrong but some models are useful

_George Box_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()