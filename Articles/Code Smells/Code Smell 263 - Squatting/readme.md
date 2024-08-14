# Code Smell 263 - Squatting

![Code Smell 263 - Squatting](Code%20Smell%20263%20-%20Squatting.jpg)

*Don't use guessable names in advance on mission-critical resources*

> TL;DR: Secure your cloud resources by avoiding predictable naming patterns.

# Problems

- Predictable names

- Unauthorized access

- Data exposure risks

- Shadow resources

- Account takeovers

- [Idor vulnerability](https://en.wikipedia.org/wiki/Insecure_direct_object_reference)

- Premature Optimization

# Solutions

1. Use unique bucket names with dark keys

2. Verify ownership on creation

3. Secure resources fully

4. Have indirections obfuscating real names

5. Book names to prevent [squatting](https://en.wikipedia.org/wiki/Cybersquatting)

6. Randomize names

# Context

Resource squatting happens when attackers anticipate the naming patterns of cloud resources, like S3 buckets.

The attacker creates them in regions where the user hasn't *yet* deployed resources. 

User interaction with these attacker-owned resources can lead to severe security breaches like data exposure, unauthorized access, or account takeovers. 

This vulnerability is critical in environments like AWS, where predictable naming conventions are often used.

Many systems avoid this indirection fearing the performance penalty which is a clear case of premature optimization.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/fadc914160d921bcf04f44c9b33397c2)

```python
def create_bucket(account_id, region):
    bucket_name = f"aws-glue-assets-{account_id}-{region}"
    create_s3_bucket(bucket_name)  
   # This is deterministic and open
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/05b5dedb14f5696545c7e96d120fafd9)

```python
import uuid

def create_bucket(account_id, region):
    unique_id = uuid.uuid4().hex
    # This number is not deterministic
    # is a way to generate a random UUID (Universally Unique Identifier) 
    # in Python and then retrieve it as a hexadecimal string.
    bucket_name = f"aws-glue-assets-{unique_id}-{account_id}-{region}"
    create_s3_bucket(bucket_name)
    verify_bucket_ownership(bucket_name, account_id)
```

# Detection

[X] Automatic 

A security audit can detect this smell by analyzing your resource names for predictability. 

Look for patterns in names that an attacker can easily anticipate or guess.

Many automated tools and manual code reviews can help identify these risks.

# Tags

- Security

# Level

[X] Intermediate

# AI Generation

AI generators may create this smell using standard templates with predictable naming patterns. 

Always customize and review generated code for security.

# AI Detection

AI can help detect this smell if configured with rules that identify predictable or insecure resource naming conventions.

This is a security risk that requires understanding of cloud infrastructure and potential attack vectors.

# Conclusion
 
Avoiding predictable naming patterns is critical to securing your cloud resources. 

Always use unique, obscure, hard-to-guess names, and also verify resource ownership to protect against squatting attacks.

# Relations

[Code Smell 120 - Sequential IDs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20120%20-%20Sequential%20IDs/readme.md)

# More Info

[Gb Hackers](https://gbhackers.com/aws-vulnerability-remote-execution/)

[Wikipedia](https://en.wikipedia.org/wiki/Cybersquatting)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Felix Koutchinski](https://unsplash.com/@pheliks) on [Unsplash](https://unsplash.com/photos/group-of-police-standing-near-grey-building-WEcl8_kqwpg)  
  
* * *

> The only system which is truly secure is one which is switched off and unplugged, locked in a titanium lined safe, buried in a concrete bunker, and is surrounded by nerve gas and very highly paid armed guards. Even then, I wouldn't stake my life on it.

_Gene Spafford_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)