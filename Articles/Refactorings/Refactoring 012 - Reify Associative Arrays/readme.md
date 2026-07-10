# Refactoring 012 - Reify Associative Arrays
            
![Refactoring 012 - Reify Associative Arrays](Refactoring%20012%20-%20Reify%20Associative%20Arrays.jpg)

*Converting your anemic dictionaries is easy*

> TL;DR: Convert your key/value into full behavioral objects

# Problems Addressed 😔

- [Associative arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)
- Fail Fast principle violation
- [Bijection Fault](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)
- Hard to find method references
    
# Related Code Smells 💨

[Code Smell 27 - Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)

# Context 💬

You have anemic associative arrays that hold unstructured data.

You want richer objects with stricter controls.

Static typed languages can also add type checking to these objects.

# Steps 👣 
 
1. Find the references to the object or associative array
    
2. Reify it
    
3. Replace generic calls with setters and getters for every key.

You can also debug them better this way.

- [setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)
- [getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)
    
4. Add parameter and return type hinting to interfaces.

Do this if your language supports it.
    
5. Add stronger assertions on the setters between different keys.
    
(if you are using TCR, you can do baby refactoring steps)

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/ca8de4d5b62f43e87002b6424de11d60) -->

```php
<?

class AuthenticationHelper extends Singleton {

  private $data = [];

  function setParameter(string $key, ?$value) {
    // no type checking
    // value as the name is too generic
    // Since SOME parameters might be null
    // You can't check a single parameter for not null

    $this->data[$key] = value;
  }

  function getParameter(string $key) {
    // no return type hinting
    return $this->data[$key] ?? null;
  }

}

// Usages

AuthenticationHelper::getInstance
  ->setParameter('oauth2_token', []);
// type error not caught

AuthenticationHelper::getInstance
  ->setParameter('scopes', null);
// We need to enforce this not to be NULL

AuthenticationHelper::getInstance
  ->setParameter('user', 'Elon');
// This should not mutate
// No validation with business rules

$credential =
  AuthenticationHelper::getInstance
    ->getParameter('oauth2token');
// Typo not detected

// You can not easily find
// references to methods setting the oauth2_token
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d8c3cb918572138803015c91a0274d9d) -->

```php
<?

class AuthenticationCredentials {

  private $user;
  private $oauth2_token;
  
  function __construct(User $user) {
    $this->validateUser($user);
    // Specific validation rules
      
    $this->user = $user;
    // Can't mutate 
  }

  function oauth2_token(string $token): void {
    // You can add specific validations
    $this->oauth2_token = $token;
  }

  function oauth2_token(): string {    
    // Return type hinting
    return $this->oauth2_token;
  }

}

// Usages

$credentials = new AuthenticationCredentials(new User('Elon'));
// Valid since creation
  
$credentials->oauth2_token([]);
// type errors are caught

$credentials->oauth2_token(null);
// can't be null. Fail fast

$credentials->scope();
// Typo detected
```

Now, you have an anemic data class.

Also known as a [DTO](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md).

It is time to give it behavior.

You can also remove some getters and setters.

# Type 📝

[X] Semi-Automatic

You can perform this refactor with the aid of an IDE.

# Safety 🛡️

This is not an automatic refactoring.

Small steps are safe if you have good coverage.

# Why is the Code Better? ✨

Your new object fails fast and is more declarative.

You can debug it easily and find the referencing methods.

# How Does it Improve the Bijection? 🗺️

An associative array is a generic container with no real-world meaning.

Its keys are strings that could hold anything, valid or not.

A reified object gives each key a name, a type, and a purpose.

Code should map to the real world, following the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) principle.

Every concept in the domain needs a counterpart in the code.

That is the core idea behind the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

The new object's name and methods describe what it represents.

# Limitations ⚠️

Dynamically typed languages can't enforce type or domain restrictions.

This applies to the values inside the object.

# Tags 🏷️

- Anemic Models

# Level 🔋

[X] Beginner
    
# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Find the references to the object or associative array.2. Reify it into a full object.3. Replace generic calls with setters and getters for every key.4. Add parameter and return type hinting to interfaces.5. Add stronger assertions between different keys.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Find+the+references+to+the+object+or+associative+array.2.+Reify+it+into+a+full+object.3.+Replace+generic+calls+with+setters+and+getters+for+every+key.4.+Add+parameter+and+return+type+hinting+to+interfaces.5.+Add+stronger+assertions+between+different+keys.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Find+the+references+to+the+object+or+associative+array.2.+Reify+it+into+a+full+object.3.+Replace+generic+calls+with+setters+and+getters+for+every+key.4.+Add+parameter+and+return+type+hinting+to+interfaces.5.+Add+stronger+assertions+between+different+keys.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Find+the+references+to+the+object+or+associative+array.2.+Reify+it+into+a+full+object.3.+Replace+generic+calls+with+setters+and+getters+for+every+key.4.+Add+parameter+and+return+type+hinting+to+interfaces.5.+Add+stronger+assertions+between+different+keys.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Find+the+references+to+the+object+or+associative+array.2.+Reify+it+into+a+full+object.3.+Replace+generic+calls+with+setters+and+getters+for+every+key.4.+Add+parameter+and+return+type+hinting+to+interfaces.5.+Add+stronger+assertions+between+different+keys.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Find+the+references+to+the+object+or+associative+array.2.+Reify+it+into+a+full+object.3.+Replace+generic+calls+with+setters+and+getters+for+every+key.4.+Add+parameter+and+return+type+hinting+to+interfaces.5.+Add+stronger+assertions+between+different+keys.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+AuthenticationHelper+extends+Singleton+%7B%0D%0A%0D%0A++private+%24data+%3D+%5B%5D%3B%0D%0A%0D%0A++function+setParameter%28string+%24key%2C+%3F%24value%29+%7B%0D%0A++++%2F%2F+no+type+checking%0D%0A++++%2F%2F+value+as+the+name+is+too+generic%0D%0A++++%2F%2F+Since+SOME+parameters+might+be+null%0D%0A++++%2F%2F+You+can%27t+check+a+single+parameter+for+not+null%0D%0A%0D%0A++++%24this-%3Edata%5B%24key%5D+%3D+value%3B%0D%0A++%7D%0D%0A%0D%0A++function+getParameter%28string+%24key%29+%7B%0D%0A++++%2F%2F+no+return+type+hinting%0D%0A++++return+%24this-%3Edata%5B%24key%5D+%3F%3F+null%3B%0D%0A++%7D%0D%0A%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usages%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27oauth2_token%27%2C+%5B%5D%29%3B%0D%0A%2F%2F+type+error+not+caught%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27scopes%27%2C+null%29%3B%0D%0A%2F%2F+We+need+to+enforce+this+not+to+be+NULL%0D%0A%0D%0AAuthenticationHelper%3A%3AgetInstance%0D%0A++-%3EsetParameter%28%27user%27%2C+%27Elon%27%29%3B%0D%0A%2F%2F+This+should+not+mutate%0D%0A%2F%2F+No+validation+with+business+rules%0D%0A%0D%0A%24credential+%3D%0D%0A++AuthenticationHelper%3A%3AgetInstance%0D%0A++++-%3EgetParameter%28%27oauth2token%27%29%3B%0D%0A%2F%2F+Typo+not+detected%0D%0A%0D%0A%2F%2F+You+can+not+easily+find%0D%0A%2F%2F+references+to+methods+setting+the+oauth2_token%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Associative arrays are convenient until they grow into hidden domain models.

Once several parts of your code read and write the same keys, reify them.

A dedicated object turns implicit rules into explicit, testable behavior.

You gain type safety, fail-fast validation, and traceable references.

# See also 📚

[Wikipedia: Reification](https://en.wikipedia.org/wiki/Reification_(computer_science))

[Refactoring.Guru: Replace Data Value with Object](https://refactoring.guru/replace-data-value-with-object)

# Credits 🙏

Image by [MustangJoe](https://pixabay.com/users/mustangjoe-2162920/) from [Pixabay](https://pixabay.com/)

* * *

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)