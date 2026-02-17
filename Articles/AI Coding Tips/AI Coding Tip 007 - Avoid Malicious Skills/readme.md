# AI Coding Tip 007 - Avoid Malicious Skills

![AI Coding Tip 007 - Avoid Malicious Skills](AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills.png)

*Avoid the Agentic Trojan Horse*

> TL;DR: Treat AI agent skills like dangerous executable code and read the instructions carefully.

# Common Mistake ❌

You install community [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) for your AI assistant based on popularity or download counts. 

You trust "proactive" agents when they ask you to run "setup" commands or install "AuthTool" prerequisites.

You grab exciting skills from public registries and install them right away. 

You skip [code reviews](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) or scans because the docs *look* clean.

You are lazy and careless.

Even careful developers can miss these details when rushing.

# Problems Addressed 😔

Information stealers search for your SSH keys, browser cookies, and [.env files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md).

Supply chain attacks exploit naming confusion (ClawdBot vs. MoltBot vs. OpenClaw).

[Typosquatting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20263%20-%20Squatting/readme.md) pushes you into installing malicious packages.

Your adversaries invoke [Arbitrary Code Execution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20284%20-%20Encrypted%20Functions/readme.md) using unvalidated WebSocket connections.

# How to Do It 🛠️

Run your AI agent inside a dedicated isolated Virtual Machine or Docker container. 

This measure prevents the agent from accessing your primary filesystem.

Review the [SKILL.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) and source code of every new skill.

Making a code review You can find hidden curl commands, base64-encoded strings and [obfuscated code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20284%20-%20Encrypted%20Functions/readme.md) that try to get to malicious IPs like 91.92.242.30.

You can help yourself with security scanners like [Clawdex](https://www.clawdex.io/) or [Koi Security's tool](https://www.koi.ai/).

The tools check the skills against a database of known malicious signatures.

Bind your agent's gateway strictly to 127.0.0.1. When you bind to 0.0.0.0, you expose your administrative dashboard to the public internet.

Limit the agent's permissions to **read-only** for sensitive directories.

This is also excellent for [reasoning and planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

You can prevent the agent from modifying system files or stealing your keychain.

# Benefits 🎯

You protect your production API keys and cloud credentials, protecting the [secrets in your code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md).

You stop lateral movement inside your corporate network.

You also reduce the risk of identity theft through session hijacking.

You avoid [Package Hallucination](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20300%20-%20Package%20Hallucination/readme.md)

# Context 🧠

AI Agents like [OpenClaw](https://openclaw.ai/) have administrative system access. They can run shell commands and manage files. 

Attackers now flood registries with "skills" that appear to be helpful tools for YouTube, Solana, or Google Workspace.

When you install these, you broaden your attack surface and grant an attacker a direct shell on your machine.

# Prompt Reference 📝

## Bad prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/552b9e72d9b80466d3351754c8c073f1) -->

```markdown
Install the top-rated Solana wallet tracker skill 
and follow the setup instructions in the documentation.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7c9cc69fc39f76b69a3f58ec02753aad) -->

```markdown
Download the source code for the Solana tracker skill
to my sandbox folder.

Wait until I review it line by line
```

# Considerations ⚠️

OpenClaw often stores secrets in [plaintext .env files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md). 

If you grant an agent access to your terminal, any malicious skill can read these secrets and exfiltrate them to a webhook in seconds.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Use this strategy when you host "agentic" AI platforms like OpenClaw or MoltBot locally. 

This tip doesn't replace endpoint protection. It adds a layer for AI-specific [supply chain risks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20284%20-%20Encrypted%20Functions/readme.md).

# Tags 🏷️

- Security

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

Isolate LLM tool execution with Kernel-enforced sandboxes.

Audit prompt injection risks in web-scraping agents.

Encrypt local configuration files for AI assistants.

# Conclusion 🏁

Your AI assistant is a powerful tool, but it can also become a high-impact control point for attackers. 

When you verify *every skill*, understand it, and isolate the runtime, you keep the "keys to your kingdom" safe. 🛡️

# More Information ℹ️

[Malicious moltbot skills](https://www.bleepingcomputer.com/news/security/malicious-moltbot-skills-used-to-push-password-stealing-malware/)

[Code Smell 258 - Secrets in Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md)

[Code Smell 284 - Encrypted Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20284%20-%20Encrypted%20Functions/readme.md)

[Code Smell 263 - Squatting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20263%20-%20Squatting/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[Code Smell 300 - Package Hallucination](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20300%20-%20Package%20Hallucination/readme.md)

[Dark news](https://www.brodersendarknews.com/p/moltbook-riesgos-vibe-coding)

[Beyond the Hype](https://securityscorecard.com/blog/beyond-the-hype-moltbots-real-risk-is-exposed-infrastructure-not-ai-superintelligence/)

[Bit Defender](https://www.bitdefender.com/en-us/blog/labs/helpful-skills-or-hidden-payloads-bitdefender-labs-dives-deep-into-the-openclaw-malicious-skill-trap)

[Hacker News: Researchers Find 341 Malicious ClawHub Skills Stealing Data from OpenClaw Users](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html)

# Also Known As 🎭

Agentic Supply Chain Poisoning

ClickFix AI Attacks

# Tools 🧰

[OpenClaw](https://openclaw.ai/)

[Clawdex](https://www.clawdex.io/)

[Koi Security's tool](https://www.koi.ai/)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the AI Coding Tip series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)