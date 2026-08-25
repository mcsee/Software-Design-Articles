# Code Smell 321 - Getter Piggybacking

![Code Smell 321 - Getter Piggybacking](nathalia-rosa-rWMIbqmOxrY-unsplash.jpg)

*One broken window invites another*

> TL;DR: Don't reuse an existing getter to bolt on new business logic from outside the object.

# Problems 😔

- [Duplicated business rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)
- Broken encapsulation
- Scattered comparison logic
- Hidden domain knowledge
- Fragile refactoring
- [Law of Demeter](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md) violation

# Solutions 😃

1. Add real behavior methods
2. Keep comparisons inside object
3. Pass collaborators, not primitives
4. Reserve getters for rendering
5. Follow [tell, don't ask](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md)

# Refactorings ⚙️

[Refactoring 027 - Remove Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20027%20-%20Remove%20Getters/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Context 💬

An object exposes a getter for one legitimate reason: some other part of the system needs to read that value, usually to display it.

[Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md) are a code smell, but this one gets a pass, for now.

Later on, you discover that you need new business logic that depends on the same value.

You already have the getter, so you write a function outside the object that calls it and does the comparison itself, breaking the encapsulation principle.

Someone else needs slightly different logic based on the same value.

They also call the getter and write their own version of the comparison.

Now [two places decide what that value means](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md), and neither of them is the object that owns it. Typical.

You didn't add a second getter this time.

You reused the first one, because it was already there.

That's the trap.

The getter existed for one reason, and you let it justify skipping the real fix: a method on the object that answers the question itself, instead of handing out the raw value for every caller to interpret on their own.

Don't [break more windows](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20173%20-%20Broken%20Windows/readme.md)

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4d44700c5551c64d953aeaa66852b2fd) -->

```javascript
// Food needs to show its use-by date on the shelf
// label, so useByDate() exists for that one reason.
//
// Later, removeExpiredFood() needs to pull expired
// products, so it reuses useByDate() and compares the
// result to today itself, outside Food.
//
// flagNearExpiryFood() needs almost the same check, so
// it also calls useByDate() and writes its own slightly
// different comparison.
//
// Now two functions decide what "expired" means, and
// neither of them is Food.
class Food {
  constructor(name, useByDate) {
    this.name = name;
    this.useByDateValue = useByDate;
  }

  useByDate() {
    return this.useByDateValue;
  }
}

function removeExpiredFood(shelf, today) {
  return shelf.filter(
    food => food.useByDate() >= today
  );
}

function flagNearExpiryFood(
  shelf, today, warningDays
) {
  return shelf.filter(food => {
    const daysLeft = daysBetween(
      food.useByDate(), today
    );
    return daysLeft >= 0 &&
      daysLeft <= warningDays;
  });
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4b95714b0bebc69f46224f2ec5e2b408) -->

```javascript
// Food still exposes useByDate() for the shelf label.
//
// Being expired is now a question Food answers itself,
// through isExpiredOn(), instead of every external
// function reimplementing the comparison from the
// getter on its own.
class Food {
  constructor(name, useByDate) {
    this.name = name;
    this.useByDateValue = useByDate;
  }

  useByDate() {
    return this.useByDateValue;
  }

  isExpiredOn(today) {
    return this.useByDateValue < today;
  }

  daysUntilExpiryFrom(today) {
    return daysBetween(this.useByDateValue, today);
  }
}

function removeExpiredFood(shelf, today) {
  return shelf.filter(food => !food.isExpiredOn(today));
}

function flagNearExpiryFood(shelf, today, warningDays) {
  return shelf.filter(food => {
    const daysLeft = food.daysUntilExpiryFrom(today);
    return daysLeft >= 0 && daysLeft <= warningDays;
  });
}
```

# Detection 🔍

[X] Manual

This is a design smell, and no linter is coming to save you.

Search for a getter that appears inside `if`, comparison, or filter expressions in more than one place outside its own class.

If two call sites read the same getter and each writes its own comparison against it, the object is missing a method, and the getter is carrying logic it was never meant to carry.

# Exceptions 🛑

The smell appears when you reuse that same getter as a shortcut for business logic instead of adding the method the logic actually belongs to.

Don't point to [DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md) as a counterexample.

A DTO doesn't excuse this.

It just breaks encapsulation on purpose and gives the practice a name.

# Tags 🏷️

- Encapsulation

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

The rule behind that value is a concept that belongs to the object in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), not to whichever function happens to call the getter first.

When you keep that rule inside the object, every caller shares the same [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the object and the real-world thing it represents.

When you let each caller reimplement the rule from a getter, you create as many private definitions of that concept as you have call sites, and they drift apart the moment one of them changes.

# AI Generation 🤖

AI generators create this smell often.

You ask for a function that needs a value the object already exposes through a getter, and it writes a standalone function around that getter, because that's the smallest diff that satisfies the request.

It won't add a method to the object unless you ask for that explicitly.

# AI Detection 🧲

AI can detect it, but only if you point it at the pattern.

Try: "Find getters called from more than one place where the caller performs its own comparison or business rule on the result."

Without that prompt, the code passes tests and looks idiomatic, so most assistants won't flag it on their own.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Move the comparison logic from external functions into a real method on the object so callers stop reimplementing it from the getter

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Move+the+comparison+logic+from+external+functions+into+a+real+method+on+the+object+so+callers+stop+reimplementing+it+from+the+getter%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Move+the+comparison+logic+from+external+functions+into+a+real+method+on+the+object+so+callers+stop+reimplementing+it+from+the+getter%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Move+the+comparison+logic+from+external+functions+into+a+real+method+on+the+object+so+callers+stop+reimplementing+it+from+the+getter%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Move+the+comparison+logic+from+external+functions+into+a+real+method+on+the+object+so+callers+stop+reimplementing+it+from+the+getter%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Move+the+comparison+logic+from+external+functions+into+a+real+method+on+the+object+so+callers+stop+reimplementing+it+from+the+getter%3A+%60%60%60javascript%0D%0A%2F%2F+Food+needs+to+show+its+use-by+date+on+the+shelf%0D%0A%2F%2F+label%2C+so+useByDate%28%29+exists+for+that+one+reason.%0D%0A%2F%2F%0D%0A%2F%2F+Later%2C+removeExpiredFood%28%29+needs+to+pull+expired%0D%0A%2F%2F+products%2C+so+it+reuses+useByDate%28%29+and+compares+the%0D%0A%2F%2F+result+to+today+itself%2C+outside+Food.%0D%0A%2F%2F%0D%0A%2F%2F+flagNearExpiryFood%28%29+needs+almost+the+same+check%2C+so%0D%0A%2F%2F+it+also+calls+useByDate%28%29+and+writes+its+own+slightly%0D%0A%2F%2F+different+comparison.%0D%0A%2F%2F%0D%0A%2F%2F+Now+two+functions+decide+what+%22expired%22+means%2C+and%0D%0A%2F%2F+neither+of+them+is+Food.%0D%0Aclass+Food+%7B%0D%0A++constructor%28name%2C+useByDate%29+%7B%0D%0A++++this.name+%3D+name%3B%0D%0A++++this.useByDateValue+%3D+useByDate%3B%0D%0A++%7D%0D%0A%0D%0A++useByDate%28%29+%7B%0D%0A++++return+this.useByDateValue%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+removeExpiredFood%28shelf%2C+today%29+%7B%0D%0A++return+shelf.filter%28%0D%0A++++food+%3D%3E+food.useByDate%28%29+%3E%3D+today%0D%0A++%29%3B%0D%0A%7D%0D%0A%0D%0Afunction+flagNearExpiryFood%28%0D%0A++shelf%2C+today%2C+warningDays%0D%0A%29+%7B%0D%0A++return+shelf.filter%28food+%3D%3E+%7B%0D%0A++++const+daysLeft+%3D+daysBetween%28%0D%0A++++++food.useByDate%28%29%2C+today%0D%0A++++%29%3B%0D%0A++++return+daysLeft+%3E%3D+0+%26%26%0D%0A++++++daysLeft+%3C%3D+warningDays%3B%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

A getter you added for one legitimate reason doesn't grant permission to skip every method that comes after it.

When you find yourself reaching for an existing getter to write new business logic outside the object, stop and add the method instead.

The object already knows the information.

Let it hold the rule too.

Stop treating it like a vending machine that only hands out data to whoever asks nicely.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 89 - Math Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2089%20-%20Math%20Feature%20Envy/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 246 - Expiration Date](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20246%20-%20Expiration%20Date/readme.md)

[Code Smell 64 - Inappropriate Intimacy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2064%20-%20Inappropriate%20Intimacy/readme.md)

[Code Smell 173 - Broken Windows](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20173%20-%20Broken%20Windows/readme.md)

# More Information 📕

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

[Tell, Don't Ask](https://martinfowler.com/bliki/TellDontAsk.html)

[Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))

# Quote

> OOP to me means only messaging, local retention and protection and hiding of state-process.

_Alan Kay_

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Nathália Rosa](https://unsplash.com/es/@nathaliarosa) on [Unsplash](https://unsplash.com/es/fotos/productos-en-estanteria-rWMIbqmOxrY)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)
