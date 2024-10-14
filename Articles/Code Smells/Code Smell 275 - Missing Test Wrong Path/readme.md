# Code Smell 275 - Missing Test Wrong Path

![Code Smell 275 - Missing Test Wrong Path](Code%20Smell%20275%20-%20Missing%20Test%20Wrong%20Path.jpg)

*Check the happy path to be happy*

> TL;DR: Ensure you fail the test when no exception is thrown in invalid conditions.

# Problems

- Silent faulty tests
- Missing failure condition
- Poor error validation
- Unclear test outcome
- Skipped test logic

# Solutions

1. Add failure assertion
2. Explicit exception validation
3. Test invalid actions
4. Catch specific errors
5. Check all your test paths
6. Use mutation testing

Context

When writing tests you expect certain cases to throw exceptions. 

If you forget to add a fail condition when no exception is thrown, your test might pass silently. 

If breaking some contract doesn't raise an exception, the test will still pass without you noticing the issue. 

Always include a failure condition to ensure the test fails when the expected exception isn't thrown.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5e14a4afa16ee8d9cfe49ae717dfedcd)

```javascript
// Test: firing at an already hit position should not be allowed

const game = new Battleship();
game.fireAt("A3");  
// First hit
            
try {
    game.fireAt("A3"); 
     // Firing at the same spot
} catch (e) {
    console.assert(e.message === 'Position already hit.', 
     'The error message should indicate the position is already hit.');
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7e86687a61a69093e9c1d4ab1115d718)

```javascript
// Test: firing at an already hit position should not be allowed

const game = new Battleship();
game.fireAt("A3"); 
// First hit

try {
    game.fireAt("A3");
     // Firing at the same spot
    
     // THIS LINE IS IMPORTANT
     cnsole.assert(false, 
        'An exception should have been thrown' .
        ' for firing at the same position.');
     // THIS LINE IS IMPORTANT
  
  
} catch (e) {
    console.assert(e.message === 'Position already hit.',
     'The error message should indicate the position is already hit.');
}
```

# Detection

[X] Semi-Automatic 

You can detect this smell by looking for *try-catch* blocks without a failure condition after an action that should throw an exception. 

Test cases expecting exceptions should always include *assert(false)* right after the invalid action.
 
# Tags

- Testing 

# Level
 
[X] Intermediate 

# AI Generation

AI generators can create this smell because they often focus on handling exceptions but might miss adding failure conditions when the exception doesn't occur. 

This leads to the silent passing of faulty tests.

# AI Detection

AI can detect this smell if you instruct it to check for missing failure assertions after expected exceptions. 

It can automatically add the missing condition to ensure tests fail properly when no exception is thrown.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Correct+what+happens+if+the+exception+is+not+triggered%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Correct+what+happens+if+the+exception+is+not+triggered%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=Correct+what+happens+if+the+exception+is+not+triggered%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+what+happens+if+the+exception+is+not+triggered%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Correct+what+happens+if+the+exception+is+not+triggered%3A+%60%60%60javascript%0D%0A%2F%2F+Test%3A+firing+at+an+already+hit+position+should+not+be+allowed%0D%0A%0D%0Aconst+game+%3D+new+Battleship%28%29%3B%0D%0Agame.fireAt%28%22A3%22%29%3B++%0D%0A%2F%2F+First+hit%0D%0A++++++++++++%0D%0Atry+%7B%0D%0A++++game.fireAt%28%22A3%22%29%3B+%0D%0A+++++%2F%2F+Firing+at+the+same+spot%0D%0A%7D+catch+%28e%29+%7B%0D%0A++++console.assert%28e.message+%3D%3D%3D+%27Position+already+hit.%27%2C+%0D%0A+++++%27The+error+message+should+indicate+the+position+is+already+hit.%27%29%3B%0D%0A%7D%0D%0A%60%60%60) | 

# Conclusion

You must include a fail condition when testing invalid actions like firing at the same position in Battleship. 

This ensures the test fails if no exception is thrown, preventing silent errors. Always validate the error message and ensure your tests catch valid and invalid behaviors.

# Relations

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

[Code Smell 80 - Nested Try/Catch](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2080%20-%20Nested%20Try%20Catch/readme.md)

[Code Smell 132 - Exception Try Too Broad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20132%20-%20Exception%20Try%20Too%20Broad/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Nik](https://unsplash.com/@helloimnik) on [Unsplash](https://unsplash.com/photos/pathway-between-forest-trees-YBlIqmme5pE)
    
* * *

> Time invested in writing tests and refactoring delivers impressive returns in delivery speed, and Continuous Integration is a core part of making that work in a team setting

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)