# Code Smell 48 - Code Without Standards

![Code Smell 48 - Code Without Standards](Code%20Smell%2048%20-%20Code%20Without%20Standards.jpg)

*Working on a solo project is easy. Unless you go back to it after some months. Working with many other developers requires some agreements.*

# Problems

- Maintainability

- Readability

# Solutions

1. Automate your styles and indentation.

2. Enforce agreed policies.

# Examples

- [PSR2](https://www.php-fig.org/psr/psr-2/)

# Sample Code

## Wrong

*Correct sample taken from Sandro [Mancuso's bank kata](https://github.com/sandromancuso/Bank-kata/blob/master/src/main/java/org/craftedsw/domain/Account.java)*

[Gist Url]: # (https://gist.github.com/mcsee/ef87aec745f654878ce71c844f786f17)
```java
package org.craftedsw.domain;

import static org.craftedsw.domain.Amount.amountOf;

import java.io.PrintStream;
import java.util.Date;

public class MY_Account {
	// Some class have different case, underscores

	private Statement privStatement; 
	// Attributes have visibility prefixes
	
	   private Amount currentbalance = amountOf(0);

	public SetAccount(Statement statement) {
		this.statement = statement;
	}
	// Setters and getters are not normalized
	
	public GiveAccount(Statement statement) 
	{ this.statement = statement; }
	// Indentation is not uniform

	public void deposit(Amount value, Date date) {
		recordTransaction(value, date);
		// some variables are named after type and not role.
	} 

	public void extraction(Amount value, Date date) {
		recordTransaction(value.negative(), date);
		// the opposite of *deposit* should be withdrawal
	}

	public void voidPrintStatement(PrintStream printer) 
	{
	statement.printToPrinter(printer);
	// Name is redundant
	}

	private void privRecordTransactionAfterEnteredthabalance(Amount value, Date date) {
		Transaction transaction = new Transaction(value, date);
		Amount balanceAfterTransaction = transaction.balanceAfterTransaction(balance);
		balance = balanceAfterTransaction;
		statement.addANewLineContainingTransation(transaction, balanceAfterTransaction);
		// naming is not uniform
	}	
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/55ade1bd7d835ef3804e86b55ec3abaa)
```java
package org.craftedsw.domain;

import static org.craftedsw.domain.Amount.amountOf;

import java.io.PrintStream;
import java.util.Date;

public class Account {

	private Statement statement;
	
	private Amount balance = amountOf(0);

	public Account(Statement statement) {
		this.statement = statement;
	}

	public void deposit(Amount value, Date date) {
		recordTransaction(value, date);
	} 

	public void withdrawal(Amount value, Date date) {
		recordTransaction(value.negative(), date);
	}

	public void printStatement(PrintStream printer) {
		statement.printTo(printer);
	}

	private void recordTransaction(Amount value, Date date) {
		Transaction transaction = new Transaction(value, date);
		Amount balanceAfterTransaction = transaction.balanceAfterTransaction(balance);
		balance = balanceAfterTransaction;
		statement.addLineContaining(transaction, balanceAfterTransaction);
	}
	
}
```

*The Right example has several other smells, but we keep it loyal to its GIT version in order to show only code standardization issues.*

# Detection

Linters and IDEs should test coding standards before a merge request is approved.

We can add our own [naming conventions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md) related to Objects, Classes, Interfaces, Modules etc.

# Tags

- Standardization

# Conclusion

Use coding standards in your projects.

A well-written clean code always follows standards about naming conventions, formatting and code style.

Such standards are helpful because they make things clear and deterministic for the ones who read your code, including yourself.

Code styling should be automatic and mandatory on large organizations to enforce [Collective Ownership](https://wiki.c2.com/?CollectiveCodeOwnership).

Automatic code formatting by a parser or compiler is the way machines gives us feedback on how their interpret our instructions.

It could prevent disagreements and follows fail fast principle.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

# More info

[What exactly is a name - Part I The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits

Comic by [XKCD](https://xkcd.com/927/)

* * *

> The nice thing about standards is that there are so many to choose from. 

_Andrew S. Tannenbaum_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)