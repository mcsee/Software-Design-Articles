# Code Smell 207 - Dynamic Methods
            
![Code Smell 207 - Dynamic Methods](Code%20Smell%20207%20-%20Dynamic%20Methods.jpg)

*Metaprogramming is fancy. but it is not free*

> TL;DR: Don't add dynamic behavior with metaprogramming

# Problems 😔 

- Readability

- Maintainability

- Harder to debug (The code is generated dynamically at runtime)

- Security Issues (if the configuration file is not properly [sanitized](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md))

- Single Responsibility Principle violation (mixing the concerns of model definition and configuration).

# Solutions 😃

1. Define the methods by hand

2. Use the [Decorator design pattern](https://en.wikipedia.org/wiki/Decorator_pattern)

# Context 💬

[Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md) is a powerful technique that allows you to write code that can generate, modify, or analyze other code at runtime. However, it can also lead to code that is difficult to understand, maintain, and debug. 
  
# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/38b69082f08a26158420fbfb1856e8c2) -->

```ruby
class Skynet < ActiveRecord::Base
  # dynamically add some attributes based on a configuration file
  YAML.load_file("attributes.yml")["attributes"].each do 
    |attribute|
      attr_accessor attribute
  end
  
  # define some dynamic methods based on a configuration file
  YAML.load_file("protocol.yml")["methods"].each do
    |method_name, method_body|
      define_method method_name do
        eval method_body
    end
  end
end
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7249e35ba5c33c91aa93388647d9f345) -->

```ruby
class Skynet < ActiveRecord::Base
  # define some attributes explicitly
  attr_accessor :asimovsFirstLaw, :asimovsSecondLaw, :asimovsThirdLaw
  
  # define some methods explicitly
  def takeoverTheWorld
    # implementation
  end    
end
```

# Detection 🔍

[X] Automatic 

We have a whitelist of valid usages or directly ban some methods.

# Tags 🏷️

- Metaprogramming

# Conclusion 🏁

 Metaprogramming often involves using complex code and abstractions that can make the resulting code difficult to read and maintain. This can make it harder for other developers to understand and modify the code in the future, leading to increased complexity and bugs.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

# More Information 📕

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Brett Jordan](https://unsplash.com/@brett_jordan) on [Unsplash](https://unsplash.com/photos/GQCYOS_MH0w)
    
* * *

> A year spent in artificial intelligence is enough to make one believe in God.

_Alan Perlis_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)