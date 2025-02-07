# Code Smell 272 - API Chain

![Code Smell 272 - API Chain](Code%20Smell%20272%20-%20API%20Chain.jpg)

*Streamline Your API Tests: Less is More*

> TL;DR: Use primitive steps to verify API behavior instead of direct requests.

# Problems

- Unnecessary API calls
- Slow test performance
- Overcomplicated validations
- [Fragile tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)
- [Slow](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) feedback loops
- Maintainability
- Misleading test results

# Solutions

1. Test primitive outcomes
2. Validate responses directly
3. Avoid extra API steps
4. Simplify test logic

# Context

When you test an API, you might fall into the trap of using multiple API requests to verify a single operation.

Making a *POST* and immediately making a *GET* to check the existence of the resource with the payload is a straightforward solution. 

This pattern adds complexity and makes your tests slower. 

Also if your *GET* operation breaks, you will have many tests failing not relating to the test *GET* operation.

The epitome of testing is a single broken test for a wrong behavior.

Instead of verifying resource creation through a *GET* and inspecting the JSON response, you can focus on primitive steps. 

Check if the *POST* succeeded by validating the status code or checking the resource's existence.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/5eb9b894e0b974af2a2ad4ba6a7a9072) -->

```gherkin
Feature: Movie Management
  Scenario: Create a movie and verify
    When I send a POST request to "/movies" with the following data:
      | title     | director          | year |
      | Klendathu | Christopher Nolan | 2010 |
    When I send a GET request to "/movies/Klendathu"
    Then the response status should be 200
    And the response should contain:
      | title     | director          | year |
      | Klendathu | Christopher Nolan | 2010 |
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/69210049d4e68330f70cf1dbbe66dcba) -->

```gherkin
Feature: Movie Management
  Scenario: Create a movie and verify
    When I create a movie with the following details:
      | title      | director          | year |
      | Klendathu  | Christopher Nolan | 2010 |
    Then the movie "Klendathu" should exist in the system
    ## This is a low level existance postcondition
    ## Without relying on a GET request
```

# Detection

[X] Semi-Automatic 

You can detect this smell when you see test steps that use a *GET* request to verify the success of a *POST*. 

# Tags

- Testing

# Level

[X] Intermediate

# AI Generation

AI generators often create this smell when generating API tests, defaulting to chaining requests and validating the entire resource, rather than focusing on the operation's outcome.

# AI Detection

AI tools can potentially detect this smell with proper instructions. 

You could train an AI to identify patterns of consecutive *POST* and *GET* requests in scenarios and suggest consolidating them into more abstract, primitive steps.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=Validate+the+resource+existence+with+a+step+instead+of+performing+a+get%3A+%60%60%60gherkin%0D%0AFeature%3A+Movie+Management%0D%0A++Scenario%3A+Create+a+movie+and+verify%0D%0A++++When+I+send+a+POST+request+to+%22%2Fmovies%22+with+the+following+data%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A++++When+I+send+a+GET+request+to+%22%2Fmovies%2FKlendathu%22%0D%0A++++Then+the+response+status+should+be+200%0D%0A++++And+the+response+should+contain%3A%0D%0A++++++%7C+title+++++%7C+director++++++++++%7C+year+%7C%0D%0A++++++%7C+Klendathu+%7C+Christopher+Nolan+%7C+2010+%7C%0D%0A%60%60%60) | 

# Conclusion

Focus your acceptance tests on the direct results of operations like *POST*.

Avoid making a GET request afterward to verify what you already know.

# Relations

[Code Smell 259 - Testing with External Resources](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20259%20-%20Testing%20with%20External%20Resources/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Dmitriy Demidov](https://unsplash.com/@fotograw) on [Unsplash](https://unsplash.com/photos/a-group-of-wrenches-arranged-in-a-circle-iuuJC_pjLU0)
    
* * *

> As a rule, software systems do not work well until they have been used, and have failed repeatedly, in real applications.

_Dave Parnas_
   
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)