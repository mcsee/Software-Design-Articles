# Code Smell 246 - Expiration Date
            
![Code Smell 246 - Expiration Date](Code%20Smell%20246%20-%20Expiration%20Date.jpg)

*You need to model an expiration date. Which object will you use?*

> TL;DR: Model real word expiration dates with... *expiration dates*

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Violation

- Unexpected Behavior

- [Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md) Missing

- [Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# Solutions

1. Honor the bijection and model correct behavior

# Context

In many systems, the expiry date of a credit card is often represented by simply using a Date object.

This can lead to potential issues and misunderstandings, especially when dealing with operations such as comparisons and calculations based on the expiry date.

it's generally considered a better practice to represent the expiry date with an adequate object.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f2f64b2f510c08a4f85a6c8cbe85de58)
```java
import java.util.Date;

public class CreditCard {
    private String cardNumber;
    private Date expiryDate;

    public CreditCard(String cardNumber, Date expiryDate) {
        // Not a complete date
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
    }

    public boolean isExpired() {
        Date currentDate = new Date();
        return expiryDate.before(currentDate);
        // How will it work? 
        // using the last day of the month?
    }
}
```

[Gist Url]: # (https://gist.github.com/mcsee/9816f1ef8c6e05ceb9f750113471e03f)
```java
public class CreditCard {
    private String cardNumber;
    private int expiryMonth;
    private int expiryYear;

    public CreditCard(String cardNumber, int expiryMonth, int expiryYear) {
        this.cardNumber = cardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        // No validations on number ranges?
    }

    public boolean isExpired(int currentMonth, int currentYear) {
        return (expiryYear < currentYear) ||
            (expiryYear == currentYear && expiryMonth < currentMonth);
    }
    // Inappropriate intimacy code smell
 
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/87977580c06f4816c48ca9c6f9d10b23)
```java
class CreditCard {
  private String number;
  private MonthOfYear expiryDate;
  // expiryDate is the role
  // MonthOfYear is the type
}

class MonthOfYear {
  private Month month;  
  private Year year;
  // These are other small objects

  public MonthOfYear(Month month, Year year) {
    // You don't need to add validations since 
    // month is a valid month
    // year is a valid year
    this.month = month;
    this.year = year;
  } 
  
 public boolean isBeforeEndOfMonth(Date date) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    return calendar.get(Calendar.DAY_OF_MONTH) <= getDaysInMonth();
  }
  
  // This protocol is just for MonthOfYears  
  public Day[] getDaysInMonth() { }
  
  public boolean isLeapYear() { } // ...
  
  public void iterateDays() { } // ...
  
}
```

# Detection

[X] Manual

This is a design smell

# Tags

- Primitive Obsession

# Level

[x] Intermediate

This is not an obvious design decision

# AI Generation

Actual AI assistants are not very good at creating these kinds of small objects

# AI Detection

Gemini detected this is a possible smell

# Conclusion

ExpiryDate explicitly separates month and year, making the code more readable and easier to understand the specific information needed for expiry.

It can also encapsulate logic specific to expiry dates, such as calculating days remaining, validating expiry, or iterating through days in the month. 
  
While Date objects offer date manipulation functionalities, they don't inherently represent the specific concept of a credit card expiry.  

Finding small objects with concrete behavior is always a difficult task.

# Relations

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 177 - Missing Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

# More Info

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [CardMapr.nl](https://unsplash.com/@cardmapr) on [Unsplash](https://unsplash.com/photos/visa-card-on-brown-wooden-table-oJAHi6JyFF4)

Thank you, *Hernan Wilkinson* for this tip
    
* * *

> Standards are always out of date. That’s what makes them standards.

_Alan Bennett_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)