# Refactoring 037 - Testing Private Methods

![Refactoring 037 - Testing Private Methods](Refactoring%20037%20-%20Testing%20Private%20Methods.jpg)

*Turn hidden private logic into a real concept without using AI*

> TL;DR: You can and should test private methods

# Problems Addressed 😔

- Broken encapsulation
- Hidden rules
- White-box Testing Dependencies
- Hard testing
- Mixed concerns
- Low reuse
- Code Duplication in Tests
- Missing [Small objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

# Related Code Smells 💨

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)
 
[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 177 - Missing Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

# Context 💬

I was pair programming with an AI Agent and asked it to create some unit tests for a private method I was about to modify [TDD Way](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md).

The proposed solution used [metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md) which is almost every time a mistake.

You need to be in control and not [trust AI blindly](https://www.youtube.com/shorts/XfAqC6BB_KE).

# Steps 👣

1. Identify a private method that needs testing.

2. Name the real responsibility behind that logic.

3. Extract the logic into a new class.

4. Pass the needing objects explicitly through method arguments.

5. Replace the private call with the new object.

This is a special case for the [Extract Method refactoring](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Sample Code 💻

## Before  🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/48219e56cf4a778e2ef635f9920ae954) -->

```php
<?php

final class McpMessageParser {
    private $raw;

    public function parse() {
        return $this->stripStrangeCharacters($this->raw);
    }

    // This is the private method me need to test 
    // For several different scenarios
    // Simplified here
    private function stripStrangeCharacters($input) {
        return preg_replace('/[^a-zA-Z0-9_:-]/', '', $input);
    }
}
```

## Intermediate solution by AI

This is a wrong approach using [Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md).

<!-- [Gist Url](https://gist.github.com/mcsee/4cf6f48f5466d7b38be12af08ca7d2a4) -->

```php
<?php

use PHPUnit\Framework\TestCase;

final class McpMessageParserTest extends TestCase {
    private function invokePrivateMethod(
        $object, 
        $methodName, 
        array $parameters = []
    ) {
        $reflection = new ReflectionClass(get_class($object));
        // This is metaprogramming.
        // That generates fragile and hidden dependencies
        // You need to avoid it
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);
        return $method->invokeArgs($object, $parameters);
    }

    public function testStripStrangeCharactersRemovesSpecialChars() {
        $parser = new McpMessageParser();
        $result = $this->invokePrivateMethod(
            $parser, 
            'stripStrangeCharacters', 
            ['hello@world#test']
        );
        $this->assertEquals('helloworldtest', $result);
    }

    public function testStripStrangeCharactersKeepsValidCharacters() {
        $parser = new McpMessageParser();
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9e2aff383a1fbcc07cd42666f0076c23) -->

```php
<?php

final class McpMessageParser {
    private $raw;
    
    public function parse() {
        // Step 5: Replace the private method call 
        // with the new object
        $stripper = new CharacterStripper($this->raw);
        return $stripper->strip();
    }
}

// CharacterStripper.php
// Step 2: Create a new class (Method Object)
final class CharacterStripper {
    private $input;
    
    // Step 4: Pass all necessary data as constructor 
    // parameters
    public function __construct($input) {
        $this->input = $input;
    }
    
    // Step 3: Move the private method logic 
    // to the new class
    public function strip() {
        return preg_replace(
            '/[^a-zA-Z0-9_:-]/', 
            '', 
            $this->input
        );
    }
}

// CharacterStripperTest.php

use PHPUnit\Framework\TestCase;

final class CharacterStripperTest extends TestCase {
    public function testStripRemovesSpecialChars() {
        $stripper = new CharacterStripper('hello@world#test');
        // No metaprogramming needed
        $this->assertEquals('helloworldtest', $stripper->strip());
    }

    public function testStripKeepsValidCharacters() {
        $stripper = new CharacterStripper('valid_Name-123:test');
        $this->assertEquals(
            'valid_Name-123:test', 
            $stripper->strip()
        );
    }

    public function testStripHandlesEmptyString() {
        $stripper = new CharacterStripper('');
        $this->assertEquals('', $stripper->strip());
    }

    public function testStripRemovesSpaces() {
        $stripper = new CharacterStripper('hello world test');
        $this->assertEquals('helloworldtest', $stripper->strip());
    }

    public function testStripRemovesUnicodeChars() {
        $stripper = new CharacterStripper('café™');
        $this->assertEquals('caf', $stripper->strip());
    }

    public function testStripKeepsUnderscores() {
        $stripper = new CharacterStripper('test_method_name');
        $this->assertEquals(
            'test_method_name', 
            $stripper->strip()
        );
    }

    public function testStripKeepsColons() {
        $stripper = new CharacterStripper('namespace:method');
        $this->assertEquals('namespace:method', $stripper->strip());
    }

    public function testStripKeepsHyphens() {
```

# Type 📝

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe if you keep the same transformations and follow the Extract Method procedure.

# Why is the Code Better? ✨

You expose business rules instead of hiding them.

You can also test sanitation and other small rules without breaking encapsulation.

You remove the temptation to [test private methods](http://shoulditestprivatemethods.com/).

All these benefits without changing the method visibility or breaking the encapsulation. 

# How Does it Improve the Bijection? 🗺️

In the real world, complex operations often deserve their own identity. 

When you extract a private method into a method object, you give that operation a proper name and existence in your model. 

This creates a better [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  between your code and the domain. 

You reduce [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) by making dependencies explicit through constructor parameters rather than hiding them in private methods. 

The [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) technique helps you identify when a private computation represents a real-world concept that deserves its own class.

# Limitations ⚠️

You shouldn't apply this refactoring to trivial private methods. 

Simple [getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md), [setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md), or one-line computations don't need extraction. 

The overhead of creating a new class isn't justified for straightforward logic. 

You should only extract private methods when they contain complex business logic that requires independent testing.

# Refactor with AI 🤖

You can ask AI to create unit tests for you.

Read the context section.

You need to be in control guiding it with good practices.

> Suggested Prompt: 1. Identify a private method that needs testing.2. Name the real responsibility behind that logic.3. Extract the logic into a new class.4. Pass the needing objects explicitly through method arguments.5. Replace the private call with the new object.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+a+private+method+that+needs+testing.2.+Name+the+real+responsibility+behind+that+logic.3.+Extract+the+logic+into+a+new+class.4.+Pass+the+needing+objects+explicitly+through+method+arguments.5.+Replace+the+private+call+with+the+new+object.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+a+private+method+that+needs+testing.2.+Name+the+real+responsibility+behind+that+logic.3.+Extract+the+logic+into+a+new+class.4.+Pass+the+needing+objects+explicitly+through+method+arguments.5.+Replace+the+private+call+with+the+new+object.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+a+private+method+that+needs+testing.2.+Name+the+real+responsibility+behind+that+logic.3.+Extract+the+logic+into+a+new+class.4.+Pass+the+needing+objects+explicitly+through+method+arguments.5.+Replace+the+private+call+with+the+new+object.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+a+private+method+that+needs+testing.2.+Name+the+real+responsibility+behind+that+logic.3.+Extract+the+logic+into+a+new+class.4.+Pass+the+needing+objects+explicitly+through+method+arguments.5.+Replace+the+private+call+with+the+new+object.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+a+private+method+that+needs+testing.2.+Name+the+real+responsibility+behind+that+logic.3.+Extract+the+logic+into+a+new+class.4.+Pass+the+needing+objects+explicitly+through+method+arguments.5.+Replace+the+private+call+with+the+new+object.%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0Afinal+class+McpMessageParser+%7B%0D%0A++++private+%24raw%3B%0D%0A%0D%0A++++public+function+parse%28%29+%7B%0D%0A++++++++return+%24this-%3EstripStrangeCharacters%28%24this-%3Eraw%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++%2F%2F+This+is+the+private+method+me+need+to+test+%0D%0A++++%2F%2F+For+several+different+scenarios%0D%0A++++%2F%2F+Simplified+here%0D%0A++++private+function+stripStrangeCharacters%28%24input%29+%7B%0D%0A++++++++return+preg_replace%28%27%2F%5B%5Ea-zA-Z0-9_%3A-%5D%2F%27%2C+%27%27%2C+%24input%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Testing

# Level 🔋
 
[X] Intermediate
 
# Related Refactorings 🔄

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 020 - Transform Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20020%20-%20Transform%20Static%20Functions/readme.md)

# See also 📚

[Testing Private Methods Guide](http://shoulditestprivatemethods.com/)

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Credits 🙏

Image by [Steffen Salow](https://pixabay.com/users/s_salow-9096056/) on [Pixabay](https://pixabay.com)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)