# Code Smell 317 - Email Handling Vulnerabilities

![Code Smell 317 - Email Handling Vulnerabilities](Code%20Smell%20317%20-%20Email%20Handling%20Vulnerabilities.jpg)

*Your system trusts UI input and sends security emails to attacker-controlled addresses instead of database values*

> TL;DR: You normalize email for lookup but trust UI data for delivery, breaking identity ownership.

# Problems 😔

- UI trust
- Identity drift
- Unicode confusion
- String identity
- Boundary breach
- Collation confusion
- Security bypass
- Account takeover
- Email spoofing

# Solutions 😃

1. Server owns identity
2. Never trust UI input
3. Use strict collation
4. Use canonical emails
5. Normalize once
6. Persist then act
7. Implement [Multi-Factor Authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication)

# Refactorings ⚙️

[Refactoring 019 - Reify Email Addresses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20019%20-%20Reify%20Email%20Addresses/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 034 - Reify Parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20034%20-%20Reify%20Parameters/readme.md)

# Context 💬

When you handle user input containing Unicode characters, system components interpret them in many differnet ways.

Some database engines with certain [collations](https://en.wikipedia.org/wiki/Collation) (like utf8mb4_unicode_ci) treat Unicode characters with diacritics as equal to their ASCII counterparts.

For example, *'à'* equals *'a'*.

However, email servers, programming languages, and other systems distinguish between these characters.

This inconsistency creates a dangerous security vulnerability.

An attacker can set up an email account named *attacker@gmàil.com* (with Unicode 'à').

Then the attacker requests a password reset for the victim's legitimate account victim@gmail.com (ASCII 'a'), filling the email *victim@gmàil.com.*

Your database collation finds a match because it treats both addresses as equal.

However, you commit the critical mistake of using the **untrusted UI input** to send the reset email instead of using the email address stored in your database.

The reset link goes to the attacker's Unicode address, giving them complete control of the victim's account.

You violate the fundamental security principle: **never trust data from the UI**.

You must always use the canonical values from your database for security-critical operations.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/f9a92cb792212c40b0a3e2c503ab95df) -->

```python
def reset_password(email_from_ui):
    # email_from_ui = "victim@gmàil.com" 
    # (attacker's Unicode address from UI)
    
    # Database with utf8mb4_unicode_ci collation
    # treats 'à' = 'a', so this query finds:
    # victim@gmail.com stored in the database
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email_from_ui,)
    )
    user = cursor.fetchone()
    
    if user:
        # CRITICAL MISTAKE: Trusting UI data
        # Sends email to the attacker's Unicode address
        # instead of using user['email'] from DB
        send_reset_email(email_from_ui)
        # Should use: send_reset_email(user['email'])
        return True
    return False

# Attack scenario:
# DB stores: victim@gmail.com (ASCII, legitimate)
# Attacker controls: attacker@gmàil.com (Unicode)
# Attacker requests reset with: victim@gmàil.com
# Collation matches the victim's account
# Email sent to: victim@gmàil.com (attacker's address!)
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/fbd378352df69bdab3043ad2687300e7) -->

```python
import unicodedata

def normalize_email(email):
    # Convert to NFKC normalized form
    normalized = unicodedata.normalize('NFKC', email)
    
    # Ensure only ASCII characters
    try:
        normalized.encode('ascii')
    except UnicodeEncodeError:
        raise ValueError(
            "Email contains non-ASCII characters."
        )
    
    return normalized.lower()

def reset_password(email_from_ui):
    # DEFENSE 1: Normalize and validate input
    try:
        normalized_email = normalize_email(email_from_ui)
    except ValueError:
        # Reject non-ASCII emails immediately
        return False
    
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (normalized_email,)
    )
    user = cursor.fetchone()
    
    if user:
        # DEFENSE 2: NEVER trust UI data
        # Always use the canonical email from the database
        database_email = user['email']
        send_reset_email(database_email)
        # NOT: send_reset_email(email_from_ui)
        # NOT: send_reset_email(normalized_email)
        return True
    return False

# Now the attack fails:
# Attacker sends: victim@gmàil.com
# Normalized to: rejected (non-ASCII)
# Even if it passed, email sent to: user['email']
# (the actual stored value, not the attacker's input)
```

# Detection 🔍

[X] Semi-Automatic

You can spot this smell with static analyzers that check for inconsistent string handling.

Run Unicode fuzzers to test inputs. 

Review the code for places where you use raw UI data in sensitive operations like emails.

Check how you handle user input, especially authentication and email validation.

Look for the critical pattern: using UI-provided data directly in external communications instead of database values.

Search for *send_email(user_input)* patterns where you should use *send_email(db_record['email'])*.

Check your database collation settings and ensure you apply Unicode normalization consistently.

Flag any code that uses the original user input after a successful database lookup - this is the core vulnerability.

Static analysis tools can flag when you use UI input without normalization or when you bypass database values in favor of user-provided strings.

# Tags 🏷️

- Security

# Level 🔋

[X] Advanced

# Why the Bijection Is Important 🗺️

You need a clear [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between real-world email addresses and your system's representation.

[String representation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2004%20-%20String%20Abusers/readme.md) is always an accidental problem unrelated to the real world.

When you allow Unicode characters without proper normalization, you break this mapping.

The [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) sees one email address, but your database collation creates multiple representations that map to the same stored value.

This breaks the essential property that each real-world email address corresponds to exactly one account. An attacker exploits this broken bijection by creating a Unicode variant that your database treats as equivalent to an existing ASCII address, while email servers treat them as distinct destinations.

# AI Generation 🤖

AI tools sometimes generate this smell because they are pre-trained with poor code examples, and they focus on basic logic without considering encoding edge cases.

# AI Detection 🧲

AI can fix this smell if you give clear prompts about normalization, security vulnerabilities, and stored data usage.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Model email as a server-owned value object.Normalize once.After database lookup,discard UI input for security actions.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Model+email+as+a+server-owned+value+object.Normalize+once.After+database+lookup%2Cdiscard+UI+input+for+security+actions.%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Model+email+as+a+server-owned+value+object.Normalize+once.After+database+lookup%2Cdiscard+UI+input+for+security+actions.%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Model+email+as+a+server-owned+value+object.Normalize+once.After+database+lookup%2Cdiscard+UI+input+for+security+actions.%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Model+email+as+a+server-owned+value+object.Normalize+once.After+database+lookup%2Cdiscard+UI+input+for+security+actions.%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) | [You](https://you.com/search?q=Model+email+as+a+server-owned+value+object.Normalize+once.After+database+lookup%2Cdiscard+UI+input+for+security+actions.%3A+%60%60%60python%0D%0Adef+reset_password%28email_from_ui%29%3A%0D%0A++++%23+email_from_ui+%3D+%22victim%40gm%C3%A0il.com%22+%0D%0A++++%23+%28attacker%27s+Unicode+address+from+UI%29%0D%0A++++%0D%0A++++%23+Database+with+utf8mb4_unicode_ci+collation%0D%0A++++%23+treats+%27%C3%A0%27+%3D+%27a%27%2C+so+this+query+finds%3A%0D%0A++++%23+victim%40gmail.com+stored+in+the+database%0D%0A++++cursor.execute%28%0D%0A++++++++%22SELECT+%2A+FROM+users+WHERE+email+%3D+%25s%22%2C%0D%0A++++++++%28email_from_ui%2C%29%0D%0A++++%29%0D%0A++++user+%3D+cursor.fetchone%28%29%0D%0A++++%0D%0A++++if+user%3A%0D%0A++++++++%23+CRITICAL+MISTAKE%3A+Trusting+UI+data%0D%0A++++++++%23+Sends+email+to+the+attacker%27s+Unicode+address%0D%0A++++++++%23+instead+of+using+user%5B%27email%27%5D+from+DB%0D%0A++++++++send_reset_email%28email_from_ui%29%0D%0A++++++++%23+Should+use%3A+send_reset_email%28user%5B%27email%27%5D%29%0D%0A++++++++return+True%0D%0A++++return+False%0D%0A%0D%0A%23+Attack+scenario%3A%0D%0A%23+DB+stores%3A+victim%40gmail.com+%28ASCII%2C+legitimate%29%0D%0A%23+Attacker+controls%3A+attacker%40gm%C3%A0il.com+%28Unicode%29%0D%0A%23+Attacker+requests+reset+with%3A+victim%40gm%C3%A0il.com%0D%0A%23+Collation+matches+the+victim%27s+account%0D%0A%23+Email+sent+to%3A+victim%40gm%C3%A0il.com+%28attacker%27s+address%21%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Unicode normalization inconsistencies combined with trusting UI input create critical security vulnerabilities.

You must never use untrusted UI data for security-critical operations like sending password reset emails.

Always normalize all user input to a canonical form and validate it strictly. Most importantly, always use the canonical values from your database, not the user-provided input, when performing authentication or sending security-related communications.

The safest approach restricts email addresses to ASCII-only characters and always treats the database as the single source of truth

# Relations 👩‍❤️‍💋‍👨
 
[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

# More Information 📕

[![Watch the video](https://img.youtube.com/vi/4CCghc7eUgI/sddefault.jpg)](https://youtu.be/4CCghc7eUgI) 

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Aurèle Castellane](https://unsplash.com/@broth_earth) on [Unsplash](https://unsplash.com/photos/blue-and-black-steel-cabinet-1AIg__qQvhI)

* * *

> Never trust input you do not control.

_Bruce Schneier_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)