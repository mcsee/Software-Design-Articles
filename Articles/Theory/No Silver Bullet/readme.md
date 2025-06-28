# No Silver Bullet

![No Silver Bullet](No%20Silver%20Bullet.jpg)

*The phrase "No Silver Bullet" is widely used in the industry. In this article we will revisit the classic paper by Fred Brooks that gave rise to it.*

> TL;DR: The Essence and Accident of Software

Almost 35 years have passed since the [original publication](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf) and little has changed.

In the paper, [Fred Brooks](https://en.wikipedia.org/wiki/Fred_Brooks) predicts (so far we know correctly) that the problems inherent in software development are **essentially** difficult and we will not find magic solutions in the present nor will there be in the future.

# The problem

The paper is based on the Aristotelian concepts of **Essence** and **Accident**.

The silver bullet metaphor, which gives the article its title, has two meanings:

The first indicates that we are facing a monster that cannot be eliminated with conventional and known weapons.

The second meaning tells us about an enemy who was our ally, but later became our greatest fear.

The werewolf grows from within our projects.

![Werewolf](https://cdn.hashnode.com/res/hashnode/image/upload/v1599785760552/yRrTl92F-.jpeg)

The lycanthrope transforms in an unexpected way.

In the place we had a friend now there is a monster that needs to be defeated.

This is not an **alien** that came as an unexpected external threat, it is one of
our allies, suddenly turned into our worst nightmare.

![monster](https://cdn.hashnode.com/res/hashnode/image/upload/v1599786043008/h7BRbU2SQ.jpeg)

Photo by [NeONBRAND](https://unsplash.com/@neonbrand) on [Unsplash](https://unsplash.com/s/photos/monster)

In place of a planned project under control, we find ourselves with a monster that consumes time and resources, failures in delivery dates and with horizon at sight.

We need the silver bullet to get the monster back under control.

# The author

Frederick Brooks is the author of the book [The Mythical Man-Month](https://en.wikipedia.org/wiki/The_Mythical_Man-Month).

The paper compiles Brooks' experience developing the largest software project to date: the [OS/360 operating system](https://en.wikipedia.org/wiki/OS/360).

In the book we can find the famous thesis known now as [Brooks' Law](https://en.wikipedia.org/wiki/Brooks%27s_law):

> While it takes one woman nine months to make one baby, nine women can't make a baby in one month

One of the corollaries of said law holds that

>Adding manpower to a late software project makes it later

This thesis confronts the Taylorist idea of ​​software development, in tune with what was proposed by Peter Naur.

[Programming as Theory Building](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Programming%20as%20Theory%20Building/readme.md)

Brooks won the [Turing Award](https://en.wikipedia.org/wiki/Turing_Award) for his work in 1999.

# The thesis

Brooks argues that no present (in 1986) or future technological development (at least up to the date of the article), will be able to reduce the costs and planning of software projects.

This improvement has occurred systematically with hardware as stated by [Moore's law](https://en.wikipedia.org/wiki/Moore%27s_law).

## The essential problems

Historically, we have wanted to pigeonhole software engineering as a more familiar and well-known metaphor, similar to the construction of bridges or buildings. Civil engineering is predictable and familiar with millennia of history and experience.

Computer scientists want to identify ourselves with such engineering and we look for similarities that **do not really exist** if we consider the very different reality of software development.

There are specific and unique attributes in software that make it **essentially** different from all known engineering:

According to Brooks, we worry about **accidental** errors (such as compilation or code syntax errors) instead of dealing with the **essential problems** (conceptual software modeling errors).

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

### Complexity

The entities modeled in the software will essentially be several orders of magnitude more complex than any other human construct.

> A system with 300 Boolean configurations has more test combinations (2 ^ 300), than the number of atoms in the universe (10 ^ 80).

![stars](https://cdn.hashnode.com/res/hashnode/image/upload/v1599786309014/aZDGR38y6.jpeg)

Photo by [Jeremy Thomas](https://unsplash.com/@jeremythomasphoto) on [Unsplash](https://unsplash.com/s/photos/universe)

This unmanageable explosion of states makes a system very difficult to test, affecting reliability.

The sheer number of variables makes the development process **essentially** difficult for humans to handle.

The complexity of software construction generates management, training and knowledge transfer problems, causing the software to be intrinsically tied to the people who developed it, as Peter Naur enumerates.

The originality of each software development causes each new problem to be different and we cannot find good tools for reusing repeated components as in other industries where new models can be built with standard parts.

Reuse has always been a north in software development. However, we spend much of our time reinventing the wheel, discarding libraries, creating new languages, reinventing exception handling, rediscovering anonymous functions or functional programming's adventages, immutability etc.

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

![bikes](https://cdn.hashnode.com/res/hashnode/image/upload/v1599786577804/OBr3WwMWG.jpeg)

Photo by [serjan midili](https://unsplash.com/@s_midili) on Unsplash

The dependency between software components is much more complex than that of machines, physical structures, or scientific concepts.

The relationships between these components are unique and intricate making the whole system evolution extremely difficult because of the coupling among the parts.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

> The complexity of software systems is an essential problem

The relationships between software components are never linear, therefore, their combinatorics becomes exponential.

Mathematicians and physicists have taken centuries to find simple explanations to unify apparently isolated concepts such as the [Theory of Everything](https://en.wikipedia.org/wiki/Theory_of_everything)

![spaguetti](https://cdn.hashnode.com/res/hashnode/image/upload/v1599786628312/fnY7Ou_gE.jpeg)

Photo by [Chang Duong](https://unsplash.com/@iamchang) on Unsplash

## Conformity

In addition to the essential complexity of software development, and due to the immaturity of our profession, we add a layer of accidental complexity by making models much more complex than necessary.

Since we cannot avoid essential complexity, the sole task of a software engineer should be to **eliminate all accidental complexity **.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

## Changeability

No one would ask a civil engineer to change the foundation of the basement after they have built a 60-floor tower. However, it is a task that computer engineers often accept because our product is much more malleable, even when in productive environments.

It is very difficult for automotive production lines to make a [product recall](https://en.wikipedia.org/wiki/Product_recall) of a car once it has been sold.

However, we make changes to our systems on a regular basis. Whether the software works as expected, to perform evolutionary maintenance, as well as if it has flaws, if it needs to adapt to new contexts, laws, technological changes etc.

Software lives much longer than initially estimated, which is why many of the world's developers are in charge of maintaining these "legacy" systems.

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

## Invisibility

Software is invisible. For decades, people tried to design software with plans like architects do. All those attempts failed.

> The software design is present in the code, never in the diagrams. Diagrams don't execute, they have no errors and nobody maintains them. We need to trash them.

Software does not have a spatial or geometric representation. We cannot imagine it or make it visible due to the large number of axes of change.

Just perform [contour lines](https://en.wikipedia.org/wiki/Contour_line) to be able to observe some isolated aspects, as unit tests do.

However, we can never cover its entirety, follow the flow of the data, or see all the interactions between objects.

# Failed attempts

Brooks lists possible silver bullets that by 1986 had already failed:

![target](https://cdn.hashnode.com/res/hashnode/image/upload/v1599949201322/7b_4ZFUTS.jpeg)
Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on Unsplash

## High-level languages

High-level languages ​​were on the rise in the 1970s and were the hope back then. Brooks was correct in stating that these languages ​​eliminate some of the accidental complexity by being away from the machine, its states, registers, disks etc.

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

What seemed like a glimmer of hope is still far from reality in sad times like 2020, where languages ​​like Go or C # privilege the gain of a few processing cycles over **good models**, seducing fans of premature optimization with short-term promises.

## Time Sharing Systems

Brooks lists a breakthrough from the 70s that were timesharing machines. We currently have near-infinite virtualization, load balancers, and scalability accessible to everyone. But this does not mean that we have found the silver bullet.

## Unified program environments

Shared libraries and operating systems, like the newborn Unix, promised ease of reuse. But today we know that, although this is the norm, they did not manage to defeat our inner wolf by considerable orders of magnitude.

## Object-oriented programming

Object-oriented programming was a flame of hope in the 1970s for decreasing **accidental** complexity. Brooks notes with accuracy that there is nothing they can do with the **essential** complexity.

Today, we see concepts discovered in the 1970s and forgotten by the object-oriented languages ​​of the 1990s such as Java, Python or PHP: This is how the benefits of encapsulation, polymorphism and immutability are rediscovered.

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

## Artificial intelligence

Artificial intelligence had many very hopeful and productive summers, interspersed with dark, medieval winters.

Brooks lists the now-defunct expert systems with inference engines based on preprogrammed rules. The modern version of these systems is *machine learning*, where the rules are "learned" and not fixed using supervised or unsupervised learning.

But today's artificial intelligence cannot beat the **essential** difficulty. There are notable advancements in vision and robotics and wonders like GPT3, which manages to produce good code to solve low-essential complexity problems.

## Automatic Programming

Related to artificial intelligence is automatic programming. Today there are more interesting branches such as competitive programming or code generation mentioned in the previous section.

## Graphic Programming

Brooks strongly criticizes those who seek the silver bullet in attempting to develop software in the same way that blueprints were created for building hardware.

What Brooks could not anticipate, other than the dismal failure of graphical software design tools, is that designing circuits is now also an **essentially** complex problem.

## Program verification

Formal software verification was always difficult to scale.

This was valid in 1986, and in the present.

There are no mechanisms that make it feasible to formally verify highly complex software and we do not see academic publications that indicate a change in this trend.

## Tools and environments

The programming environments or IDEs that Brooks lists have evolved incredibly in these four decades, assisting developers to build increasingly complex software.

Needless to say, they alone could not eliminate the **essential** complexity.

## 1986 Promises

Brooks lists possible options in the future:
1. Build and reuse software instead of creating it expecting a reduction in development costs
2. Rapid Prototyping
3. Iterative and incremental development
4. Better designs

Currently we know that we must pay attention to all the items on this list, which will help us improve quality and are heavily used in the industry.

Unfortunately, none of them turned out to be the much-desired silver bullet.

## Update 1996

In the anniversary edition, Brooks clarifies about the use of the accidental word, dissociating it from the value of mishap and bringing it closer to the concept of chance.

At the same time, it revisits the importance of buying software packages instead of producing them and highlights the progress of object-oriented programming, although noting that it does not generate advantages of great orders of magnitude.

The author goes back to focus on the underestimation of software reuse as opposed to the systematic construction of solutions to the same problems.

# Conclusion 🏁

Brooks showed us, almost 40 years ago, that we should not underestimate essentially difficult problems in the software industry.

This statement was opposed to the prevailing positivism of this time, similarly to the blow that mathematics suffered at the beginning of the 20th century with the [Godel's incompleteness theorems](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems).

Once the insurmountable limits are recognized, we will have to work on the things that, fortunately, we still have the capacity to improve.