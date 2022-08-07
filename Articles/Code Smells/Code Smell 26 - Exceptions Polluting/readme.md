# Code Smell 26 - Exceptions Polluting

![Code Smell 26 - Exceptions Polluting](nick-van-den-berg-2vb-_3t6YCM-unsplash.jpg)

*It is very nice to have lots of different exceptions. Your code is declarative and robust. Or not?*

> TL;DR; Don't create anemic and empty objects. Even if they are Exceptions.
 
# Problems

- Over Design

- Namespace Pollution

- [Empty Classes](Code Smells\Code Smell 114 - Empty Class)

# Solutions

1. Avoid creating [anemic](Code Smells\Code Smell 01 - Anemic Models) exceptions as globals.

2. Create exceptions only if they behave differently.

3. Model exceptions with objects. Classes are handy for lazy programmers.

4. [Remove Unhandled Exceptions](Refactorings\Refactoring 004 - Remove Unhandled Exceptions)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/c8fefffd87c98af9bec173266f090497)
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

## Right

[Gist Url]: # (https://gist.github.com/mcsee/029e21221849e251babf8d933170e62f)
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
        catch(FileException exception) {
            if (exception.description == (this.expectionMessages().errorDescriptionFileTemporaryLocked() {
                // sleep and retry
                // IF behaviour is the same with all the exceptions just change the text on object creation and raise the icorrect instance
            }            
            this.showErrorToUser(exception.messageToUser();
             // This example is simplified. Text should be translated
        }                
        finally {
            try {
                file.close();
            } 
        }
    }
}
```

# Detection

New exceptions should override behavior methods. 

No. *code*, *description*, *resumable*, etc. are not behavioral.

# Tags

- Abuser

- Naming

# Conclusion

You would not create different classes for every Person instance, so they return different names. Why would you do it with exceptions.

How often do you catch a specific exception?. 

Go out and check your code. 

Is it necessary to be a class? 

You are already coupled to the class. Couple to the description instead. 

Exception instances should **NOT** be [Singletons](Theory\Singleton - The root of all evil).

# Relations

[Code Smell 01 - Anemic Models](Code Smells\Code Smell 01 - Anemic Models)

[Code Smell 114 - Empty Class](Code Smells\Code Smell 114 - Empty Class)

# Credits

Photo by [Nick van den Berg](https://unsplash.com/@nngvandenberg) on [Unsplash](https://unsplash.com/s/photos/smog)

* * *

>  You will fall to ruin because you believe that exceptions to the rule make new rules.

_Pierce Brown_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()
