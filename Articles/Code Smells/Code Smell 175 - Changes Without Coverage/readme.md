# Code Smell 175 - Changes Without Coverage
            
![Code Smell 175 - Changes Without Coverage](Code%20Smell%20175%20-%20Changes%20Without%20Coverage.jpg)

*If your merge request has no test changed, you haven't finished your job*

> TL;DR: Don't change the code without breaking some tests.

# Problems

- Quality

- Maintainability

# Solutions

1. Cover your code.

# Context

When you need to make a change, you need to update the live specification of your code.

That's what tests are for.

Instead of generating dead documentation of what your code does, you should write a covering use scenario.

If you change uncovered tests, you need to add coverage.

Suppose you change the code with existing coverage. Lucky you! Go and change your broken tests.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/51317c09b8994b6cb57e09e2059a5d9b) -->

```typescript
export function sayHello(name: string): string {
  const lengthOfName = name.length;
-  const salutation =
-  `How are you ${name}?, 
-    I see your name has ${lengthOfName} letters!`;
+  const salutation = 
+  `Hello ${name}, I see your name has ${lengthOfName} letters!`;
  return salutation;
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/7a5adcac0ead17d037924b6fd47888fb) -->

```typescript
export function sayHello(name: string): string {
  const lengthOfName = name.length;
-  const salutation = 'How are you ${name}?,'
- 'I see your name has ${lengthOfName} letters!';
+  const salutation = `Hello ${name},'
+ 'I see your name has ${lengthOfName} letters!';
  return salutation;
}

import { sayHello } from './hello';

test('given a name produces the expected greeting', () => {
  expect(sayHello('Alice')).toBe(
    'Hello Alice, I see your name has 6 letters!'
  );
});
```

# Detection

[X] Automatic 

We can ensure all our merge requests include test code.

# Exceptions

If your code and your tests harness live in different repositories, you might have different pull requests.

# Tags

- Quality

# Conclusion

Test coverage is as important as functional code. 

The test system is our first and more loyal customer. 

We need to care for them.

# Relations

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)
 
# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Vincent Péré](https://unsplash.com/@vinzpr) on [Unsplash](https://unsplash.com/s/photos/umbrella)  

* * *

> Before you use a method in a legacy system, check to see if there are tests for it. If there aren�t, write them. When you do this consistently, you use tests as a medium of communication.

_Michael Feathers_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)