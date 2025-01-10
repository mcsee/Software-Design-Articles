# Refactoring 020 - Transform Static Functions

![Refactoring 020 - Transform Static Functions](Refactoring%20020%20-%20Transform%20Static%20Functions.jpg)

*Kill Static, Revive Objects*

> TL;DR: Replace static functions with object interactions.

# Problems Addressed

- High [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) due to [global access](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

- Poor testability

- Overloaded protocols in classes

- Decreased cohesion

# Related Code Smells

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

# Steps

1. Identify static methods used in your code.

2. Replace static methods with instance methods.

3. Pass dependencies explicitly through constructors or method parameters.

4. Refactor clients to interact with objects instead of static functions.

# Sample Code

## Before

<!-- [Gist Url](https://gist.github.com/mcsee/cf849ddce7e7fff8f3daad3c9973bf70) -->

```javascript
class CharacterUtils {
    static createOrpheus() {
        return { name: "Orpheus", role: "Musician" };
    }

    static createEurydice() {
        return { name: "Eurydice", role: "Wanderer" };
    }
    
    static lookBack(character) {
      if (character.name === "Orpheus") {
        return "Orpheus looks back and loses Eurydice.";
    } else if (character.name === "Eurydice") {
        return "Eurydice follows Orpheus in silence.";
    }
       return "Unknown character.";
  }
}

const orpheus = CharacterUtils.createOrpheus();
const eurydice = CharacterUtils.createEurydice();
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/ead99192e8a822b36ff77cb4eeef0b34) -->

```typescript
// 1. Identify static methods used in your code.
// 2. Replace static methods with instance methods.
// 3. Pass dependencies explicitly through
// constructors or method parameters.

class Character {
    constructor(name, role, lookBackBehavior) {
        this.name = name;
        this.role = role;
        this.lookBackBehavior = lookBackBehavior;
    }

    lookBack() {
        return this.lookBackBehavior(this);
    }
}

// 4. Refactor clients to interact with objects 
// instead of static functions.
const orpheusLookBack = (character) =>
    "Orpheus looks back and loses Eurydice.";
const eurydiceLookBack = (character) =>
    "Eurydice follows Orpheus in silence.";

const orpheus = 
  new Character("Orpheus", "Musician", orpheusLookBack);
const eurydice = 
  new Character("Eurydice", "Wanderer", eurydiceLookBack);
```

# Type

[X] Semi-Automatic

You can make step-by-step replacements. 

# Safety

This refactoring is generally safe, but you should test your changes thoroughly.

Ensure no other parts of your code depend on the static methods you replace.

# Why is the Code Better?

Your code is easier to test because you can replace dependencies during testing.

Objects encapsulate behavior, improving cohesion and reducing protocol overloading.

You remove hidden global dependencies, making the code clearer and easier to understand.

# Refactor with AI

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+static+methods+used+in+your+code.+2.+Replace+static+methods+with+instance+methods.+3.+Pass+dependencies+explicitly+through+constructors+or+method+parameters.+4.+Refactor+clients+to+interact+with+objects+instead+of+static+functions.%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+static+methods+used+in+your+code.+2.+Replace+static+methods+with+instance+methods.+3.+Pass+dependencies+explicitly+through+constructors+or+method+parameters.+4.+Refactor+clients+to+interact+with+objects+instead+of+static+functions.%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | [Perplexity](https://perplexity.ai/?q=1.+Identify+static+methods+used+in+your+code.+2.+Replace+static+methods+with+instance+methods.+3.+Pass+dependencies+explicitly+through+constructors+or+method+parameters.+4.+Refactor+clients+to+interact+with+objects+instead+of+static+functions.%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+static+methods+used+in+your+code.+2.+Replace+static+methods+with+instance+methods.+3.+Pass+dependencies+explicitly+through+constructors+or+method+parameters.+4.+Refactor+clients+to+interact+with+objects+instead+of+static+functions.%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=1.+Identify+static+methods+used+in+your+code.+2.+Replace+static+methods+with+instance+methods.+3.+Pass+dependencies+explicitly+through+constructors+or+method+parameters.+4.+Refactor+clients+to+interact+with+objects+instead+of+static+functions.%3A+%60%60%60typescript%0D%0A%2F%2F+1.+Identify+static+methods+used+in+your+code.%0D%0A%2F%2F+2.+Replace+static+methods+with+instance+methods.%0D%0A%2F%2F+3.+Pass+dependencies+explicitly+through%0D%0A%2F%2F+constructors+or+method+parameters.%0D%0A%0D%0Aclass+Character+%7B%0D%0A++++constructor%28name%2C+role%2C+lookBackBehavior%29+%7B%0D%0A++++++++this.name+%3D+name%3B%0D%0A++++++++this.role+%3D+role%3B%0D%0A++++++++this.lookBackBehavior+%3D+lookBackBehavior%3B%0D%0A++++%7D%0D%0A%0D%0A++++lookBack%28%29+%7B%0D%0A++++++++return+this.lookBackBehavior%28this%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+4.+Refactor+clients+to+interact+with+objects+%0D%0A%2F%2F+instead+of+static+functions.%0D%0Aconst+orpheusLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Orpheus+looks+back+and+loses+Eurydice.%22%3B%0D%0Aconst+eurydiceLookBack+%3D+%28character%29+%3D%3E%0D%0A++++%22Eurydice+follows+Orpheus+in+silence.%22%3B%0D%0A%0D%0Aconst+orpheus+%3D+%0D%0A++new+Character%28%22Orpheus%22%2C+%22Musician%22%2C+orpheusLookBack%29%3B%0D%0Aconst+eurydice+%3D+%0D%0A++new+Character%28%22Eurydice%22%2C+%22Wanderer%22%2C+eurydiceLookBack%29%3B%0D%0A%60%60%60) | 

# Tags

- Cohesion

# Related Refactorings

[Refactoring 018 - Replace Singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20018%20-%20Replace%20Singleton/readme.md)

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

- Replace Global Variable with Dependency Injection

# See also

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Credits				    

Image by [Menno van der Krift](https://pixabay.com/users/mennonisute-2044891/) from [Pixabay](https://pixabay.com/)
  
* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)