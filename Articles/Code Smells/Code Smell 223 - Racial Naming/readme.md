# Code Smell 223 - Racial Naming
            
![Code Smell 223 - Racial Naming](Code%20Smell%20223%20-%20Racial%20Naming.jpg)

*Software evolves, and so does culture.*

> TL;DR: Avoid old terms like *whitelists*, *blacklists*, *master*, etc.

# Problems

- Racial Connotations

- Exclusionary Language	

- Diverse Perspectives

# Solutions

1. Use alternative terminology

# Context

Language evolves, and technical terms should follow it.

You can change racial names with alternative terminology:

Allowlist: Replace "whitelist" with "allowlist." This term maintains the intended meaning without racial connotations.

Denylist: Substitute "blacklist" with "denylist." This term conveys the same concept without perpetuating negative racial associations.

Permit List and Block List: Another option is to use "permit list" in place of "whitelist" and "block list" instead of "blacklist."

Main branches: You can replace "master" with "main".

Master/Slave: You can replace them with Primary/Replica/Mirror etc.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/28af00a4c811f8f389b3e1005664a48e)
```kotlin
val whitelist = listOf("Barbie", "Ken")

val blacklist = listOf("Midge")

val gitCommand = "git pull origin master"

val process = Runtime.getRuntime().exec(gitCommand)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/fe9156be3bca544361185ed9f973d8df)
```kotlin
val allowlist = listOf("Barbie", "Ken")

val denylist = listOf("Midge")

val gitCommand = "git pull origin main"

val process = Runtime.getRuntime().exec(gitCommand)
```

# Detection

[X] Semi-Automatic 

You can set up a denylist (not a blacklist) of terms you need to double-check for accuracy.

# Exceptions

- References to old manuals

# Tags

- Naming

# Conclusion

Just as we refactor code to enhance its quality, we should also refactor our language and terminology to promote inclusivity and diversity. 

By eliminating racially insensitive terms like "whitelist" and "blacklist" in favor of more inclusive alternatives, we contribute to a more equitable and welcoming tech industry. 

Let's embrace change and create a coding environment where everyone feels valued, regardless of their background or ethnicity. 

# Relations

[Code Smell 105 - Comedian Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20105%20-%20Comedian%20Methods/readme.md)

# More Info

[Prevalence of racist language in discussions of predatory publishing](https://jmla.pitt.edu/ojs/jmla/article/view/490/744)

[Wikipedia](https://en.wikipedia.org/wiki/Whitelist)

[Rename master to main](https://www.theserverside.com/feature/Why-GitHub-renamed-its-master-branch-to-main)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Aarón Blanco Tejedor](https://unsplash.com/@the_meaning_of_love) on [Unsplash](https://unsplash.com/photos/yH18lOSaZVQ)
    
* * *

> An ultimate joint challenge for the biological and the computational sciences is the understanding of the mechanisms of the human brain, and its relationship with the human mind.

*Tony Hoare*
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)