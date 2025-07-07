# Maximiliano Contieri on Bridging the Industry-Academia Divide
            
![Maximiliano Contieri on Bridging the Industry-Academia Divide](Maximiliano%20Contieri%20on%20Bridging%20the%20Industry-Academia%20Divide.jpg)

*Despite their common subject matter, the software industry and computer science often operate on divergent assumptions and priorities, making collaboration difficult. In this episode, Maximiliano Contieri helps us understand the longstanding tension between academia and industry from an insider's perspective. Read on for an insightful discussion on strengthening bridges, applying rigorous methodologies aimed at real-world relevance, and the central goal of building robust software simulations that capture the complexity of the world around us.*

> TL;DR: My recent interview on the Semaphore podcast

[![Watch the video](https://img.youtube.com/vi/q0VtmkA6sVM/sddefault.jpg)](https://youtu.be/q0VtmkA6sVM) 

# Edited transcription from

[Semaphore Podcast](https://semaphoreci.com/blog/maximiliano-contieri)

As a result of his 30 and 25 years of experience in the software industry and computer science academia respectively, Maximiliano Contieri has repeatedly witnessed the 'tension' that arises between both realms.

As industry often outpaces academia, students often hold outdated or inaccurate views (e.g., coding as a solitary activity).  They think that coding is like Hollywood shows in the background, in a basement and alone, and we try to say no, it's a contact sport with a lot of people, with teamwork,  he jokes. Conversely, the industry uses practices academics have deemed bad for years (e.g., nulls, singletons). For this reason, Maxi regards it as a still very immature profession that, for the greater good, needs to bridge the gaps between industry and academia.

# The vital interplay between academia and industry in software development

**It's important for everyone to have weight in both academia and industry, otherwise, you're in a niche and miss seeing things around** Maxi says, emphasizing the value of both perspectives: While academia foundational knowledge and long-term insights prevent industry stagnation and keep developers away from reinventing the wheel. The value of academia comes from standing on the shoulders of giants; for this reason, it prioritizes the value of advancing knowledge instead of moving 'to the next trendy thing.' In turn, the industry is where software's practical experience takes place and cutting-edge tools are demanded and developed. What's more, it's the industry's real-world applications that keep development relevant and computer science in demand. 

To bridge the gap, Maxi stresses the need to be adaptable and context-aware. Academics and professionals must step outside their comfort zones by reading, learning, and engaging with the other side. To this end, both groups should stay informed about broader trends and advancements beyond their immediate niche, and view the differences as opportunities for mutual learning and growth.

# Bridging the gap through test-driven development

Maxi believes TDD can bridge the gap between the academic and real-world software development realms. Test-driven development (TDD) is a software development practice that emphasizes writing tests for your code before you write the actual code itself. It's an iterative process that involves writing a test, making sure it fails (because there's no code yet to pass it), writing just enough code to make the test pass, and then refactoring the code to improve its quality.

Maxi defines TDD as **a learning methodology, not a testing methodology;** to his understanding, **It's not even a development methodology: It�s a methodology to discover how the world works.** In this way, he believes TDD is a powerful tool for:

-Discovering and learning: Writing tests forces you to extract use cases and understand the problem space.

-Building clean code: Hard coding followed by refactoring leads to simpler, more maintainable code.

-Regression testing and knowledge extraction: Each test case captures specific knowledge about the system's behavior.

-Building good scientific models: By reflecting real-world behavior, TDD helps you create accurate models of how the system should work.

TDD emphasizes writing tests before code, gradually building understanding through test cases. This 'baby steps' approach ensures development is driven by concrete evidence rather than speculation, which resonates with the academic emphasis on rigorous experimentation and data-driven conclusions, and mirrors the scientific practice of formulating hypotheses, testing them through experiments, and refining the understanding based on results. As such, TDD forces programmers to confront their assumptions and uncover hidden complexities. 

Withal, Maxi points out that academics tend to favor abstract theories and anticipate future possibilities, while TDD thrives on concrete test cases and incremental learning. Likewise, the initial hard coding encouraged by TDD can clash with the academic ideal of clean code. This requires a shift in perspective, recognizing that initial 'messy' code can be a stepping stone to cleaner, more maintainable solutions through refactoring guided by tests.

Withal, Maxi makes it clear that TDD isn't a silver bullet; it requires re-education and a significant learning curve for effective implementation. In this regard, While Maxi's teams heavily utilize TDD, he acknowledges it's not universally applicable. He echoes Software Engineer Kent Beck's view that TDD may not suit everyone, particularly those prone to anxiety or over-engineering. To Maxi, a programmer's hesitation to hard code and overgeneralization tendencies can also keep them away from TDD.

# Using TDD in legacy systems: A gradual approach

In the case of legacy systems, Maxi acknowledges the difficulty of implementing TDD comprehensively in heavily coupled environments. However, he suggests a strategic approach: using TDD in isolated parts of the system and gradually decomposing the legacy system based on Michael Feathers's approach to legacy code. **You can't write all code using TDD in a legacy system immediately, but you can use it in isolated parts to decompose the legacy** he affirms.

The idea involves shipping the TDD solution to production and addressing new behaviors as they arise. Maxi emphasizes that isolating parts of the system for TDD requires breaking some coupling, indicating that TDD can be applied gradually as different parts of the system are rebuilt over time.

Employing TDD in a legacy system is not an easy or quick fix; it requires dedication and perseverance, especially as it involves a process of education and rehabilitation for the team to adapt to this methodology in such an environment. Yet, Maxi encourages giving it a try despite the difficulty: It pays off, it's your choice. Try it. And try it hard. Don't try it for a couple of days. Because it isn't for anxious people. So it's frustrating. Of course, it's frustrating. You are educating. You are in rehab.

# Clean Code Cookbook: Maxi�s guide to building better software

During the COVID-19 pandemic, Maxi began regularly chronicling his experiences in both realms, culminating in the release of his latest book, Clean Code Cookbook. The book�s title draws inspiration from [Robert C. Martin's (Uncle Bob) definition of clean code](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29). Maxi envisions the book as a collection of recipes, a repository of his own experience infused with Uncle Bob�s tenets but enriched by his own unique perspective and extensive experience, aimed at experienced programmers who might not realize they�re making certain mistakes. 

To this end, the book covers different aspects impacting software development, delving into concepts like primitive obsession, mutability versus immutability, declarative code, naming conventions, commenting practices, code standards, and complexity management, among many others. Each chapter addresses a specific aspect or problem commonly encountered in software development, offering insights and guidelines on how to approach these issues for better code quality, readability, maintainability, and security.

As Maxi explains, the book aims to dispel the notion of 'clean code' as a subjective opinion and empower programmers to understand the long-term consequences of their coding choices. He believes that good design decisions are not just about immediate functionality but also about future-proofing the code for long-term maintainability. 

While acknowledging the existence of numerous 'clean code' definitions, Maxi's book avoids getting bogged down in theory and, in turn, presents concrete recipes, showing how to transform 'core snippets' into better solutions with tangible results. The book explains the reasons behind each recipe, providing theoretical and practical foundations for its recommendations. In like manner, the book attempts to be language agnostic, providing sources in 25 different languages. 

# The bottom line

Purchase Clean Code Cookbook and read Maxi's latest blog post on [cleancodecookbook.com](https://cleancodecookbook.com/). Stay connected with Maxi's expertise and updates on Twitter via his handle [@mcsee1](https://twitter.com/mcsee1). You can also catch glimpses of his recent conferences, podcasts, and upcoming engagements on his website. 

You can also find it on:

[Apple Podcasts](https://podcasts.apple.com/us/podcast/semaphore-uncut/id1463768812)

[Google Podcasts](https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8yNzYxMzMucnNz)

[Spotify](https://open.spotify.com/show/6Tqtzmt78HtlMeNROHAgzh)