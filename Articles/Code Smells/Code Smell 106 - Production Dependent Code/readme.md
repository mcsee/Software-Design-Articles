# Code Smell 106 - Production Dependent Code

![Code Smell 106 - Production Dependent Code](birmingham-museums-trust-y3TC9H0261s-unsplash.jpg)

*Don't add IFs checking for the production environment.*

> TL;DR: Avoid adding conditionals related to production 

# Problems

- Fail fast principle violation

- Lack of testability

# Solutions

1. If completely necessary, model environments and test *ALL* of them.

# Context

Sometimes, We need to create different behaviors in development and production.

For example the strength of the passwords.

In this case, we need to configure the environment with the strength strategy and test the strategy and not the environment itself.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/2b00edcf1fded330263a4773b227cd06)
```python
def send_welcome_email(email_address, environment):
  if ENVIRONMENT_NAME == "production":
    print(f"Sending welcome email to {email_address} from Bob Builder <bob@builder.com>")
  else:
    print("Emails are sent only on production")
    
send_welcome_email("john@doe.com", "development")
# Emails are sent only on production

send_welcome_email("john@doe.com", "production")
# Sending welcome email to john@doe.com from Bob Builder <bob@builder.com>
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4a598f416f01357597a072d75ba30a6f)
```python
class ProductionEnvironment:
  FROM_EMAIL = "Bob Builder <bob@builder.com>"

class DevelopmentEnvironment:
  FROM_EMAIL = "Bob Builder Development <bob@builder.com>"
  
# We can unit test environments
# and even implement different sending mechanisms

def send_welcome_email(email_address, environment):
  print(f"Sending welcome email to {email_address} from {environment.FROM_EMAIL}")
  # We can delegate into a fake sender (and possible logger)
  # and unit test it

send_welcome_email("john@doe.com", DevelopmentEnvironment())
# Sending welcome email to john@doe.com from Bob Builder Development <bob@builder.com>

send_welcome_email("john@doe.com", ProductionEnvironment())
# Sending welcome email to john@doe.com from Bob Builder <bob@builder.com>
```

# Detection

[X] Manual

This is a design smell. 

We need to create empty development/production configurations and delegate them with customizable polymorphic objects.

# Tags

- Coupling

# Conclusion

Avoid adding untestable conditionals. 

Create configurations delegating business rules.

Use abstractions, protocol, and interfaces, avoid hard hierarchies.

# Relations

[Code Smell 56 - Preprocessors](../../Code%20Smells/Code%20Smell%2056%20-%20Preprocessors/readme.md)

# More Info

- [How to avoid annoying ifs](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits

Photo by [Birmingham Museums Trust](https://unsplash.com/@birminghammuseumstrust) on [Unsplash](https://unsplash.com/s/photos/production-line)
  
This tweet was inspired by @[Jan Giacomelli](@jangia)

[Twitter](https://twitter.com/1462469614177173505)

* * *

> Complexity is a sign of technical immaturity. Simplicity of use is the real sign of a well design product whether it is an ATM or a Patriot missile.

_Daniel T. Ling_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)