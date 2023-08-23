# Code Smell 35 - State as Properties

![Code Smell 35 - State as Properties](Code%20Smell%2035%20-%20State%20as%20Properties.jpg)

*When an object changes its state the best solution is to change the attribute, isn't it?* 

> TL;DR: Don't model state using attributes

# Problems

- Mutability

- Attributes polluting

- Setters

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

# Solutions

1 - Model states as mathematical set inclusion.

2 - State is accidental, take it away from the object.

# Examples

- State diagrams

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/817257ca2966c8f2381dcf9887dfa1a4)
```java
public abstract class OrderState { }

public final class OrderStatePending extends OrderState { }
// This is a polymorphic hierarchy with different behavior
// An enum is not enough to model state

public final class Order {    
    public Order(LinkedList<int> items) {
        LinkedList<int> items = items;
        OrderState state = new OrderStatePending();
    }
    
    public function changeStatus(OrderState newState) {
        OrderState state = newState;
    }
    
    public function confirm() {
        state.Confirm(this);
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1b98448f97cd23b6b5f8438280b73736)
```java
final class Order {
    
    public Order(LinkedList<int> items) {
        items = items;
    }     
}

class OrderProcessor {
    public static void main( String args[] ) {
  
    LinkedList<int> elements = new LinkedList<int>(); 
    elements.add(1);
    elements.add(2);
  
    Order sampleOrder = new Order(elements);
  
    Collection<Order> pendingOrders = new LinkedList<Order>();
    Collection<Order> confirmedOrders = new LinkedList<Order>(); 
    
    pendingOrders.add(sampleOrder);  
    
    pendingOrders.remove(sampleOrder);  
    confirmedOrders.add(sampleOrder);
    }
}
```

# Detection

If we want to be extreme, we should consider every *setter* to be a potential state change. Linters can warn us. But we might end up getting too many false positives.

# Exceptions

- Over Design

- Performance issues (if a serious benchmark supports it).

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Tags

- Mutation

# Conclusion

This technique is very elegant but can lead to over design. For example changing a visual component its color should be a counterexample to this smell. 

We should be aware and very caution like with any other smell.

They are *hints* and not rigid rules.

# Relations

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)
 
# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits

Photo by [Tom Crew](https://unsplash.com/@tomcrewceramics) on [Unsplash](https://unsplash.com/s/photos/porcelain)

* * *

> First make the change easy (warning: this might be hard), then make the easy change.

_Kent Beck_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)