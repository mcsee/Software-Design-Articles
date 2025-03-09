# Code Smell 273 - Overengineering

![Code Smell 273 - Overengineering](8e58387f-e879-4ba5-a025-b53f8bfee3ae.jpg)

*Keep It Simple, Stupid*

> TL;DR: Overengineering complicates your code.

# Problems

- Unnecessary [accidental complexity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)
- Premature optimizations
- Unnecessary abstractions
- Poor Maintainability
- Overly detailed designs
- Slow iteration cycles
- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation
- Performance penalties

# Solutions

1. Keep it Simple, Stupid
2. Simplify code paths
3. Minimize abstractions
4. Use the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) as guidance to find abstractions
5. Focus on the core logic
6. Follow Occam's razor by cutting away non-essential elements
7. Refactor regularly

# Context

Overengineering happens when you build solutions that are too complex for your problem.

This happens when you create unnecessary layers of abstraction, use complex design patterns, or bloat your architecture making your code harder to maintain.

When you overcomplicate your design, you risk introducing bugs and making your codebase difficult to navigate.

A simple problem like building an API doesn't need the complexity of enterprise-level architecture if the goal is straightforward.

Some examples are the overuse of factories, excessive inheritance, or too granular interfaces when a simple approach would suffice. 

Keeping things simple helps avoid creating code that is difficult to understand and maintain.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/8d15f910232fe91b7d6516dcaafa6ddd) -->

```java
// Overengineered approach 
// with unnecessary factory and abstract layers
public abstract class PlanetCalculator {
    public abstract double calculateDarkMatter(double mass);
}

public class TransneptunianCalculator extends PlanetCalculator {
    @Override
    public double calculateDarkMatter(double mass) {
        // Complex, unnecessary steps for a simple calculation
        double gravitationalConstant = 6.67430e-11;
        double darkMatter = mass * gravitationalConstant * 0.25; 
        // Hypothetical calculation
        return darkMatter;
    }
}

public class PlanetCalculatorFactory {
    public static PlanetCalculator getCalculator(String type) {
        if ("Transneptunian".equals(type)) {
            return new TransneptunianCalculator();
        }
        throw new IllegalArgumentException("Unknown calculator type");
    }
}

// Usage
PlanetCalculator calculator = 
    PlanetCalculatorFactory.getCalculator("Transneptunian");
double darkMatter = calculator.calculateDarkMatter(1000);
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/7fc58766071d5a15e9991bc618ae4a8f) -->

```java
// Simpler approach, without unnecessary factories and abstractions
public class DarkMatterCalculator {
    public double calculateDarkMatter(double mass) {
        return mass * 6.67430e-11 * 0.25; // Hypothetical calculation
    }
}

// Usage
DarkMatterCalculator calculator = new DarkMatterCalculator();
double darkMatter = calculator.calculateDarkMatter(1000);
```

# Detection

[X] Manual

This is a semantic smell.

You can detect overengineering by looking for excessive classes, methods, or features that do not contribute directly to solving the problem.

 If you find yourself adding functionality that seems duplicated, unnecessary, or too complex, you likely have a case of over-engineering.

# Tags

- Complexity

# Level

[X] Intermediate

# AI Generation

AI generators often introduce overengineering by suggesting patterns like factories or strategies where simpler solutions would work. 

These patterns are useful but can lead to unnecessary complexity when applied to small or straightforward problems.

# AI Detection

AI can help detect overengineered code by analyzing its structure and suggesting refactorings to simplify excessive abstractions or unnecessary layers.

However, you still need human judgment to determine if the complexity serves a purpose or if you can simplify it.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove accidental complexity and make It simpler

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+accidental+complexity+and+make+It+simpler%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+accidental+complexity+and+make+It+simpler%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+accidental+complexity+and+make+It+simpler%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+accidental+complexity+and+make+It+simpler%3A+%60%60%60java%0D%0A%2F%2F+Overengineered+approach+%0D%0A%2F%2F+with+unnecessary+factory+and+abstract+layers%0D%0Apublic+abstract+class+PlanetCalculator+%7B%0D%0A++++public+abstract+double+calculateDarkMatter%28double+mass%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+class+TransneptunianCalculator+extends+PlanetCalculator+%7B%0D%0A++++%40Override%0D%0A++++public+double+calculateDarkMatter%28double+mass%29+%7B%0D%0A++++++++%2F%2F+Complex%2C+unnecessary+steps+for+a+simple+calculation%0D%0A++++++++double+gravitationalConstant+%3D+6.67430e-11%3B%0D%0A++++++++double+darkMatter+%3D+mass+%2A+gravitationalConstant+%2A+0.25%3B+%0D%0A++++++++%2F%2F+Hypothetical+calculation%0D%0A++++++++return+darkMatter%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+PlanetCalculatorFactory+%7B%0D%0A++++public+static+PlanetCalculator+getCalculator%28String+type%29+%7B%0D%0A++++++++if+%28%22Transneptunian%22.equals%28type%29%29+%7B%0D%0A++++++++++++return+new+TransneptunianCalculator%28%29%3B%0D%0A++++++++%7D%0D%0A++++++++throw+new+IllegalArgumentException%28%22Unknown+calculator+type%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0APlanetCalculator+calculator+%3D+%0D%0A++++PlanetCalculatorFactory.getCalculator%28%22Transneptunian%22%29%3B%0D%0Adouble+darkMatter+%3D+calculator.calculateDarkMatter%281000%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Conclusion

Overengineering complicates your codebase and leads to maintenance headaches. Keep your designs simple, focus on solving your specific problem, and avoid unnecessary patterns and abstractions.

# Relations

[Code Smell 182 - Over Generalization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20182%20-%20Over%20Generalization/readme.md)

[Code Smell 264 - Hanlon's Razor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20264%20-%20Hanlon's%20Razor/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> Simplicity is the soul of efficiency.

_Austin Freeman_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)