# Code Smell 151 - Commented Code

![Code Smell 151 - Commented Code](Code%20Smell%20151%20-%20Commented%20Code.jpg)

*Beginners are afraid to remove code. And many seniors too.*

> TL;DR: Don't leave commented code. Remove it.

# Problems 😔 

- Readability

- Dead Code

- Lack of Coverage 

- Lack of Source Version Control

# Solutions 😃

1. Remove commented code

2. Implement Source Version Control

# Refactorings ⚙️

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Context 💬

When debugging code we tend to comment on code to see what happens.

As a final step, after all our tests pass, we must remove them following clean code practices.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ff64e843938e642edb15cc473008bdc2) -->

```javascript
function arabicToRoman(num) {
  var decimal = 
      [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = 
      ['M', 'CM', 'D', 'CD', 'C', 'XC', 
      'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  var result = '';
  
  for(var i = 0; i < decimal.length; i++) {
    // print(i)
    while(num >= decimal[i]) {
      result += roman[i];
      num -= decimal[i];
    }    
  }
  // if (result > 0 return ' ' += result)
  
 return result;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4d485268c773366069213c5b915acf89) -->

```javascript
function arabicToRoman(arabicNumber) {
    var decimal = [1000, 900, 500, 400, 100,
                   90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 
               'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    var romanString = '';
  
    for(var i = 0; i < decimal.length; i++) {
        while(arabicNumber >= decimal[i]) {
            romanString += roman[i];
            num -= decimal[i];
        }    
    }
  
    return romanString;
}
```

# Detection 🔍

[X] Semi-Automatic 

Some machine learning analyzers can detect or parse comments and guide as to remove them.

# Tags 🏷️

- Comments

# Conclusion 🏁

We need to remove all commented-out code.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

# Credits 🙏

Photo by [maxim bober](https://unsplash.com/@obalance) on [Unsplash](https://unsplash.com/)    

* * *

> Don’t document the problem, fix it.

_Atli Björgvin Oddsson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)