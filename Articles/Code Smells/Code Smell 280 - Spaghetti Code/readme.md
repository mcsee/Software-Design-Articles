# Code Smell 280 - Spaghetti Code

![Code Smell 280 - Spaghetti Code](Code%20Smell%20280%20-%20Spaghetti%20Code.jpg)

*GOTO Chaos: Spaghetti Code*

*This article is dedicated to the late [Thomas E. Kurtz](https://en.wikipedia.org/wiki/Thomas_E._Kurtz), one of [BASIC](https://en.wikipedia.org/wiki/BASIC)'s creators, as it was the first programming language I learned.*

> TL;DR: GOTO statements create confusing and unmaintainable code

# Problems

- Logic becomes unclear  
- Debugging gets harder  
- Flow jumps erratically  
- Code lacks structure  
- Maintenance becomes difficult 

# Solutions

1. Use structured programming
2. Replace with loops  
3. Simplify control flow  
4. Avoid unnecessary [jumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20100%20-%20GoTo/readme.md)
 
# Context

Spaghetti describes code that is poorly structured and difficult to understand. It often involves deeply nested loops, excessive use of goto statements, and complex control flow. 

When you overuse GOTO statements, your program becomes a tangled mess of uncontrolled jumps. 

This was common in the 70s when *BASIC* encouraged *GOTO* for flow control. While it can solve simple problems quickly, *GOTO* leads to spaghetti code that's nearly impossible to debug or extend.

*Spaghetti Code << Structured Programming << Object-Oriented Programming << Machine Learning Programming*

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/3d7eece73ed40d88e25701b3dc9c5988) -->

```basic
0 REM Request a Zero
10 INPUT "Enter a number: ", N
20 IF N = 0 THEN GOTO 50
30 PRINT "Number is non-zero"
40 GOTO 10
50 PRINT "Goodbye"
60 END
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/1d4e14095a2a844a7d659a2e9b94e348) -->

```basic
10 DO
20   INPUT "Enter a number: ", N
30   IF N <> 0 THEN PRINT "Number is non-zero"
40 LOOP UNTIL N = 0
50 PRINT "Goodbye"
60 END
```

# Detection

[X] Automatic 

You can detect this smell by scanning for frequent *GOTO* usage, especially when they jump between unrelated code sections. 

Look for logical breaks caused by excessive jumping and ask if structured control flow can replace them.

# Tags

- Coupling

# Level

[X] Beginner

# AI Generation

AI generators can include *GOTO* when mimicking older coding styles.

They might use it for simplicity without considering modern best practices.

# AI Detection

You can instruct AI to replace *GOTO* with loops or structured constructs like *IF-ELSE* or *WHILE*.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Convert it to more declarative avoiding Gotos

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+it+to+more+declarative+avoiding+Gotos%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+it+to+more+declarative+avoiding+Gotos%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+it+to+more+declarative+avoiding+Gotos%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+it+to+more+declarative+avoiding+Gotos%3A+%60%60%60basic%0D%0A0+REM+Request+a+Zero%0D%0A10+INPUT+%22Enter+a+number%3A+%22%2C+N%0D%0A20+IF+N+%3D+0+THEN+GOTO+50%0D%0A30+PRINT+%22Number+is+non-zero%22%0D%0A40+GOTO+10%0D%0A50+PRINT+%22Goodbye%22%0D%0A60+END%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion

Overusing [GOTO](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20100%20-%20GoTo/readme.md) creates chaotic and unmanageable code. 

Replace it with structured programming techniques to improve readability and maintainability.

# Relations

[Code Smell 100 - GoTo](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20100%20-%20GoTo/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/BASIC)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Sofia Ciravegna](https://unsplash.com/@sociravegna) on [Unsplash](https://unsplash.com/photos/a-plate-of-spaghetti-with-meat-and-tomato-sauce-khQeenz99H0)      
  
* * *

> Spaghetti code is a program with its logic tangled like spaghetti. Avoid the tangles, and you simplify your life.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)