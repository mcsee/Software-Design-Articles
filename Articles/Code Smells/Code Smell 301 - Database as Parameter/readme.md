# Code Smell 301 - Database as Parameter

![Code Smell 301 - Database as Parameter](Code%20Smell%20301%20-%20Database%20as%20Parameter.jpg)

*Passing databases creates accidental coupling and breaks business encapsulation.*

> TL;DR: Don't mix data access concerns with essential business behavior.

# Problems 😔

- Tight [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Mixed responsibilities
- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation
- Testability
- Business logic [pollution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2031%20-%20Accidental%20Methods%20on%20Business%20Objects/readme.md)
- Separation of concerns violation
- Blurred Layers
- Single Responsibility Principle violation

# Solutions 😃

1. Use dependency injection
2. Don't use the [Repository Pattern](https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30). Find real abstractions instead
3. Separate business logic
4. Design for Decoupling

# Refactorings ⚙️

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 018 - Replace Singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20018%20-%20Replace%20Singleton/readme.md)

# Context 💬

When you pass a database connection or database object directly to business objects, you create [accidental](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) coupling between your domain logic and data persistence mechanisms.

This approach gives you a false sensation of flexibility while making your code harder to test, maintain, and evolve.

The database becomes an implementation detail that leaks into your business layer, violating the separation of concerns principle.

Your business objects should focus on essential business rules and behavior, not on accidental logic like how data gets stored or retrieved.

This pattern also makes unit testing extremely difficult since you cannot [mock](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md) or stub the database interactions without complex setup procedures.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/a4f08aa097dbf1822beb80534b078af4) -->

```python
class InvoiceProcessor:
    def process_invoice(self, invoice_data, database):
        # Business logic mixed with database access
        customer = database.execute(
            "SELECT * FROM customers WHERE id = ?", 
            invoice_data['customer_id']
        ).fetchone()
        
        if customer['credit_limit'] < invoice_data['amount']:
            raise Exception("Credit limit exceeded")
        
        # More business logic
        tax = invoice_data['amount'] * 0.21
        total = invoice_data['amount'] + tax
        
        # Direct database manipulation
        database.execute(
            "INSERT INTO invoices (customer_id, amount, tax, total) "
            "VALUES (?, ?, ?, ?)",
            (invoice_data['customer_id'], invoice_data['amount'], 
             tax, total)
        )
        
        database.commit()
        return total
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/71ac6c405062a1238a4015d44797ca7c) -->

```python
class InvoiceProcessor:
    def __init__(self, billing_ledger):
        self.billing_ledger = billing_ledger
    
    def process_invoice(self, customer, amount):
        # Pure business logic with proper domain objects
        if customer.credit_limit < amount:
            raise CreditLimitExceededException()
        
        # Business calculations
        tax = amount * 0.21
        total = amount + tax
        
        # Create the domain object
        # No repositories are involved
        invoice = Invoice(
            customer=customer,
            amount=amount,
            tax=tax,
            total=total
        )
        
        self.billing_ledger.record(invoice)
        return total
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you find database connections, SQL queries, or ORM objects passed as parameters to business methods. Look for method signatures that accept database-related objects or when you see SQL statements mixed with business logic calculations.

Static analysis tools can flag methods that receive database connections as parameters, and code reviews should catch these architectural violations.

# Exceptions 🛑

- Low level database access does not cross domain when they pass the database as argument

# Tags 🏷️

- Coupling

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Your business objects should model [real-world entities](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and behaviors without knowing about storage mechanisms. 

When you pass databases as parameters, you break the [one-to-one correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between business concepts and code representation.

In the real world, an invoice processor doesn't carry around a database.

It works with customers and invoices as business entities.

Breaking this bijection creates artificial dependencies that don't exist in the problem domain, making your code harder to understand and maintain.

# AI Generation 🤖

AI code generators frequently create this smell, suggesting quick solutions that directly couple database access with business logic.

They prioritize working code over clean architecture, leading to tightly coupled implementations.

# AI Detection 🥃

AI tools can detect this smell when you provide clear instructions about the separation of concerns and dependency injection patterns.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove the coupling of the database

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+the+coupling+of+the+database%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+the+coupling+of+the+database%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+the+coupling+of+the+database%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+the+coupling+of+the+database%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) | [You](https://you.com/search?q=Remove+the+coupling+of+the+database%3A+%60%60%60python%0D%0Aclass+InvoiceProcessor%3A%0D%0A++++def+process_invoice%28self%2C+invoice_data%2C+database%29%3A%0D%0A++++++++%23+Business+logic+mixed+with+database+access%0D%0A++++++++customer+%3D+database.execute%28%0D%0A++++++++++++%22SELECT+%2A+FROM+customers+WHERE+id+%3D+%3F%22%2C+%0D%0A++++++++++++invoice_data%5B%27customer_id%27%5D%0D%0A++++++++%29.fetchone%28%29%0D%0A++++++++%0D%0A++++++++if+customer%5B%27credit_limit%27%5D+%3C+invoice_data%5B%27amount%27%5D%3A%0D%0A++++++++++++raise+Exception%28%22Credit+limit+exceeded%22%29%0D%0A++++++++%0D%0A++++++++%23+More+business+logic%0D%0A++++++++tax+%3D+invoice_data%5B%27amount%27%5D+%2A+0.21%0D%0A++++++++total+%3D+invoice_data%5B%27amount%27%5D+%2B+tax%0D%0A++++++++%0D%0A++++++++%23+Direct+database+manipulation%0D%0A++++++++database.execute%28%0D%0A++++++++++++%22INSERT+INTO+invoices+%28customer_id%2C+amount%2C+tax%2C+total%29+%22%0D%0A++++++++++++%22VALUES+%28%3F%2C+%3F%2C+%3F%2C+%3F%29%22%2C%0D%0A++++++++++++%28invoice_data%5B%27customer_id%27%5D%2C+invoice_data%5B%27amount%27%5D%2C+%0D%0A+++++++++++++tax%2C+total%29%0D%0A++++++++%29%0D%0A++++++++%0D%0A++++++++database.commit%28%29%0D%0A++++++++return+total%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Avoid passing databases as parameters to business objects.

This approach keeps your business logic clean, makes testing easier, and maintains proper separation between the domain and infrastructure concerns.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 50 - Object Keys](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2050%20-%20Object%20Keys/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 31 - Accidental Methods on Business Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2031%20-%20Accidental%20Methods%20on%20Business%20Objects/readme.md)

[Code Smell 64 - Inappropriate Intimacy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2064%20-%20Inappropriate%20Intimacy/readme.md)

# More Information 📕

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[No Silver Bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Josh Appel](https://unsplash.com/@joshappel) on [Unsplash](https://unsplash.com/photos/close-up-photo-of-assorted-coins-NeTPASr-bmQ)

* * *

> The secret to building large apps is never build large apps. Break your applications into small pieces.  Then, assemble those testable, bite-sized pieces into your big application

_Justin Meyer_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)