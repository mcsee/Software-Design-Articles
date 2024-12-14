# Code Smell 189 - Not Sanitized Input
            
![Code Smell 189 - Not Sanitized Input](Code%20Smell%20189%20-%20Not%20Sanitized%20Input.jpg)

*Bad actors are there. We need to be very careful with their input.*

> TL;DR: Sanitize everything that comes from outside your control.

# Problems

- Security

# Solutions

1. Use sanitization and input filtering techniques.

# Context

Whenever you get input from an external resource, a security principle requests you to validate and check for potentially harmful inputs.

[SQL Injection](https://en.wikipedia.org/wiki/SQL_injection) is a notable example of a threat.

We can also add [assertions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2015%20-%20Missed%20Preconditions/readme.md) and invariants to our inputs.

Even better, we can work with [Domain Restricted Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20178%20-%20Subsets%20Violation/readme.md).

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/d72d1e6617755cd8eff723b4dba90078) -->

```python
user_input = "abc123!@#"
# This content might not be very safe 
# if you expect just alphanumeric characters
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/2c19c64f268afb946ee8560e19cf444f) -->

```python
def sanitize(string):
  # Remove any characters that are not letters or numbers
  sanitized_string = re.sub(r'[^a-zA-Z0-9]', '', string)
  
  return sanitized_string

user_input = "abc123!@#"
print(sanitize(user_input))  # Output: "abc123"
```

# Detection

[X] Semi-Automatic 

We can statically check all the inputs and also we can also use penetration testing tools.

# Tags

- Security

# Conclusion

We need to be very cautious with the inputs beyond our control.

# Relations

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 178 - Subsets Violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20178%20-%20Subsets%20Violation/readme.md)

[Code Smell 15 - Missed Preconditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2015%20-%20Missed%20Preconditions/readme.md)

[Code Smell 207 - Dynamic Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20207%20-%20Dynamic%20Methods/readme.md)

[Code Smell 215 - Deserializing Object Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20215%20-%20Deserializing%20Object%20Vulnerability/readme.md)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/SQL_injection)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Jess Zoerb](https://unsplash.com/@jzoerb) on [Unsplash](https://unsplash.com/photos/UGCgoVmFZC0)
    
* * *

> Companies should make their own enterprise systems as often as network security companies should manufacture their own aspirin.

_Phil Simon_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)