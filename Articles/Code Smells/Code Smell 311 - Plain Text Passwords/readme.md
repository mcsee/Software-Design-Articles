# Code Smell 311 - Plain Text Passwords

![Code Smell 311 - Plain Text Passwords](Code%20Smell%20311%20-%20Plain%20Text%20Passwords.gif)

*Your login isn't secure if you store secrets in plain sight*

> TL;DR: Never store or compare plain-text passwords

# Problems 😔

- Data exposure
- Weak security
- User trust loss
- Compliance issues
- Easy exploitation
- Authentication bypass potential

# Solutions 😃

1. Hash user passwords
2. Use strong algorithms
3. [Salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) every hash
4. Compare hashes safely
5. Secure your database
6. Perform regular [penetration tests](https://en.wikipedia.org/wiki/Penetration_test)

# Context 💬

When you store or compare passwords as plain-text, you expose users to unnecessary risk. 

A data breach will instantly reveal every credential. 

Attackers can reuse these passwords on other sites. Even internal logs or debugging can leak sensitive data.

You must treat passwords as secrets, not as values to display or compare directly.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/9b2f6ce8bab7d92d5c0f3c3127dad086) -->

```javascript
// Borrowed from "Beyond Vibe Coding"

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (!user) return res.status(401).send("No such user");
  if (user.password === password) {
    res.send("Login successful!");
  } else {
    res.status(401).send("Incorrect password");
  }
});
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ba50d84d91ab9e26cd0a7d84a5fec633) -->

```javascript
import bcrypt from 'bcrypt';

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (!user) return res.status(401).send('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send('Invalid credentials');
  res.send('Login successful');
});
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you see passwords handled as raw strings, compared directly with ===, or stored without hashing.

Static analyzers and linters can catch unsafe password handling, but code reviews remain the best defense.

# Tags 🏷️

- Security

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

In the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), passwords represent sensitive user credentials that must remain confidential. 

The bijection breaks when you store passwords as plain-text because real-world security expectations don't match your system's actual protection.

Users trust you to protect their credentials. 

When you store plain-text passwords, you create a false representation where the system appears secure but actually exposes sensitive data. 

This broken mapping between user expectations and system reality leads to security breaches and loss of trust.

When you design your authentication system, you create a mapping between a [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) concept — a "user’s identity" — and your program’s data.

Hashing preserves that bijection safely. 

When you break it by storing raw passwords, your system represents users incorrectly: it turns their private identity into an exposed string. 

That breaks trust and control.

# AI Generation 🤖

AI code generators sometimes create login examples comparing plain-text passwords. 

The code sample is from the book [Beyond Vibe Coding](https://learning.oreilly.com/library/view/beyond-vibe-coding/9798341634749/ch08.html) in the chapter about "8. Security, Maintainability, and Reliability".

These examples look simple, but they spread insecure habits. 

You must always validate and adapt AI-generated authentication code.

# AI Detection 🧲

AI tools can detect this smell when you provide context about security requirements. 

They recognize patterns of plain-text password comparison and can suggest proper hashing implementations.

You need to ask AI to review the authentication code for security vulnerabilities to get comprehensive fixes.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Refactor this login code to securely hash and compare passwords

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Refactor+this+login+code+to+securely+hash+and+compare+passwords%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Refactor+this+login+code+to+securely+hash+and+compare+passwords%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Refactor+this+login+code+to+securely+hash+and+compare+passwords%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Refactor+this+login+code+to+securely+hash+and+compare+passwords%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Refactor+this+login+code+to+securely+hash+and+compare+passwords%3A+%60%60%60javascript%0D%0A%2F%2F+Borrowed+from+%22Beyond+Vibe+Coding%22%0D%0A%0D%0Aapp.post%28%27%2Flogin%27%2C+async+%28req%2C+res%29+%3D%3E+%7B%0D%0A++const+%7B+username%2C+password+%7D+%3D+req.body%3B%0D%0A++const+user+%3D+await+Users.findOne%28%7B+username+%7D%29%3B%0D%0A++if+%28%21user%29+return+res.status%28401%29.send%28%22No+such+user%22%29%3B%0D%0A++if+%28user.password+%3D%3D%3D+password%29+%7B%0D%0A++++res.send%28%22Login+successful%21%22%29%3B%0D%0A++%7D+else+%7B%0D%0A++++res.status%28401%29.send%28%22Incorrect+password%22%29%3B%0D%0A++%7D%0D%0A%7D%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Plain text passwords are a trap. 

You make your users unsafe and invite catastrophic leaks. You must always hash, salt, and compare securely. 

The fix is simple, and the trust you earn is priceless.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

[Code Smell 215 - Deserializing Object Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20215%20-%20Deserializing%20Object%20Vulnerability/readme.md)

[Code Smell 166 - Low-Level Errors on User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20166%20-%20Low-Level%20Errors%20on%20User%20Interface/readme.md)

[Code Smell 258 - Secrets in Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md)

[Code Smell 167 - Hashing Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md)

[Code Smell 284 - Encrypted Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20284%20-%20Encrypted%20Functions/readme.md)

# More Information 📕

[Beyond Vibe Coding](https://learning.oreilly.com/library/view/beyond-vibe-coding/9798341634749/ch08.html)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
* * *

> If you think technology can solve your security problems, then you don’t understand the problems and you don’t understand the technology.

_Bruce Schneier_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)

***

Spanish version: [](https://codigolimpio.substack.com/p/acoplamiento-el-unico-problema-importante)