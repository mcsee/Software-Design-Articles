# Code Smell 261 - DigiCert Underscores

![Code Smell 261 - DigiCert Underscores](Code%20Smell%20261%20-%20DigiCert%20Underscores.jpg)

*Don't forget to check strings with special characters like underscores*

> TL;DR: Underscore and special characters can lead to validation errors

# Problems

- Incomplete Validation
- Security Risks
- Missed Tests
- Incorrect Setup
- System Inconsistency
- Breaking changes with legacy data

# Solutions

1. Use consistent prefix
2. Implement strict validation
3. Check system outputs
4. Create migration tests
5. Test with legacy data

# Context

In digital certificate validation, ensuring domain control is critical.

An incomplete validation and potential security issues. 

DigiCert [recently encountered](https://thehackernews.com/2024/07/digicert-to-revoke-83000-ssl.html) such a problem, where they missed adding an [underscore prefix](https://www.bleepingcomputer.com/news/security/digicert-mass-revoking-tls-certificates-due-to-domain-validation-bug/).

This resulted in certificates being issued without proper validation and a cascade of broken sites with few advancement notices.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/35be34c8eece30b4637f9c0dc0fbe387)

```rust
// Incorrect random value without underscore
let random_value = format!("{}", generate_random_value());
setup_dns_record(
  &format!("_{}.example.com", random_value),
  "dcv.digicert.com");
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/bb6accc36fc74a838f8e90c5c6bcf6b4)

```rust
// Correct random value with underscore
let random_value = format!("_{}", generate_random_value());
setup_dns_record(&random_value, "dcv.digicert.com");
```

# Detection

[X] Manual

You can detect this smell by reviewing the validation process and checking if all required prefixes are consistently applied. 

You should also store historical data and check the new rules applied to them.
 
# Tags

- Security

# Level

[X] Advanced

# AI Generation

AI-generated code might miss adding specific prefixes unless explicitly instructed. 

This can lead to security risks if the generated code is not thoroughly reviewed.

# AI Detection

With proper examples and instructions, AI tools can be trained to detect missing prefixes in generated or existing code. 

# Conclusion

Skipping an essential part of the validation process, like an underscore prefix, can lead to significant issues. 

Ensuring such steps are consistently applied and reviewed is crucial for maintaining system integrity and security.

# Relations

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

# More Info

[Revocation Incident](https://www.digicert.com/support/certificate-revocation-incident)

[DigiCert revocation](https://thehackernews.com/2024/07/digicert-to-revoke-83000-ssl.html)

[Domain Validation Bug](https://www.bleepingcomputer.com/news/security/digicert-mass-revoking-tls-certificates-due-to-domain-validation-bug/)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/photos/assorted-color-padlocks-on-fence-during-daytime-Jjue0ESkXAU)
    
* * *

> Security is a process, not a product

_Bruce Schneier_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)