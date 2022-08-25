# Y2K22 - The Mistake That Embarrasses Us

![Y2K22 - The Mistake That Embarrasses Us](Y2K22%20-%20The%20Mistake%20That%20Embarrasses%20Us.png)

*The year is 2022 but we keep programming in the 1950s*

> TL;DR: We need to follow one simple rule. Honor the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

The new year arrived with new errors on [Microsoft Exchange](https://es.wikipedia.org/wiki/Microsoft_Exchange_Server).

The problem caused millions of emails worldwide to go undelivered.

Many of them remain [stuck in email transport queues](https://techcommunity.microsoft.com/t5/exchange-team-blog/email-stuck-in-exchange-on-premises-transport-queues/ba-p/3049447).

Some queues are full and cause entire servers to crash.

# The problem

Y2K22 is familiar to engineers like me who worked in [Y2K Bug](https://en.wikipedia.org/wiki/Year_2000_problem).

[Someone](https://www.reddit.com/r/sysadmin/comments/rt91z6/exchange_2019_antimalware_bad_update/) abused an incorrect date representation by using something that is not a date.

Exchange's malware scanning engine stores signature dates using [32-bit integers](https://en.wikipedia.org/wiki/32-bit_computing).

Using integers to store dates is a clear bijection violation.

Also a primitive obsession and [premature optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) code smell.

# The Chain of Responsibilities

Some developer decided (probably without a real benchmark) that storing dates as 32-bit integers was a smart move.

However, the largest possible number that can be stored in 32-bit is *2147483647*.

Things were fine for the 2021 dates because they were stamped as 211231XXXX (for 31st December) using YYMMDDhhmm format.

Yet another smell, Date and time are continuous and consecutive measures. 

So are integers, but not this absurd representation.

Sadly, the developer was not the only one to blame.

The peer reviewer stated that it was a very good optimization.

Also, the QA team forgot to make basic boundaries testing using the [Zombies technique](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20I%20Survived%20the%20Zombie%20Apocalypse/readme.md).

# The error

[Happy new year!](https://en.wikipedia.org/wiki/Year_2000_problem#Year_2022_problem). 

It is January 1st, 2022, according to this [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) we need to convert it to 2201010001. 

This is not possible when trying to format it to 32-bits. The outcome is larger than the maximum number allowed.

This would cause timestamp validations on the server software to fail.

As a result, lots of emails are not being sent piling up on servers.

# The fix

Fixing this problem ([It is not a bug](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)), is very difficult. 

Exchange is a product running on on-premises servers so it has to be patched manually in many cases.

The manual fix you can execute on your Powershell console is [easy:](https://techcommunity.microsoft.com/t5/exchange-team-blog/email-stuck-in-exchange-on-premises-transport-queues/ba-p/3049447)

> Set the date on the signature file as 2112330001 (December 33rd, 2021)

Yes. it is no joke. 

That is the patch. 

Violate and abuse the bijection again creating representations of not real entities.

Using this exploit to set this invalid date should also raise an error according to [fail fast principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md).

# Conclusions

If you want to develop serious software and be proud of it, just be loyal to the bijection.

If you create accurate models of your problems your software will always work as expected.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

