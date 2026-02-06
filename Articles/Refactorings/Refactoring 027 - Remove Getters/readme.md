# Refactoring 027 - Remove Getters

![Refactoring 027 - Remove Getters](Refactoring%20027%20-%20Remove%20Getters.jpg)

*Unleash object behavior beyond data access*

> TL;DR: Remove or replace getters with behavior-rich methods that perform operations instead of exposing internal state.

# Problems Addressed 😔

- [Anemic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) objects
- Excessive [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Lost encapsulation
- [Essence Mutation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)
- Law of Demeter violations
- Information leakage
- Exposed internals
- [Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# Related Code Smells 💨

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 67 - Middle Man](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

[Code Smell 64 - Inappropriate Intimacy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2064%20-%20Inappropriate%20Intimacy/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# Context 💬

Getters are often viewed as harmless accessors, but they are actually a primary cause of Anemic Domain Models. 

When an object exposes its internal state, it abdicates its responsibility, forcing the caller to make decisions that the object should be making itself. 

This violates the Tell-Don't-Ask principle and creates tight coupling where every consumer becomes intimately familiar with the object's internal structure.

When you remove the getters, you transform data-holders into intelligent entities that encapsulate both data and behavior. Instead of asking an object for its "ingredients" to perform a calculation externally, you tell the object to perform the operation. 

This keeps business rules where they belong, prevents information leakage, and ensures that your code remains closer to the real-world MAPPER, where objects are defined by what they do, not just what they have.

# Steps 👣

1. Identify getters that expose internal object state
2. Find all getter usages in the codebase
3. Move behavior that uses the getter into the object itself
4. Create intention-revealing methods that perform operations (remove the get prefix)
5. Update your code to use the new methods

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/abe58a8e1901a83ecba8b3dca686f4f2) -->

```java
public class Invoice {
    private List<LineItem> items;
    private Customer customer;
    private LocalDate dueDate;
    
    public Invoice(Customer customer, LocalDate dueDate) {
        this.customer = customer;
        this.dueDate = dueDate;
        this.items = new ArrayList<>();
    }
    
    public void addItem(LineItem item) {
        // This is the right way 
        // to manipulate the internal consistency
        // adding assertions and access control if necessary
        items.add(item);
    }
    
    public List<LineItem> getItems() {
        // You are exposing your internal implementation
        // In some languages, you also open a backdoor to
        // manipulate your own collection unless you return
        // a copy
        return items;
    }
    
    public Customer getCustomer() {
        // You expose your accidental implementation
        return customer;
    }
    
    public LocalDate getDueDate() {
        // You expose your accidental implementation
        return dueDate;
    }
}
 
Invoice invoice = new Invoice(customer, dueDate);
// Calculate the total violating encapsulation principle
double total = 0;
for (LineItem item : invoice.getItems()) {
    total += item.getPrice() * item.getQuantity();
}

// Check if the invoice is overdue
boolean isOverdue = LocalDate.now().isAfter(invoice.getDueDate());

// Print the customer information
System.out.println("Customer: " + invoice.getCustomer().getName());
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/1798f26191fe78584837db1053e7c45f) -->

```java
public class Invoice {
    private List<LineItem> items;
    private Customer customer;
    private LocalDate dueDate;
    
    public Invoice(Customer customer, LocalDate dueDate) {
        this.customer = customer;
        this.dueDate = dueDate;
        this.items = new ArrayList<>();
    }
    
    public void addItem(LineItem item) {
        items.add(item);
    }
    
    // Step 3: Move behavior that uses the getter into the object
    public double calculateTotal() {
        // Step 4: Create intention-revealing methods
        double total = 0;
        for (LineItem item : items) {
            total += item.price() * item.quantity();
        }
        return total;
    }
    
    public boolean isOverdue(date) {
        // Step 4: Create intention-revealing methods
        // Notice you inject the time control source
        // Removing the getter and breaking the coupling
        return date.isAfter(dueDate);
    }
    
    public String customerInformation() {
        // Step 4: Create intention-revealing methods
        // You no longer print with side effects 
        // And coupling to a global console
        return "Customer: " + customer.name();        
    }
    
    // For collections, return an unmodifiable view if needed
    // Only expose internal collaborators if the name 
    // is an actual behavior
    public List<LineItem> items() {
        return Collections.unmodifiableList(items);
    }
    
    // Only if required by frameworks 
    // or telling the customer is an actual responsibility
    // The caller should not assume the Invoice is actually
    // holding it
    public String customerName() {
        return customer.name();
    }
    
    // You might not need to return the dueDate
    // Challenge yourself if you essentially need to expose it
    // public LocalDate dueDate() {
    //     return dueDate;
    // }
}

// Client code (Step 5: Update client code)
Invoice invoice = new Invoice(customer, dueDate);
double total = invoice.calculateTotal();
boolean isOverdue = invoice.isOverdue(date);
System.out.println(invoice.customerInformation());
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is generally safe but requires careful execution.

You need to ensure all usages of the getter are identified and replaced with the new behavior methods.

The biggest risk occurs when getters return mutable objects or collections, as client code might have modified these objects.

You should verify that behavior hasn't changed through comprehensive tests before and after refactoring.

For collections, return unmodifiable copies or views to maintain safety during transition. For frameworks requiring property access, you may need to preserve simple accessors without the "get" prefix alongside your behavior-rich methods.

As usual, you should add behavioral coverage (not structural) to your code before you perform the refactoring.

# Why is the Code Better? ✨

The refactored code is better because it adheres to the *Tell-Don't-Ask* principle, making your objects intelligent rather than just anemic data holders.

The solution centralizes logic related to the object's data within the object itself, reducing duplication
It hides implementation details, allowing you to change internal representation without affecting client code

This approach reduces [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) as clients don't need to know about the object's internal structure.

It also prevents violations of the Law of Demeter by eliminating chains of getters.

Since the [essence is not mutated](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md), the solution enables better validation and business rule enforcement within the object.

# How Does it Improve the Bijection? 🗺️

Removing getters improves the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between code and reality by making objects behave more like their real-world counterparts.

In the real world, objects don't expose their internal state for others to manipulate - they perform operations based on requests.

For example, you don't ask a bank account for its balance and then calculate if a withdrawal is possible yourself. Instead, you ask the account, "Can I withdraw $100?" The account applies its internal rules and gives you an answer.

You create a more faithful representation of domain concepts by modeling your objects to perform operations rather than exposing the data.

This strengthens the one-to-one correspondence between the real world and your computable model, making your code more intuitive and aligned with how people think about the problem domain.

This approach follows the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) principle by ensuring that computational objects mirror real-world entities in structure and behavior.

# Limitations ⚠️

Frameworks and libraries often expect getter methods for serialization/deserialization.

Legacy codebases may have widespread getter usage that's difficult to refactor all at once.

Unit testing may become more challenging as the internal state is less accessible. Remember, you should never test private methods.

# Tags 🏷️

- Encapsulation

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 009 - Protect Public Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20009%20-%20Protect%20Public%20Attributes/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify getters that expose internal object state 2. Find all getter usages in the codebase 3. Move behavior that uses the getter into the object itself 4. Create intention-revealing methods that perform operations (remove the get prefix) 5. Update your code to use the new methods

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+getters+that+expose+internal+object+state+2.+Find+all+getter+usages+in+the+codebase+3.+Move+behavior+that+uses+the+getter+into+the+object+itself+4.+Create+intention-revealing+methods+that+perform+operations+%28remove+the+get+prefix%29+5.+Update+your+code+to+use+the+new+methods%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) | [Claude](https://claude.ai/new?q=1.+Identify+getters+that+expose+internal+object+state+2.+Find+all+getter+usages+in+the+codebase+3.+Move+behavior+that+uses+the+getter+into+the+object+itself+4.+Create+intention-revealing+methods+that+perform+operations+%28remove+the+get+prefix%29+5.+Update+your+code+to+use+the+new+methods%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+getters+that+expose+internal+object+state+2.+Find+all+getter+usages+in+the+codebase+3.+Move+behavior+that+uses+the+getter+into+the+object+itself+4.+Create+intention-revealing+methods+that+perform+operations+%28remove+the+get+prefix%29+5.+Update+your+code+to+use+the+new+methods%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+getters+that+expose+internal+object+state+2.+Find+all+getter+usages+in+the+codebase+3.+Move+behavior+that+uses+the+getter+into+the+object+itself+4.+Create+intention-revealing+methods+that+perform+operations+%28remove+the+get+prefix%29+5.+Update+your+code+to+use+the+new+methods%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) | [You](https://you.com/search?q=1.+Identify+getters+that+expose+internal+object+state+2.+Find+all+getter+usages+in+the+codebase+3.+Move+behavior+that+uses+the+getter+into+the+object+itself+4.+Create+intention-revealing+methods+that+perform+operations+%28remove+the+get+prefix%29+5.+Update+your+code+to+use+the+new+methods%3A+%60%60%60java%0D%0Apublic+class+Invoice+%7B%0D%0A++++private+List%3CLineItem%3E+items%3B%0D%0A++++private+Customer+customer%3B%0D%0A++++private+LocalDate+dueDate%3B%0D%0A++++%0D%0A++++public+Invoice%28Customer+customer%2C+LocalDate+dueDate%29+%7B%0D%0A++++++++this.customer+%3D+customer%3B%0D%0A++++++++this.dueDate+%3D+dueDate%3B%0D%0A++++++++this.items+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+addItem%28LineItem+item%29+%7B%0D%0A++++++++%2F%2F+This+is+the+right+way+%0D%0A++++++++%2F%2F+to+manipulate+the+internal+consistency%0D%0A++++++++%2F%2F+adding+assertions+and+access+control+if+necessary%0D%0A++++++++items.add%28item%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+List%3CLineItem%3E+getItems%28%29+%7B%0D%0A++++++++%2F%2F+You+are+exposing+your+internal+implementation%0D%0A++++++++%2F%2F+In+some+languages%2C+you+also+open+a+backdoor+to%0D%0A++++++++%2F%2F+manipulate+your+own+collection+unless+you+return%0D%0A++++++++%2F%2F+a+copy%0D%0A++++++++return+items%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+Customer+getCustomer%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+customer%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+LocalDate+getDueDate%28%29+%7B%0D%0A++++++++%2F%2F+You+expose+your+accidental+implementation%0D%0A++++++++return+dueDate%3B%0D%0A++++%7D%0D%0A%7D%0D%0A+%0D%0AInvoice+invoice+%3D+new+Invoice%28customer%2C+dueDate%29%3B%0D%0A%2F%2F+Calculate+the+total+violating+encapsulation+principle%0D%0Adouble+tot) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

[Wikipedia: Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter)

[Tell don't ask principle](https://martinfowler.com/bliki/TellDontAsk.html)

# Credits 🙏

Image by [Kris](https://pixabay.com/users/thedigitalway-3008341) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)