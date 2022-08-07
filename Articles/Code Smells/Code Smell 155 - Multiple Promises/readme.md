# Code Smell 155 - Multiple Promises

![Code Smell 155 - Multiple Promises](alvin-mahmudov-JAQK2mwLCF0-unsplash.jpg)

*You have promises. You need to wait. Wait for them all*

> TL;DR: Don't block yourself in a sorted way.

# Problems

- Indeterminism

- Performance bottleneck

# Solutions

1. Wait for all promises at once.

# Context

We heard about semaphores while studying Operating Systems.

We should wait until all conditions are met no matter the ordering.

# Sample Code

## Wrong 

[Gist Url]: # (https://gist.github.com/mcsee/08e94e3b7dbf0fd20cc1d9c296d6fdbc)
```javascript
async fetchOne() { /* long task */ }
async fetchTwo() { /* another long task */ }

async fetchAll() {
  let res1 = await this.fetchOne(); 
  let res2 = await this.fetchTwo();
  // they can run in parallel !!  
}
                                 
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b1f4721f8b8db8da67435c499fcec83d)
```javascript
async fetchOne() { /* long task */ }
async fetchTwo() { /* another long task */ }

async fetchAll() {
  let [res3, res4] = await Promise.all([this.fetchOne(), this.fetchTwo()]);
  //We wait until ALL are done
}
```

# Detection

[X] Semi-Automatic 

This is a semantic smell. 

We can tell our linters to find some patterns related to promises waiting.

# Tags

- Performance

# Conclusion

We need to be as close as possible to [real-world]((Theory\What is (wrong with) software) business rules.

If the rule states we need to wait for ALL operations, we should not force a particular order.

# Credits

Thanks for the idea

[Twitter](https://twitter.com/1542249552480174081)

Photo by [Alvin Mahmudov](https://unsplash.com/es/@alvinmahmudov) on [Unsplash](https://unsplash.com/s/photos/flowers-boyfriend)
  
* * *

> JavaScript is the only language that I'm aware of that people feel they don't need to learn before they start using it.

_Douglas Crockford_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()