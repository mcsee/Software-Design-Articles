# Code Smell 298 - Microsoft Windows Time Waste

![Code Smell 298 - Microsoft Windows Time Waste](Code%20Smell%20298%20-%20Microsoft%20Windows%20Time%20Waste.jpg)

*When Conditional Logic Silences Critical Signals*

> TL;DR: Skipping status reports in conditional branches causes silent delays and race conditions.

# Problems 😔

- User delays
- Poor Experience
- Unpredictable timeouts
- Incomplete initialization
- Hidden dependencies
- Policy mismanagement
- Silent failures
- Backward compatibility breaks

# Solutions 😃

1. Validate all code paths
2. Use default reporting mechanisms
3. Test edge cases rigorously
4. Refactor policy checks early
5. Make Performance tests
6. Move reports outside conditionals

# Context 💬

When you add conditional logic (e.g., group policies) to initialization code, skipping critical steps like readiness reports causes system-wide delays.

Edge cases are exceptional conditions that occur outside normal operating parameters.

When you don't properly handle these edge cases, your code can behave unpredictably.

This [Microsoft blog post](https://devblogs.microsoft.com/oldnewthing/20250428-00/?p=111121) highlights a classic example where missing edge case handling [caused Windows 7 to have slower login times when users chose a solid color background instead of a wallpaper image](https://support.microsoft.com/en-us/topic/the-welcome-screen-may-be-displayed-for-30-seconds-during-the-logon-process-after-you-set-a-solid-color-as-the-desktop-background-in-windows-7-or-in-windows-server-2008-r2-b4565ced-703a-cc85-bf9c-6b3d586d6421).

The code responsible for loading desktop wallpapers reported "ready" only when it successfully loaded a wallpaper image.

But when users selected a solid color background (an edge case), this code path never triggered the "ready" notification.

As a result, the system waited the full 30-second timeout before proceeding with the login sequence.

This issue shows how missing a seemingly small edge case can significantly impact user experience.

What should have been a 5-second login process became a frustrating 30-second delay for users who chose a simple configuration option.

Multiply this innocent 30-seconds delay for every user that had the version. What a waste of human time!

Good software design requires you to consider all possible paths through your code, not just the common ones.

When you skip handling edge cases, you create technical debt that manifests as mysterious performance issues, timeouts, and poor user experiences.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/23fe261d7b1d9a4acc44a1da5b5ec6e9) -->

```csharp
public static class WallpaperInitializer
{
    private static bool wallpaperWasDefined = false;

    public static void InitializeWallpaper()
    {
        if (wallpaperWasDefined)
        // Assume this was defined previously
        // and PLEASE DON'T use NULLs in case you hadn't    
        {
            LoadWallpaperBitmap();
            Report(WallpaperReady); 
            // Missed if wallpaper is undefined
        }
       // No default report, causing delays
    }

    private static void LoadWallpaperBitmap()
    {
        
    }

    private static void Report(string status)
    {
        // The Asynchronous loading keeps on
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/04db525ba36d6411ebe2ba7158562abf) -->

```csharp
public static class WallpaperInitializer
{
    private static bool wallpaperWasDefined = false;

    public static void InitializeWallpaper()
    {
        if (wallpaperWasDefined)
        {
            LoadWallpaperBitmap();
        }
        Report(WallpaperReady); 
        // Always report, regardless of condition
    }

    private static void LoadWallpaperBitmap()
    {
    
    }
}
```

# Detection 🔍

[X] Semi-Automatic

Use static analysis tools to flag conditionals that guard critical reporting calls.

Code reviews should verify that all initialization paths signal completion.

# Tags 🏷️

- Performance

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

The system’s real-world behavior (e.g., logon speed) depends on accurate modeling of readiness states.

Software should maintain a one-to-one correspondence between real-world states and program states.

When users select a solid color background in Windows, that choice represents a valid real-world state .

*(My personal choice also back then)*

The program must correctly model this choice with a corresponding program state that behaves properly.

When you break this [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by failing to handle edge cases, you introduce disconnects between user expectations and system behavior. In this example, users expected their choice of a solid color background to work normally, but instead they experienced mysterious delays.

The missing bijection creates cognitive dissonance: "I made a simple choice, why is my computer behaving strangely?" This disconnect damages user trust and satisfaction.

Each broken bijection introduces a crack in the system's reliability model, making it increasingly unpredictable over time.

Breaking this link causes mismatches between user expectations and software execution, leading to unpredictable delays and [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) to real world violation.

# AI Generation 🤖

AI generators can create this smell by naively wrapping legacy code in conditionals without validating all paths.

# AI Detection 🥃

Prompt AI to "ensure status reports execute in all branches" and it will flag or fix this smell by moving Report() outside conditionals.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: find missing else reports

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=find+missing+else+reports%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=find+missing+else+reports%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=find+missing+else+reports%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=find+missing+else+reports%3A+%60%60%60csharp%0D%0Apublic+static+class+WallpaperInitializer%0D%0A%7B%0D%0A++++private+static+bool+wallpaperWasDefined+%3D+false%3B%0D%0A%0D%0A++++public+static+void+InitializeWallpaper%28%29%0D%0A++++%7B%0D%0A++++++++if+%28wallpaperWasDefined%29%0D%0A++++++++%2F%2F+Assume+this+was+defined+previously%0D%0A++++++++%2F%2F+and+PLEASE+DON%27T+use+NULLs+in+case+you+hadn%27t++++%0D%0A++++++++%7B%0D%0A++++++++++++LoadWallpaperBitmap%28%29%3B%0D%0A++++++++++++Report%28WallpaperReady%29%3B+%0D%0A++++++++++++%2F%2F+Missed+if+wallpaper+is+undefined%0D%0A++++++++%7D%0D%0A+++++++%2F%2F+No+default+report%2C+causing+delays%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+LoadWallpaperBitmap%28%29%0D%0A++++%7B%0D%0A++++++++%0D%0A++++%7D%0D%0A%0D%0A++++private+static+void+Report%28string+status%29%0D%0A++++%7B%0D%0A++++++++%2F%2F+The+Asynchronous+loading+keeps+on%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Always signal completion unconditionally in initialization code.

Conditional logic should modify behavior, not silence critical reporting steps.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

[Code Smell 90 - Implementative Callback Events](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2090%20-%20Implementative%20Callback%20Events/readme.md)

# More Information 📕

[Microsoft Dev Blogs](https://devblogs.microsoft.com/oldnewthing/20250428-00/?p=111121)

[Welcome Screen Defect](https://support.microsoft.com/en-us/topic/the-welcome-screen-may-be-displayed-for-30-seconds-during-the-logon-process-after-you-set-a-solid-color-as-the-desktop-background-in-windows-7-or-in-windows-server-2008-r2-b4565ced-703a-cc85-bf9c-6b3d586d6421)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> Testing leads to failure, and failure leads to understanding.

_Burt Rutan_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)