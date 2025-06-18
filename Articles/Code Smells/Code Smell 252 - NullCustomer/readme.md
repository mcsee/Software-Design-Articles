# Code Smell 252 - NullCustomer
            
![Code Smell 252 - NullCustomer](Code%20Smell%20252%20-%20NullCustomer.jpg)

*You love Null Object Design Patter because it avoids the billion-dollar mistake*

> TL;DR: Prefer real domain names to Implementation names

# Problems 😔 

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Naming

# Solutions 😃

1. Search for a real-world metaphor

# Context 💬

Naming is essential when designing software.

Using Pattern Names is a common [software problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md) where programmers bind design patterns to real-world concepts.

You need to search for these abstractions in the real world and name them after their essential behavior instead of the accidental structure.

Null Customers don't exist in the same way [NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) doesn't exist.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/b13e79a85fdd706f17dfff192a8a4b6f) -->

```react
import React from 'react';

const NullCustomer = () => {
  return (
    <div>
      <h2>No customer found</h2>
      <p>Sorry, we couldn't find any customer 
        matching your criteria.</p>
    </div>
  );
};

const App = () => { 
  const customerDataAvailable = false;

  return (
    <div>
      <h1>Customer Details</h1>
      {customerDataAvailable ? (
        <div>
          {/* Render customer data */}
          <h2>Customer Name: Cosmo Kramer</h2>
          <p>Email: cosmo.kramer@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      ) : (
        <NullCustomer />
      )}
    </div>
  );
};

export default App;
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/15f41dcd4d4f1c89e8b31348d6649740) -->

```react
import React from 'react';

// This is more closely related to real world
const NonExistentCustomer = () => {
  return (
    <div>
      <h2>Non Existent customer</h2>
      <p>Sorry, we couldn't find any customer 
        matching your criteria.</p>
    </div>
  );
};

const App = () => { 
  const customerDataAvailable = false;

  return (
    <div>
      <h1>Customer Details</h1>
      {customerDataAvailable ? (
        <div>
          {/* Customer exists */}
          <h2>Customer Name: Newman</h2>
          <p>Email: newman@example.com</p>
          <p>Phone: 666-666-6666</p>
        </div>
      ) : (
        <NonExistentCustomer />
      )}
    </div>
  );
};

export default App;
```

# Detection 🔍

[X] Semi-Automatic 

You can search for names including implementation patterns and check if they represent a real-world concept

# Tags 🏷️

- Null 

# Level 🔋

[X] Beginner

# AI Generation 🤖

AI generators are better at finding these names and don't abuse design patterns unless we prompt them.

# AI Detection 🥃

When prompted to use better names with the wrong code tested AI suggested a few, but none detected by itself as a mistake.

# Conclusion 🏁

Some concepts are harder to find than others.

Choose your names wisely.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

# More Information 📕

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/photos/two-black-and-white-folding-chairs-on-beach-during-daytime-2-eCuma3qO0)
    
* * *

> We comfort ourselves with the belief that if the customers had just been happy with what they said they needed, the design would have been fine. It�s the customer's fault for changing the requirements on us.

_Robert Martin_
  
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)