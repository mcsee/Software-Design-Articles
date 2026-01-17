# Maxi Contieri on Clean Code, Refactoring, and Test-Driven Development

![Maxi Contieri on Clean Code, Refactoring, and Test-Driven Development](Maxi%20Contieri%20on%20Clean%20Code,%20Refactoring,%20and%20Test-Driven%20Development.jpg)

*A Quick interview on clean code*

> TL;DR: A Quick interview on clean code

This Slack AMA discussion by Limarc Ambalina, Arthur Tkachenko, Amy Tom, Muhammad Bilal, Natasha, David, and I occurred in Slogging's official #amas channel, and has been edited for readability.

Mcsee Mar 24, 2021, 1:05 AM
Hello! My name is Maxi Contieri. I blog about clean code, refactoring and TDD. I have been working on the industry for the past 25 years and teaching at university. You can AMA related to clean code, code smells, refactoring and Object-Oriented Design.

I’ll be hosting an AMA this Wednesday at 2pm EST (12pm MT, 6pm GMT) to answer any questions and talk with you:

Natasha NelMar 4, 2021, 11:17 AM
Loved the latest installment mcsee: https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md

Where did you get the inspiration to write this series, and what have you learned along the way?

Mcsee Mar 24, 2021, 6:03 PM
Good Evening! Related to Natasha Nel question. The inspiration comes from 3 main sources:

1- Present and past jobs.
2- Experience with my students at the university.
3- Books and articles from other writers and research on them.

David SmookeMar 10, 2021, 7:50 AM
Mcsee wherever you read bad code, do you get any sensations in your nose?

Mcsee Mar 24, 2021, 6:04 PM
Hi David Smooke! When I read bad code I get a lot of sensations. I can' tell you if they come from my nose. But it definitively rings a bell and calls for attention (and refactoring). That is what I try to teach on my articles. To "smell" them and not take them for granted.

Muhammad BilalMar 14, 2021, 11:43 PM
Hello mcsee , I love what you are doing and want to ask to my understanding, and I myself am a clean code perk, why do you think people love dirty code? and doe the quality of code speak about the personality of a person?

Mcsee Mar 24, 2021, 6:07 PM
Hello Muhammad Bilal : I disagrre people "love" dirty code. I just think for many people readability is not a top priority but premature optimization or looking smart indeed is. I try to show them the problems caused by dirty code. These problems are not so clear on fresh new code and they are not aware of it. Most of the code we deal with (our and third party) is legacy code and should be more declarative.

Mcsee Mar 24, 2021, 6:08 PM
Related to your second question. I don't think the code speaks about the personality, but I am a software engineer, not a psychologist. I have seen messy people write great code and I have also seen (a lot) very carefull and clean people write bad (implementative) code.

Limarc AmbalinaMar 24, 2021, 6:09 PM
In your latest article: https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md

You talk about the standard of calling software glitches bugs leads to a removal of responsibility from the developers and the idea that bugs happen and are out of our control.

Is this something you've experienced in your own career and has changing the language you use improved the output of your team or the culture of your dev team?

Mcsee Mar 24, 2021, 6:11 PM
I've tried to "change" the concept of BUG in many organizations I have worked in. I don't even use the word myself. But is a great cultural shift and not an easy one. Things are changing in the world and we are more critical on the status quo of naming thanks to the BLM movement, feminism and great movements that are showing us the importance of good namings. In my article I quote the Git change from 'master' to 'main' as a light of hope.

Arthur TkachenkoMar 24, 2021, 6:24 PM
Hello Maximiliano, I'm happy to be here, and thanks for your time.
I'm a huge fan, really.

And for sure, I'm a fan of great code and refactoring, as a process.
I have few questions:

Mcsee Mar 24, 2021, 6:25 PM
Hi Arthur Tkachenko, Nice to meet you !

Amy TomMar 24, 2021, 6:26 PM
Hi Maxi! Thanks for doing an AMA! Great to meet you. As a beginner in the coding world, I’d love for you to explain further what you mean by "code smells"

Arthur TkachenkoMar 24, 2021, 6:27 PM
(yes, I voted for you on our last noonies)

Mcsee Mar 24, 2021, 6:27 PM
I think every organization has its structure. I am myself a software engineer manager so I choose team priorities. I take everyday decisions on priorities and they are not very easy to make. Sometimes we have time for refactorings, sometimes we don't. So we schedule a case and move on to build new features or correct defects. What i am sure of is , technical debt is a debt, the later you pay it the more cost it has.

Mcsee Mar 24, 2021, 6:29 PM
I cannot give you a rule on time. But if you postpone a refactor and you encounter a defect, time moves on and you find another defect etc. your technical debt is clearly shouting. On the opposite side, if we just do refactors and tech debts we miss a lot of business opportunities. I have no silver bullet on this, sorry.

Mcsee Mar 24, 2021, 6:32 PM
Hi Amy Tom! I have written more than 60 code smells and I noticed I never stopped to define what it does mean. The term was coined by Martin Fowler and Kent Beck on their excellent books. But I am fully aware not all new developers read this so I will write an 'introductory article' in the middle of the series 🙂 https://en.wikipedia.org/wiki/Code_smell

Mcsee Mar 24, 2021, 6:33 PM
Now added to my todo list. I will talk about the definition on them. TD LR. some very short piece of code that has evident design problems.

Mcsee Mar 24, 2021, 6:34 PM
Thank you Arthur Tkachenko for the vote 🙂

Arthur TkachenkoMar 24, 2021, 6:35 PM
I agree mcsee I always tell people that tech debt is like getting credit from a bank. Today it seems like a great option, but soon or later you'll need to pay additional interest.

Mcsee Mar 24, 2021, 6:36 PM
I will point you to these books
Refactoring: Improving the Design of Existing Code - By Martin Fowler
Clean Code - By Bob Martin
All of them 🙂 - By Kent Beck

And this was the original wiki https://wiki.c2.com/?CodeSmell

Mcsee Mar 24, 2021, 6:38 PM
So Arthur Tkachenko when shoul be deal with this debt. The answer would be when interest rate gets higher.
For example: if you have a module with a lot of tech debt but is not a source of defects or a source of improvements, just leave it.
On the contrary: A heavy used module with small debt might make you pay a lot on a daily basis. Pull the plug and solve it!

Mcsee Mar 24, 2021, 6:41 PM
Going back to Amy Tom Most code smells are related to large systems with heavy coupling and there are not many courses on the academia or paid ones dealing with them. But you will surely come accross them if you work on a not so small organizations.
Most courses are related to fancy technologies or languages. They are great because they teach you how to use tools. But we also need to learn on fundamentals. Once the tools get obsolete and we need to move on the next one.

Arthur TkachenkoMar 24, 2021, 6:42 PM
At Hackernoon I'm usually throwing ideas about upgrades and making our working "gears" as small and independent as possible. Because when you isolating something - you can play with it as you want, cover it with tests, and expand later. But from a business perspective, it's not always the best choice, for sure.

Mcsee Mar 24, 2021, 6:45 PM
Sure. KISS principle. This can lead to fragmentation on large organizations. I work on a a 800 member company and it is a fine balance and a human task.

Mcsee Mar 24, 2021, 6:46 PM
All large companies wish for the startup pace, but as organizations get larger, constraints increases

Mcsee Mar 24, 2021, 6:47 PM
And Isolation is key. If you can't isolate you have coupling. and coupling is the biggest problem in software industry https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md

Limarc AmbalinaMar 24, 2021, 6:49 PM
For startups and large companies alike, when you have too much to work on and not enough devs, outsourcing development has been a hot topic. We've seen more articles come in about it on Hacker Noon. What is your opinion of allowing external teams to work on your organization's code?

Have you ever been part of a company that outsourced part of their dev work to freelancers or contract firms?

Mcsee Mar 24, 2021, 6:54 PM
I have worked with outsourcing in the past, and my opinion is you should definitively do it on satellite modules. I wouldn't outsource core business or core technologies because the knowledge is on the people https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Programming%20as%20Theory%20Building/readme.md and if the people do not belong to the company the asset is zero. Of course if I need a specific development on an accidental feature I would contract the best qualified team. But, for core business I wouldn't do it. It is just my opinion. I founded 3 startups and worked a lot with outsourcing and was hard to maintain their code.

Arthur TkachenkoMar 24, 2021, 6:54 PM
At some point in my career, I realize that "we" put a lot of pressure on developers.
It's a hard profession:

But I also see that automation, or how I call it "help from robots," can help a lot.

Instead of asking developers to adopt and use TDD - it's better to build a QA team.
Instead of asking developers to make "bugs-free" software - there can be a better setup, like CI/CD workflows that will limit the number of bugs that traveling from staging into production.

Even if you part of a small team with limited resources.
Even if you are coding alone your pet project - you can allocate some time on a setup that will make your code less fragile.

I find it helpful to use some tools from GitHub Marketplace that is free for public repositories.
Tools that can analyze your code and giving you hints of what can be improved.
It's not solving all the problems but can guide developers, especially when they are working with deadlines and stressed.

Sorry for this long intro, but what tools can you recommend to adapt to the development process?

Mcsee Mar 24, 2021, 6:56 PM
Yes. Dealing with developers is hard, because we have both a creative and an engineering process together.
I don't see why you should choose between TDD and a QA. I would suggest both since TDD is not about testing.

Mcsee Mar 24, 2021, 6:58 PM
I would never ask developers to make defect-free software since it is impossible.
The only rule with defects (what you call B-Word) is they fool us only once. Once the defect is found we cover it with automated testing and it WILL NEVER happen again.

Arthur TkachenkoMar 24, 2021, 6:58 PM
Amazing advice!

Mcsee Mar 24, 2021, 6:59 PM
When I work on pet projects I do make a test setup since i want my code to be as professional as the one I ship to clients

Mcsee Mar 24, 2021, 7:01 PM
Related to Github linters I do mention them a lot on my code smell series. I think linters are a great quality tool. Since I want my articles to be language agnostic I don't mention them explicitly, but most code smells can be detected in an automatic way.

Mcsee Mar 24, 2021, 7:02 PM
I will not recommend tools since tools depend on your specific technologies. I will recommend you to choose a tool that prevents defects for you whatever the technology you use. And if the language doesn't have tools or a community support, it is time to switch to a more mature technology 🙂

Mcsee Mar 24, 2021, 7:03 PM
I would definitively recommend a human code review AND an automated one. They don't intersect much.

Arthur TkachenkoMar 24, 2021, 7:07 PM
I agree. and human code reviews have a lot of benefits. even small conversations in pull requests can help.

Mcsee Mar 24, 2021, 7:07 PM
Yes. They enforce Naur's vision on collective ownership. The paper is almost 30 years old, and it is key to understand code

Muhammad BilalMar 24, 2021, 7:51 PM
Mcsee Thank you for giving a very logical perspective of it, but I mean how do you fix the laziness of a person, where I find those that develop an interest in the output of their work, seldom develop the ability to maintain or optimize it. All I could give an excuse I suppose for watching people write dirty code is just laziness and lack of interest. What are your thoughts on it, would love to expand my excuse on a third one.. lolx

Mcsee Mar 24, 2021, 7:58 PM
In my experience, lazy people do not change. I have dealt with unmotivated developers and change their tasks, done some more micro-management etc. without much success. There might be outliers. Not on my shift.

Watch out for current times. We are not just working from home. We are working during a mortal pandemic with lockdowns and fears. So it is very difficult to make assessments. Going back to motivation, most lazy people are ignorant and make things without measuring consequences. We need to educate them with real examples.

Mcsee Mar 24, 2021, 7:58 PM
You can ask me more questions on the original thread
Lead photo by Karsten Würth on Unsplash