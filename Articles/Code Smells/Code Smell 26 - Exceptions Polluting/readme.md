# Code Smell 26 - Exceptions Polluting

![Code Smell 26 - Exceptions Polluting](Code%20Smell%2026%20-%20Exceptions%20Polluting.jpg)

*It is very nice to have lots of different exceptions. Your code is declarative and robust. Or not?*

> TL;DR: Don't create anemic and empty objects. Even if they are Exceptions.
 
# Problems 😔 

- Over Design

- Namespace Pollution

- [Empty Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

# Solutions 😃

1. Avoid creating [anemic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) exceptions as globals.

2. Create exceptions only if they behave differently.

3. Model exceptions with objects. Classes are handy for lazy programmers.

4. [Remove Unhandled Exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/c8fefffd87c98af9bec173266f090497) -->

```java
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileReader {

    public static void main(String[] args) {
        FileReader file = null;

        try {
            file = new FileReader("source.txt");
            file.read();
        }
        catch(FileNotFoundException e) {
            e.printStackTrace();
        }
        catch(FileLockedException e) {
            e.printStackTrace();
        }
        catch(FilePermissionsException e) {
            e.printStackTrace();
        }
        catch(IOException e) {
            e.printStackTrace();
        }
        finally {
            try {
                file.close();
            }
            catch(IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/029e21221849e251babf8d933170e62f) -->

```java
public class FileReader {

    public static void main(String[] args) {
        FileReader file = null;

        try {
            file = new FileReader("source.txt");
            file.read();
        }
        catch(FileException exception) {
            if (exception.description == 
                (this.expectedMessages()
                 .errorDescriptionFileTemporaryLocked(){
                // sleep and retry
                // IF behavior is the same with all the exceptions
                // just change the text on 
                // object creation and raise the correct instance
            }            
            this.showErrorToUser(exception.messageToUser();
             // This example is simplified. 
             // You should translate the text
        }                
        finally {
            try {
                file.close();
             } catch (IOException ioException) {
                ioException.printStackTrace();
             }
        }
    }
}
```

# Detection 🔍

New exceptions should override behavior methods. 

No. *code*, *description*, *resumable*, etc. are not behavioral.

# Tags 🏷️

- Exceptions 

# Conclusion 🏁

You would not create different classes for every Person instance, so they return different names. Why would you do it with exceptions.

How often do you catch a specific exception?. 

Go out and check your code. 

Is it necessary to be a class? 

You are already coupled to the class. Couple to the description instead. 

Exception instances should **NOT** be [Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md).

# Relations 👩‍❤️‍💋‍👨

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

# Credits 🙏

Photo by [Nick van den Berg](https://unsplash.com/@nngvandenberg) on [Unsplash](https://unsplash.com/s/photos/smog)

* * *

> You will fall to ruin because you believe that exceptions to the rule make new rules.

_Pierce Brown_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)