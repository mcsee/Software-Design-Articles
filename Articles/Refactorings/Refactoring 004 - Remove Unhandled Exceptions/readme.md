# Refactoring 004 - Remove Unhandled Exceptions

![Refactoring 004 - Remove Unhandled Exceptions](Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions.jpg)

*Creating YAGNI exception classes pollutes our environment. Let's remove them.*

> TL;DR: Remove unnecessary and not references empty exception classes.

# Problems Addressed

- Empty Classes

- Namespace Polluted

# Related Code Smells

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

# Steps

1. Check there are no references to the empty exception class.

2. Replace the throw sentence with a generic one.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/c95a843d906b0e339ec617779f79f538)

```ruby
class RangeNotSatisfiedException < StandardError
end

begin
    raise RangeNotSatisfiedException.new "Range must be betweet 0 and 10"
rescue RangeNotSatisfiedException => e
    puts e.message 
    puts e.exception_type 
end
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/63915cf29a543ce091267619bb21917b)

```ruby
# 1. Check there are no references to the empty exception class.

# 2. Replace the throw sentence with a generic one.

begin
    raise StandardError.new "Range must be betweet 0 and 10"
rescue StandardError => exception
    puts exception.message 
    puts exception.exception_type 
end
```

# Type

[X] Automatic

If the Exception class has no references we can perform a Safe Remove and replace it with *Exception* class.

# Why the code is better?

- We remove an empty class nobody uses. 

- We shrink the code

# Limitations

If we need to declare an empty exception class as documentation for an API module, our clients might need to catch it.

This is a [gold plating](https://en.wikipedia.org/wiki/Gold_plating_(project_management) and [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) example.

# Tags

- Clean up

# Related Refactorings

- Safe Remove

# Credits

Image by [danielkirsch](https://pixabay.com/es/users/danielkirsch-4218687/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.