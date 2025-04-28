# From Helpful to Harmful: How AI Recommendations Destroyed My OS

![From Helpful to Harmful: How AI Recommendations Destroyed My OS](From%20Helpful%20to%20Harmful%20How%20AI%20Recommendations%20Destroyed%20My%20OS.jpg)

*Why you should always be in control*

> TL;DR: Always stay in control when using AI tools. Blind trust can lead you to costly mistakes.

# The Challenge

I write multiple articles each week and wanted to automate the repetitive parts of my process.

# The Menace

This week, an internal memo by Shopify's CEO, Tobias Lutke, went viral.

[Twitter](https://x.com/1909251946235437514)

> TL;DR: The memo requires Shopify's workers to be proficient in AI tools.

---

*AI Proficiency Is Now Mandatory*

Using AI effectively is no longer optional at Shopify; it is a baseline expectation for all employees, regardless of role. This marks a significant cultural and operational shift.

*Non-Use of AI Requires Justification*

Employees must demonstrate why AI cannot be used before requesting additional resources (e.g., more staff or time). Stagnation is framed as failure, and employees are encouraged to upskill and experiment with AI continuously.

*AI in Product Development*

AI must be integrated into the early stages (prototype phase) of all GSD (get shit done) projects. This approach is intended to dramatically accelerate learning, iteration, and team collaboration.

*Performance Accountability*

Shopify is adding AI usage to its performance and peer review criteria, making AI adoption part of how employees are evaluated and rewarded, including leadership and executive teams.

---

I do not work at Shopify, and I am not affiliated with the company.

# My Context

I take AI tools as helpers and a mandatory tool both as a software developer and a writer, and I heavily rely on them.

I've been using AI for 10 years, writing about [artificial intelligence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/GPT-3%20Training%20Programmers%20for%20the%20Present%20(and%20the%20Future)/readme.md), making [AI-assisted refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md), and using automated tools to write [clean code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20290%20-%20Refused%20Bequest/readme.md).

I am also an advocate of professional Vibe Coding.

In every [conference](https://www.youtube.com/live/99GuXTIW0R4), [article](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/The%20Great%20Programmer%20Purge%20How%20AI%20Is%20Taking%20Over%20the%20Tech%20Workforce/readme.md), and paper I write, I encourage humans to embrace the AI tools and use them heavily (with caution).

[The Great Programmer Purge](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/The%20Great%20Programmer%20Purge%20How%20AI%20Is%20Taking%20Over%20the%20Tech%20Workforce/readme.md)

I have two quotes (not mine):

> You must always be in control.

and

> AI won't take your job, but a human using it will certainly do; you should become that person.

(You can see this at [53:40](https://www.youtube.com/live/99GuXTIW0R4?si=vcXpY7St5OyVGkcm&t=3199) of this conference)

[![Watch the video](https://img.youtube.com/vi/99GuXTIW0R4/sddefault.jpg)](https://youtu.be/99GuXTIW0R4) 

# Don't Overthink Things

This week, I needed to make some local tests using Python.

I write articles in 25+ different programming languages and don't have all of them installed locally. 

Sometimes I use virtual machines, codelabs and [repl.it](https://replit.com/) running on websites.

This time, I needed to quickly install Python locally (an accidental task).

It started with a simple idea: automate a few things. Save time. Be smart.

So I did what many people are doing now.

AI answered fast. Confident. Like it had done a thousand times before.

*Spoiler: I blindly trusted it. One command later, my operating system was toast.*

# What Went Wrong

In my [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md) articles, I use the 10 most popular AI programming tools.

I just opened one of them ([ChatGPT](https://chatgpt.com/?q=Give%20me%20a%20command%20to%20install%20Python%20in%20Ubuntu)) and prompted it to give me some commands to install Python on my Ubuntu.

> Give me a command to install Python in Ubuntu

Until last week, I used to write:

> hello, please give me a command to install Python in Ubuntu

But now I am aware that those extra tokens consume lots of resources (water, for example), and I am not polite to machines anymore. 😢🤖

[TechRadar article](https://www.techradar.com/computing/artificial-intelligence/chatgpt-spends-tens-of-millions-of-dollars-on-people-playing-please-and-thank-you-but-sam-altman-says-its-worth-it)

The answer was short and clear:

> sudo apt update && sudo apt upgrade -y && sudo apt install python3 python3-pip -y

*I didn't bother to read it.*

I've been using Linux for more than 20 years now.

I just pasted the answer. Typed my password mechanically (I was using sudo to install pip), and went to make dinner.

When I came back, the terminal showed a very long list of commands. That was strange. I just wanted to install Python (with pip, which is the package manager).

The problem (as you might have discovered by now) was this innocent line:

> sudo apt upgrade -y

Which upgraded (and bricked) my personal computer.

ChatGPT decided it was a very good decision to upgrade the operating system first.

I agree that keeping an updated operating system is a good decision to have the latest protections, but this is something you need to plan, have a good backup, and not something you do casually.

The system was bricked, and so was I.

A careful look to the command (and a question to other IAs) will give a more accurate (and safer) answer:

> sudo apt update

# Why Did it Happen to Me?

I had a very long experience with Ubuntu. I was perfectly capable of reading a forum or googling (who googles anything today, BTW?).

I am also a preacher on not to trust AIs blindly, and I enforce it on *every article* I write.

This should not happen to someone like me.

# We are Reptiles

Our brain is a master of efficiency.

Every decision we make consumes energy, so the oldest part of our brain, the so-called "reptilian brain", evolved to optimize for survival, not for deep thinking.

It wants quick reactions, minimal effort, and zero sugar waste.

That’s why it loves delegation.

But what happens when the thing you’re delegating to is a machine?

You do it every day: you follow GPS instructions without questioning them, rely on autocomplete to finish your thoughts, and let a recommendation engine tell you what to watch, buy, or read.

On the surface, this looks like convenience.

Underneath, it’s a biological shortcut. 

Your brain’s decision-making resources are limited. To avoid fatigue, it offloads choices wherever possible.

This isn’t always bad. Routines and heuristics allow you to function in a complex world without becoming overwhelmed.

But when this primitive reflex takes control, you stop asking "why?" — and that’s when things get risky.

# The Illusion of Competence

One of the most dangerous aspects of AI delegation is the illusion of competence. A machine that speaks eloquently, formats correctly, or generates working code appears smart. Sometimes smarter than you.

But behind the polish may lie shallow reasoning, misinterpretation, or even hallucinated content.

You don’t notice because your cognitive laziness kicks in.

You assume correctness because it "sounds right." The deeper, analytical part of your brain — your prefrontal cortex — never gets involved.

This is exactly how misinformation spreads. It’s also how bugs get deployed, contracts go wrong, and systems fail.

# Delegation Without Accountability

The human cost of faulty AI decisions is already here: people getting denied healthcare coverage, flagged as fraudulent, or jailed based on algorithmic predictions. In these cases, the true danger isn’t just the AI — it’s the uncritical acceptance of its output.

When you delegate a decision to a system you don’t understand and don’t check, you’ve surrendered agency. Worse: you’ve surrendered accountability. 

"The algorithm said so" becomes a shield. But it shouldn’t be.

# How to Fight the Reptile inside You

![velociraptor](velociraptor.gif)

Delegation isn’t inherently bad. But you have to make it conscious. That means:

* Verifying the output of any AI you use, *especially for critical tasks*
    
* Understanding the limits of the system you’re relying on
    
* Taking back responsibility for decisions, even when tools make them easier
    
Ask yourself:

> Am I outsourcing this because it’s efficient — or because I’m lazy?

That question alone can re-engage your rational brain.

# Conclusion

Your brain wants to survive.

It doesn’t care if your software works, your model is fair, or your report is accurate. 

It just wants to offload effort.

That worked fine in the jungle. 

But not in a world where decisions have digital consequences.

Delegation without scrutiny is not efficiency. It’s abdication.

And if you don’t remain in control of your decisions, someone—or something-else will.