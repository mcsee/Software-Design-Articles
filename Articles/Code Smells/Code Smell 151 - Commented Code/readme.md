# Code Smell 151 - Commented Code

![Code Smell 151 - Commented Code](maxim-bober-2qxFJPiyDsM-unsplash.jpg)

*Beginners are afraid to remove code. And many seniors too.*

> TL;DR: Don't leave commented code. Remove it.

# Problems

- Readability

- Dead Code

- Lack of Coverage 

- Lack of Source Version Control

# Solutions

1. Remove commented code

2. Implement Source Version Control

# Context

When debugging code we tend to comment on code to see what happens.

As a final step, after all our tests pass, we must remove them following clean code practices.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ff64e843938e642edb15cc473008bdc2)
```javascript
function arabicToRoman(num) {
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
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

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4d485268c773366069213c5b915acf89)
```javascript
function arabicToRoman(arabicNumber) {
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
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

# Detection

[X] Semi-Automatic 

Some machine learning analyzers can detect or parse comments and guide as to remove them.

# Tags

- Comments

# Conclusion

We need to remove all commented-out code.

# Relations

[Code Smell 75 - Comments Inside a Method](Code Smells\Code Smell 75 - Comments Inside a Method)

[Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

# Refactorings

[Refactoring 005 - Replace Comment with Function Name](Refactorings\Refactoring 005 - Replace Comment with Function Name)

# Credits

Photo by [maxim bober](https://unsplash.com/@obalance) on [Unsplash](https://unsplash.com/)    

* * *

> Don’t document the problem, fix it.

_Atli Björgvin Oddsson_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()