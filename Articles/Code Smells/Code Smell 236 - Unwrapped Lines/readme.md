# Code Smell 236 - Unwrapped Lines
            
![Code Smell 236 - Unwrapped Lines](Code%20Smell%20236%20-%20Unwrapped%20Lines.jpg)

*Formatting plays a crucial role in creating code that is not only functional but also readable and maintainable. In this article, I will shed light on the code smell associated with neglecting proper line wrapping and explore why it's considered bad practice, too long, isn't it?*

> TL;DR: Extract and wrap your code

# Problems 😔 

- Hard to read code (especially in small devices)

- Demeter's Law violation

# Solutions 😃

1. Wrap the code to at most 75 characters

2. Break and concatenate long strings. Compilers optimize them. Thinking there's a speed penalty is a [premature optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) mistake.

3. Don't use [Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

# Context 💬

Unwrapped code formatting refers to the absence of line breaks or appropriate indentation.

It yields excessively long lines of code that extend beyond the typical width of a code editor or mobile screen.

While writing [my last book](https://cleancodecookbook.com/), people read the code on small devices so line wrapping is critical.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/23e0186c3fb8b7abe64ca491570ddb13) -->

```rust
struct ExtraterrestrialSignal { signal_frequency: f64, signal_strength: f64, signal_duration: f64, }

fn perform_signal_processing_and_analysis(extraterrestrial_signal: &ExtraterrestrialSignal,
) {
    println!(
        "Extraterrestrial Signal processed - Frequency: {} Hz, Strength: {}, Duration: {} seconds", extraterrestrial_signal.signal_frequency,  extraterrestrial_signal.signal_strength, extraterrestrial_signal.signal_duration);

    if extraterrestrial_signal.signal_strength > 0.8 && extraterrestrial_signal.signal_duration > 10.0
    {
        println!("Potential Extraterrestrial Signal of interest!");
    } else {
        println!("Signal does not meet criteria for further investigation.");
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/83600dadd790c861d6faa89b63be0e81) -->

```rust
struct ExtraterrestrialSignal {
    signal_frequency: f64,
    signal_strength: f64,
    signal_duration: f64,
}

fn perform_signal_processing_and_analysis(
    extraterrestrial_signal: &ExtraterrestrialSignal,
) {
    println!(
        "Extraterrestrial Signal processed" + 
          "- Frequency: {} Hz, Strength: {}, Duration: {} seconds",
        extraterrestrial_signal.signal_frequency,
        extraterrestrial_signal.signal_strength,
        extraterrestrial_signal.signal_duration
    );

    if extraterrestrial_signal.signal_strength > 0.8
        && extraterrestrial_signal.signal_duration > 10.0
    {
        println!("Potential Extraterrestrial" 
            + " Signal of interest!");
    } else {
        println!("Signal does not meet criteria" 
            + " for further investigation.");
    }
}
```

# Detection 🔍

[X] Automatic 

This is a formatting and syntactic smell

# Tags 🏷️

- Standards

# Level 🔋

[X] Beginner

# AI Assistants

AI assistants sometimes bring short code and not real production code.

You can use the assistants to wrap and format your code.

# Conclusion 🏁

Ensuring readability is consistently paramount, with various facets warranting consideration.

When lines of code are excessively long, developers may find it challenging to understand the structure and flow of the code.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

[Code Smell 164 - Mixed Indentations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

[Code Smell 211 - Tab over Spaces](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20211%20-%20Tab%20over%20Spaces/readme.md)

# More Information 📕

[Clean Code Cookbook](https://www.amazon.com/-/Maximiliano-Contieri/dp/1098144724)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Olesya Yemets](https://unsplash.com/@ladymilkydeer) on [Unsplash](https://unsplash.com/photos/cooked-pasta-fzXVmIUsEbM)
    
* * *

> The objective of cleaning is not just to clean, but to feel happiness living within that environment.

_Marie Kondo_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)