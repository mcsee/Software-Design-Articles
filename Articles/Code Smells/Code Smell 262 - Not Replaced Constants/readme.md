# Code Smell 262 - Not Replaced Constants

![Code Smell 262 - Not Replaced Constants](Code%20Smell%20262%20-%20Not%20Replaced%20Constants.jpg)

*Yet Another Security Code Smell Because Nobody Ever Reads the Documentation*

> TL;DR: Ignoring constant replacement leads to severe security risks.

# Problems

- Vulnerable endpoints

- Lack of Testing

- Documentation Nobody Reads

# Solutions

1. Enforce constant key replacement

2. Audit upstream vendors

3. Automate security checks

4. Enforce your Documentation with [tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

5. Use invalid defaults to ensure they are always replaced

# Context

A major security flaw, PKfail, persisted unnoticed for 12 years, compromising hundreds of devices. 

The vulnerability stems from vendors failing to replace a "DO NOT TRUST" Secure Boot master key, a critical step that was neglected despite clear instructions. 

This oversight left countless devices open to exploitation, allowing threat actors to bypass security measures and install malicious software.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/79f0f0cd0289ce799b501db97ea6b926) -->

```rust
fn generate_pk() -> String {
    "DO NOT TRUST".to_string()
}

// Vendor forgets to replace PK
fn use_default_pk() -> String {
    let pk = generate_pk();
    pk // "DO NOT TRUST" PK used in production
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/54f9da4bbeb24a1ec33f1af75c038278) -->

```rust
fn generate_pk() -> String {
    "DO NOT TRUST".to_string()
    // The documentation tells vendors to replace this value
}

fn use_default_pk() -> String {
    let pk = generate_pk();

    if pk == "DO NOT TRUST" {
        panic!("Error: PK must be replaced before use.");
    }

    pk // Valid PK used in production
}
```

# Detection

[X] Automatic 

You can detect this smell by checking for default values that must be replaced before deployment. 

Tools like static analyzers and manual code reviews help you identify hardcoded or placeholder keys that should be updated.

# Tags

- Security

# Level

[X] Intermediate

# AI Generation

AI generators might create this smell unless instructed for context-specific security steps. 

You must provide clear instructions to ensure proper key replacement.

# AI Detection

AI tools can catch this smell with rules that flag placeholder values through testing and reviews.

# Conclusion

Ignoring crucial steps in the security process, such as replacing default keys, can lead to severe vulnerabilities. 

This long-lasting flaw emphasizes the need for diligent security practices.

Replace all your documentation with acceptance tests.

# Relations

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# More Info

[Tech Radar](https://www.techradar.com/pro/security/secure-boot-has-a-major-security-issue-hundreds-of-devices-from-dell-supermicro-and-more-all-affected-heres-what-we-know)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Jason Leung](https://unsplash.com/@ninjason) on [Unsplash](https://unsplash.com/photos/white-and-gray-siberian-husky-puppy-udxIYCyZHiw)
    
* * *

It takes 20 years to build a reputation and a few minutes of cyber-incident to ruin it.

_Stephane Nappo_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)