# Code Smell 258 - Secrets in Code

![Code Smell 258 - Secrets in Code](Code%20Smell%20258%20-%20Secrets%20in%20Code.jpg)

*The Dangers of Hardcoding Secrets*

> TL;DR: Use a secret manager to avoid hardcoding sensitive information.

# Problems

- Security risk

- Hard to update by operations teams

- Code exposure

- Data breaches

- Audit Fails

# Solutions

1. Use a [secrets manager](https://en.wikipedia.org/wiki/Key_management)

2. Use Environment variables outside the code

3. Encrypted storage

# Context

Writing secrets as plain text directly into your codebase exposes your code to significant security risks. 

Hardcoded secrets such as API keys, passwords, database credentials, and tokens can be easily exposed if your code is shared or compromised. 

Use a secret manager to store and manage your secrets.

This strategy will reduce the risk of data breaches and make it easier to update and rotate secrets as needed.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/9f6389d74995cdebda3e81f5e9831fbe) -->

```python
import requests

api_key = "LILAS_PASTIA"
response = requests.get("https://api.example.com", 
           headers={"Authorization": f"Bearer {api_key}"})
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/8ce54f7836bdc9552d505b9d350ee8d1) -->

```python
import os
import requests

api_key = os.environ.get("API_KEY")
# This is just an example. Might also be not as secure

response = requests.get("https://api.example.com", 
           headers={"Authorization": f"Bearer {api_key}"})
```

# Detection

[X] Automatic 

You can detect this smell by searching your codebase for hardcoded strings that resemble secrets. 

Code reviews and commercial security static analysis tools can also help identify these patterns.

# Tags

- Security

# Level

[x] Intermediate

# AI Generation

AI code generators might create this smell if they were trained with code datasets with hardcoded secrets. 

Always review generated code to ensure secrets are handled securely.

# AI Detection

Gemini, Claude, and ChatGPT detected the hardcoded secrets and suggested changes to the code.

# Conclusion

Using a secret manager enhances the security and maintainability of your code by ensuring that sensitive information is stored securely and can be easily managed and updated.

Many repl and public codebases have a secret manager as an external utility.

Make it a habit to handle all secrets with care and never let them slip into your codebase.

# Relations

[Code Smell 215 - Deserializing Object Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20215%20-%20Deserializing%20Object%20Vulnerability/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

# More Info

[Stack Overflow](https://stackoverflow.com/questions/70559637/github-copilot-giving-away-api-keys-how-can-i-protect-my-keys)

[GitHub Copilot security concerns](https://vlad-rad.medium.com/github-copilot-security-conserns-d4209f0d5c28)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [saeed karimi](https://unsplash.com/@saeedkarimi) on [Unsplash](https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-kissing-girl-in-white-long-sleeve-shirt-JrrWC7Qcmhs)
  
* * *

> Passwords are like underwear: you don�t let people see it, you should change it very often, and you shouldn't share it with strangers.

_Chris Pirillo_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)