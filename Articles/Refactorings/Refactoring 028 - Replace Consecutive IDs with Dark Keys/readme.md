# Refactoring 028 - Replace Consecutive IDs with Dark Keys

![Refactoring 028 - Replace Consecutive IDs with Dark Keys](Refactoring%20028%20-%20Replace%20Consecutive%20IDs%20with%20Dark%20Keys.jpg)

*Enhance Security and Reduce Scraping Risks by Refactoring Object Identifiers*

> TL;DR: Replace sequential IDs in your models with UUIDs to prevent IDOR vulnerabilities and discourage scraping.

# Problems Addressed 😔

* [IDOR Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20120%20-%20Sequential%20IDs/readme.md)
* Predictable URLs
* Data and [Screen Scraping](https://automate.fortra.com/resources/guides/what-is-screen-scraping-and-how-does-it-work) Risk
* Tight Coupling to accidental Database Identifiers
* Exposure of Internal Structure

# Related Code Smells 💨

[Code Smell 120 - Sequential IDs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20120%20-%20Sequential%20IDs/readme.md)

[Code Smell 160 - Invalid Id = 9999](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20160%20-%20Invalid%20Id%20=%209999/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

# Context 💬

Sequential IDs are an implementation detail of your database that often leak into the public domain through URLs and APIs. 

Convenient for indexing, but they create a significant security risk by exposing the Internal Structure of your data. An attacker can easily guess valid identifiers just by incrementing a number, leading to IDOR (Insecure Direct Object Reference) vulnerabilities and making your system a prime target for automated scraping.

When you replace Consecutive IDs with Dark Keys (like UUIDs), you decouple your public interface from your private persistence layer. You replace predictable, accidental numbers with opaque, non-guessable identifiers. 

This strengthens the Bijection by ensuring that external references to your domain objects are stable and secure, preventing users from reverse-engineering your database size or accessing unauthorized records through simple iteration.

# Steps 👣

1. Identify all public uses of sequential IDs in APIs, URLs, or UI elements
2. Generate UUIDs for each record during data migration or creation
3. Replace exposed sequential IDs with UUIDs in external-facing interfaces
4. Map UUIDs internally to the original IDs using a private lookup table or service
5. Ensure UUIDs are used consistently across services and databases

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/e5d6cb6dab9c47560f857c3a6d5d41e7) -->

```php
<?php

class Invoice {
    public int $id;
    // The external identifier is never an essential
    // responsibilty for an object
  
    public string $customerName;
    public array $items;

    public function __construct(
      int $id, string $customerName, array $items) {
        $this->id = $id;
        $this->customerName = $customerName;
        $this->items = $items;
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/54c62038e3746d75511b950264995ea5) -->

```php
<?php

class Invoice {
    // 1. Identify all public uses of sequential IDs
    // in APIs, URLs, or UI elements   
   
    private string $customerName;
    private array $items;

    public function __construct(
      string $customerName, array $items) {
        $this->customerName = $customerName;
        $this->items = $items;
    }
}

// 2. Generate UUIDs
// for each record during data migration or creation    
// 3. Replace exposed sequential IDs 
// with UUIDs in external-facing interfaces    

// 4. Map UUIDs internally to the original IDs 
// using a private lookup table or service    
$uuid = generate_uuid();

// 5. Ensure UUIDs are used 
// consistently across services and databases
$invoices[$uuid] =new Invoice(
    customerName: 'Roger Penrose',
    items: [
        new InvoiceItem(description: 'Laptop', price: 1200),
        new InvoiceItem(description: 'Black Hole', price: 50)
    ]
);

// Step 4: Keep the map internal
// Step 5: Share only UUID with the client
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe if done incrementally with proper tests and backward compatibility during transition.

You should keep dual access (UUID and ID) temporarily to allow phased updates.

# Why is the Code Better? ✨

The refactoring prevents IDOR attacks by removing predictable identifiers.

You remove predictable IDs from public access

It reduces the risk of automated scraping due to non-sequential keys.

This technique also improves encapsulation by keeping internal IDs private and encourages cleaner API design through explicit mapping.

This is especially useful in RESTful APIs, web applications, and microservices where object identifiers are exposed publicly.

You can enable a rate control limit for failed 404 resources when your attacker tries to guess the IDs.

# How Does it Improve the Bijection? 🗺️

When you model your identifiers with [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) concepts rather than database rows, you avoid exposing accidental implementation details.

This keeps the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) closer to the business entity and avoids leaking technical structure.

The real-world invoice on the example doesn't expose an internal ID.

Instead, it's referred to through business terms or opaque references.

This refactoring removes the accidental part and restores the essential essence of the invoice.

You control the pointers. The pointer doesn't control you.

# Limitations ⚠️

This refactoring requires you to update all client-facing integrations. Some systems might still assume access to numeric IDs.

You must preserve internal IDs for persistence, audits, or legacy support.

# Tags 🏷️

- Security

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

[Refactoring 027 - Remove Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20027%20-%20Remove%20Getters/readme.md)

[Refactoring 009 - Protect Public Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20009%20-%20Protect%20Public%20Attributes/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify all public uses of sequential IDs in APIs, URLs, or UI elements  2. Generate UUIDs for each record during data migration or creation 3. Replace exposed sequential IDs with UUIDs in external-facing interfaces  4. Map UUIDs internally to the original IDs using a private lookup table or service 5. Ensure UUIDs are used consistently across services and databases

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+all+public+uses+of+sequential+IDs+in+APIs%2C+URLs%2C+or+UI+elements++2.+Generate+UUIDs+for+each+record+during+data+migration+or+creation+3.+Replace+exposed+sequential+IDs+with+UUIDs+in+external-facing+interfaces++4.+Map+UUIDs+internally+to+the+original+IDs+using+a+private+lookup+table+or+service+5.+Ensure+UUIDs+are+used+consistently+across+services+and+databases%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+all+public+uses+of+sequential+IDs+in+APIs%2C+URLs%2C+or+UI+elements++2.+Generate+UUIDs+for+each+record+during+data+migration+or+creation+3.+Replace+exposed+sequential+IDs+with+UUIDs+in+external-facing+interfaces++4.+Map+UUIDs+internally+to+the+original+IDs+using+a+private+lookup+table+or+service+5.+Ensure+UUIDs+are+used+consistently+across+services+and+databases%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+all+public+uses+of+sequential+IDs+in+APIs%2C+URLs%2C+or+UI+elements++2.+Generate+UUIDs+for+each+record+during+data+migration+or+creation+3.+Replace+exposed+sequential+IDs+with+UUIDs+in+external-facing+interfaces++4.+Map+UUIDs+internally+to+the+original+IDs+using+a+private+lookup+table+or+service+5.+Ensure+UUIDs+are+used+consistently+across+services+and+databases%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+all+public+uses+of+sequential+IDs+in+APIs%2C+URLs%2C+or+UI+elements++2.+Generate+UUIDs+for+each+record+during+data+migration+or+creation+3.+Replace+exposed+sequential+IDs+with+UUIDs+in+external-facing+interfaces++4.+Map+UUIDs+internally+to+the+original+IDs+using+a+private+lookup+table+or+service+5.+Ensure+UUIDs+are+used+consistently+across+services+and+databases%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+all+public+uses+of+sequential+IDs+in+APIs%2C+URLs%2C+or+UI+elements++2.+Generate+UUIDs+for+each+record+during+data+migration+or+creation+3.+Replace+exposed+sequential+IDs+with+UUIDs+in+external-facing+interfaces++4.+Map+UUIDs+internally+to+the+original+IDs+using+a+private+lookup+table+or+service+5.+Ensure+UUIDs+are+used+consistently+across+services+and+databases%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Aclass+Invoice+%7B%0D%0A++++public+int+%24id%3B%0D%0A++++%2F%2F+The+external+identifier+is+never+an+essential%0D%0A++++%2F%2F+responsibilty+for+an+object%0D%0A++%0D%0A++++public+string+%24customerName%3B%0D%0A++++public+array+%24items%3B%0D%0A%0D%0A++++public+function+__construct%28%0D%0A++++++int+%24id%2C+string+%24customerName%2C+array+%24items%29+%7B%0D%0A++++++++%24this-%3Eid+%3D+%24id%3B%0D%0A++++++++%24this-%3EcustomerName+%3D+%24customerName%3B%0D%0A++++++++%24this-%3Eitems+%3D+%24items%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Wikipedia](https://en.wikipedia.org/wiki/Insecure_direct_object_reference)

# Credits 🙏

Image by [Kris](https://pixabay.com/users/thedigitalway-3008341/) on [Pixabay](https://pixabay.com/)

---

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)