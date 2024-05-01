# Rethinking Leap Years: Why Your Favorite Programming Language's Approach May Be Flawed
            
![Rethinking Leap Years: Why Your Favorite Programming Language's Approach May Be Flawed](Rethinking%20Leap%20Years%20Why%20Your%20Favorite%20Programming%20Language's%20Approach%20May%20Be%20Flawed.jpg)

*A historical mistake and how you can solve it*

> TL;DR: Most languages fail to find the correct behavior for leap year calculation.

* * *

> Disclaimer: While I've tried my best to provide accurate insights across various programming languages, I acknowledge that I may not be an expert in everyone. If you spot an error or disagree with any points, please leave a respectful comment, and I'll promptly address it.

# The State of the Art

Determining whether a year is a leap (or not) is a simple mathematical problem.

Every student can solve it as their first programming assignment.

To simplify the problem, let's assume a Year is a [leap](https://en.wikipedia.org/wiki/Leap_year) when it is evenly divisible by 4, except if it's also divisible by 100, but it is a leap year if it's divisible by 400.

The real world and cosmic mechanics are a bit more complicated but it is beyond the scope of this article.

Let's explore how several programming languages solve this problem:

## Horrible Approach

PHP:

[Gist Url]: # (https://gist.github.com/mcsee/889347766222eb545e60bc9e449f2101)

```php
<?php

$yearNumber = 2024;
$isLeap = date('L', mktime(0, 0, 0, 1, 1, $yearNumber));
```

* * *
SQL (PostgreSQL):

[Gist Url]: # (https://gist.github.com/mcsee/c37acaab88dd5ee8e3d2bf1dc6a0fe15)

```sql
SELECT (EXTRACT(year FROM TIMESTAMP '2024-02-29') IS NOT NULL)
 AS is_leap_year;
```

* * *

These languages attempt to create a valid (or invalid) leap day and exploit [truthy values](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md).

This hack violates the fail-fast principle and abuses the [billion-dollar mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

Trying to create an invalid date should throw an exception in serious languages since this happens in the [real world domain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Performing other actions like concealing errors beneath the surface breaches the principle of least astonishment.

## Missing Behavior

Ada:

[Gist Url]: # (https://gist.github.com/mcsee/a33c4866c88829a080ca335b83bf7b83)

```ada
function Is_Leap_Year (Year : Integer) return Boolean is
begin
    return (Year mod 4 = 0 and then Year mod 100 /= 0) 
        or else (Year mod 400 = 0);
end Is_Leap_Year;
```

* * *

C/C++:

[Gist Url]: # (https://gist.github.com/mcsee/9497f8e802a3ddaa2df3747d23721ee3)

```c
bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}
```

* * *

Go:

[Gist Url]: # (https://gist.github.com/mcsee/3a686aac83ce1914e1bc1e5c3b1fdb64)

```go
package main

import (
  "fmt"
  "time"
)

func isLeapYear(year int) bool {
  return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}
```

* * *

Haskell:

[Gist Url]: # (https://gist.github.com/mcsee/eee40affc6485f8fce26106bdf91a46e)

```haskell
import Data.Time.Calendar (isLeapYear)
let year = 2024
let isLeap = isLeapYear year
```

* * *

JavaScript/TypeScript:

[Gist Url]: # (https://gist.github.com/mcsee/6bf68806af1704479286e938a229521d)

```javascript
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
```

* * *

Julia:

[Gist Url]: # (https://gist.github.com/mcsee/6e54217cf6b21e1ebe7a41f0a89350c4)

```julia
using Dates
year = 2024
isleap(year)
```

* * *

Lua:

[Gist Url]: # (https://gist.github.com/mcsee/d42c0379c7d0555283c233ca1a874b99)

```lua
local year = 2024
local isLeap = (year % 4 == 0 and year % 100 ~= 0) or (year % 400 == 0)
```

* * *

MATLAB:

[Gist Url]: # (https://gist.github.com/mcsee/0ac527e0b390c4a7f5c9ac73ef783705)

```matlab
year = 2024;
isLeap = mod(year, 4) == 0 && (mod(year, 100) ~= 0 || mod(year, 400) == 0);
```

* * *

Objective-C:

[Gist Url]: # (https://gist.github.com/mcsee/3b5084b475bda6d25e5714b87acac201)

```matlab
int yearNumber = 2024;
BOOL isLeap = (yearNumber % 4 == 0 && yearNumber % 100 != 0) 
  || (yearNumber % 400 == 0);
```

* * *

PowerShell:

[Gist Url]: # (https://gist.github.com/mcsee/56ab6b603e09aa57a309214da1ec550c)

```powershell
$yearNumber = 2024
$isLeap = ($yearNumber % 4 -eq 0 -and $yearNumber % 100 -ne 0) 
  -or ($yearNumber % 400 -eq 0)
```

* * *

Rust:

[Gist Url]: # (https://gist.github.com/mcsee/d7c2c51cfa69056b04ab2cc860c7a05c)

```rust
fn is_leap_year(year: i32) -> bool {
    (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
```
 
* * *

Smalltalk:

[Gist Url]: # (https://gist.github.com/mcsee/b078eb3ef88e1e041583738600bbff7d)

```smalltalk
| yearNumber |
yearNumber := 2024.
(yearNumber \\ 4 = 0)
  and: [(yearNumber \\ 100 ~= 0) or: [ yearNumber \\ 400 = 0 ]]
```

The above languages do not provide native support.

You need to define global functions or use [helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md).

## Incorrect Global Approach

PHP (Again):

[Gist Url]: # (https://gist.github.com/mcsee/78174a8beaa2c66696fbdee9c9803965)

```php
<?php

$yearNumber = 2024;
$isLeap = checkdate(2, 29, $yearNumber);
```

* * *

R:

[Gist Url]: # (https://gist.github.com/mcsee/da213e8043714cf9f06d6cd93efc829d)

```R
leap_year(2024)
```

* * *

Ruby:

[Gist Url]: # (https://gist.github.com/mcsee/8c0e7d08b2e4793d14f149b4d11a8037)

```ruby
year = 2024
is_leap = Date.leap?(year)
```

* * *

Swift:

[Gist Url]: # (https://gist.github.com/mcsee/c24d34d0b36e6de374dc940167d2c3cd)

```swift
let yearNumber = 2024
let isLeap = Calendar.current.isDateInLeapYear(
  Date(timeIntervalSince1970: TimeInterval(yearNumber)))
```

* * *

These languages use [global functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md) to check if a year is a leap.

These *utility* global methods mistakenly place responsibility in the wrong location (a global access point).

## Helpers Bad Approach

C#:
 
[Gist Url]: # (https://gist.github.com/mcsee/0c6e956507fa10585fa1ed12cec1c41a)

```csharp
int yearNumber = 2024;
bool isLeap = System.DateTime.IsLeapYear(yearNumber);
```

* * *

Dart:

[Gist Url]: # (https://gist.github.com/mcsee/c366c9b36454bc2c518f611e01cee3ee)

```dart
import 'package:intl/intl.dart';
var year = 2024;
var isLeap = DateTime(year).isLeapYear;
```

* * *

Perl:

[Gist Url]: # (https://gist.github.com/mcsee/608f95f70685d538a87b0065bf05c2f7)

```perl
use Time::Piece;
my $yearNumber = 2024;
my $isLeap = Time::Piece
  ->strptime("$yearNumber-01-01", "%Y-%m-%d")->leapyear;
```

* * *

Python:

[Gist Url]: # (https://gist.github.com/mcsee/3784f803523ac494766fd6ffe60bc978)

```python
import calendar
leap = calendar.isleap(2024)
```

* * * 

Visual Basic .NET:

[Gist Url]: # (https://gist.github.com/mcsee/a838cf647578447fd3156b10093675b7)

```visualbasic
Dim year As Integer = 2024
Dim isLeap As Boolean = DateTime.IsLeapYear(year)
```

* * *

These languages use [helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md) as libraries to check if a year is a leap.

The [misplaced responsibly](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20191%20-%20Misplaced%20Responsibility/readme.md) is not present in a real object but in a bag of *DateTime related functions*.

## The Year Approach

Java:

[Gist Url]: # (https://gist.github.com/mcsee/42ceb93b9919a046b5752c1fb5602aa8)

```java
int yearNumber = 2024;
boolean isLeap = java.time.Year.of(yearNumber).isLeap();
```

* * *

Kotlin:

[Gist Url]: # (https://gist.github.com/mcsee/5fc2aaa115fb7c36e5d00e9832015bfb)

```kotlin
val yearNumber = 2024
val isLeap = java.time.Year.of(yearNumber).isLeap
```

* * *

Scala:

[Gist Url]: # (https://gist.github.com/mcsee/a1f3a233e4282436a232a5622be31658)

```scala
val year = 2024
val isLeap = java.time.Year.of(year).isLeap
```

* * *

These languages rely on the *Year* to check if it is a leap.

The protocol is closer to the real world in the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) 

Notice they create *Year* objects and not *Integer* objects since this would also break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

A *Year* has a different protocol than an integer, and modeling a Year as an integer would also be a [premature optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) smell and a symptom of mixing [the what and the how](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20123%20-%20Mixed%20'What'%20and%20'How'/readme.md).

A *Year* can tell if it is a leap (an integer shouldn't do it) and can tell you about its months (which are *Months*, not [0-based](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20219%20-%20Looping%20from%20index%200/readme.md) integers, 1-based integers or strings).

Conversely, an *Integer*'s capabilities extend to arithmetic operations such as multiplication and exponentiation.

# Time is not a joke

Representing a point in time as a *float*, *integer*, or any other data type comes with consequences.

You can break a point in time in the real world in tiny fractions (but not [too small](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Opinion/Warning%20The%20Universe's%20Event%20Simulator%20Is%20a%20Fierce%20Adversary%20for%20Coders/readme.md))

Using *floats* is not a valid option.

[0.01 + 0.02](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2071%20-%20Magic%20Floats%20Disguised%20as%20Decimals/readme.md) is not 0.03, and this has terrible consequences [dealing with floating point](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20108%20-%20Float%20Assertions/readme.md) points in time.

# The Challenge

We've been talking about leap years.

What are the needs to know if a year is a leap?

The date and time mechanics you model need to know the February 28th, 2024 successor.

But this is *NOT* your problem.

Following the information hiding principle, you should leave the responsibility as a private protocol.

# Conclusion

There is no [Silver Bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md). 

Use your language wisely.

Today is February 29th, a leap day to pause and reflect on the tools you use daily.

See you in 4 years.