# We Should Get Rid of HelloWorld Forever💩

![We Should Get Rid of HelloWorld Forever](We%20Should%20Get%20Rid%20of%20HelloWorld%20Forever.jpeg)

*Every tutorial I've read for 30 years starts with the infamous 'Hello World' example. This could be one of the reasons we write crappy software.*

> TL;DR: Let's get rid of "Hello World"

"Hello World" is the first program me make in every language.

[Wikipedia](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)

We can measure the complexity of language by counting the lines it takes to produce the desired output.

We can also time how much it takes for a *newbie* to figure out the solution (this is also known as *Time to Hello World" (TTHW)*.

These two metrics are uncorrelated to productivity.

* * *

Many sites compile different *Hello World* programs in a lot of languages.

%[http://helloworldcollection.de/]

# The Problems

The *Hello Word* example has a lot of problems introduced early when developers are making their first steps in programming.

1. It uses *[globals](https://en.wikipedia.org/wiki/Global_variable)* in many languages. Global functions are a code smell. Teaching them to newcomers in their first example is conflicting.

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

2. *Hello World* yields [side effects](https://en.wikipedia.org/wiki/Global_variable) (console, file system, printers, etc.).

3. We write the code and we cannot test if it is working. We can manually check for the output but our software cannot assert our outcome was right.

4. If our *HelloWorld* works today we cannot ensure it will keep working tomorrow.

# The Solution

All developers should start with:

```
function testFalse()
{
    Assert(1==2)
}
``` 

## Advantages

1. We start with a broken test. This is the first step to start developing software according to *test-driven development* technique.

[How to Squeeze Test Driven Development on Legacy Systems](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md)

2. We introduce developers to a [Continuous Integration/Continuous Development](https://en.wikipedia.org/wiki/CI/CD) pipeline with their first instruction.

3. We use no *Globals* or side effects.

4. We show the importance of early testing.

5. We stress how important is to have working code and [automated tests](https://en.wikipedia.org/wiki/Test_automation) from the very first second.

# Conclusion 🏁

 
We need to stop writing *HelloWorld* as the first sentence of a language.

Next time you come across a new fancy language, please start with a broken test.