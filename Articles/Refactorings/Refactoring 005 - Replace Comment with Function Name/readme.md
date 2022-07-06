# Refactoring 005 - Replace Comment with Function Name

![Refactoring 005 - Replace Comment with Function Name](balloon-g172bdcd1e_1920.png)

*Comments should add value. And function names too.*

> TL;DR: Don't comment on what you are doing. Name what you are doing. 

# Problems Addressed

- Bad Names

- Comments

# Related Code Smells

[Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

[Code Smell 75 - Comments Inside a Method](Code Smells\Code Smell 75 - Comments Inside a Method)

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# Steps

1. Name the function with the previous comment

2. Remove the Comment

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/ec23401dcd3a6e03ca6613d3c58867d0)
```php
<?

function repl($str) {
  // Replaces with spaces the braces 
 
  $str = str_replace(array("\{","\}")," ",$str);
  return $str;

}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/25b76368b744b08194ea3c853fc8f5e8)
```php
<?

// 1. Name the function with the previous comment
// 2. Remove the Comment

function replaceBracesWithSpaces($input) {
  
  return str_replace(array("\{","\}")," ", $input);

}
```

# Type

[X] Semi-Automatic

Some IDEs have this refactoring although naming is not fully automatic.

# Why the code is better?

Comments always lie.

It is hard to maintain comments.

On the contrary, Functions are alive and self-explanatory.

# Limitations

As always, very important design decisions are valid comments.

# Tags

- Comments

# See also

[What is in a name?](Theory\What exactly is a name — Part I The Quest)

# Credits

Image by [Jannik Texler](https://pixabay.com/users/texler-3778340/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.