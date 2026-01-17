# Code Smell 318 - Refactoring Dirty Code

![Code Smell 318 - Refactoring Dirty Code](Code%20Smell%20318%20-%20Refactoring%20Dirty%20Code.jpg)

*You polish code that nobody touches while the real hotspots burn*

> TL;DR: Don't waste time refactoring code that never changes; focus on frequently modified problem areas.

# Problems 😔

- Wasted effort
- Wrong priorities
- Missed real issues
- Team productivity drop
- Resource misallocation
- False progress feeling

# Solutions 😃

1. Analyze change frequency
2. Identify code hotspots
3. Use version control data
4. Focus on active areas
5. Measure code churn

# Refactorings ⚙️

[Refactoring 021 - Remove Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20021%20-%20Remove%20Dead%20Code/readme.md)

# Context 💬

This is the anti code smell.

You come across ugly code with [complex conditionals](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md), [long functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md), and [poor naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md).

You remember Uncle Bob's motto of leaving the campsite better than when you found it.

Your refactoring instinct kicks in, and you spend days cleaning it up.

You feel productive, but you've been wasting your time.

Bad code is only problematic when **you need to change it**.

Stable code, even if poorly written, doesn't hurt your productivity.

The real technical debt lies in code hotspots: areas that are both problematic and frequently modified.

Most codebases follow an extreme distribution where [5% of the code receives 90% of the changes](https://refactoring.fm/p/everything-as-code-hotspots-and-process).

Without analyzing version control history, you cannot identify which messy code actually matters.

You end up fixing the wrong things while the real problems remain untouched.

You need to address the technical debt by prioritizing code with poor quality and high change frequency.

Everything else is premature optimization disguised as craftsmanship.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/b319b1580d4c4a6c8bd8cf25f66e1d7f) -->

```python
# This authentication module hasn't changed in 3 years
# It's deprecated and will be removed next quarter
# But you spend a week "improving" it

class LegacyAuthenticator:
    def authenticate(self, user, pwd):
        # Original messy code from 2019
        if user != None:
            if pwd != None:
                if len(pwd) > 5:
                    # Complex nested logic...
                    result = self.check_db(user, pwd)
                    if result == True:
                        return True
                    else:
                        return False
        return False

# After your "refactoring" (that nobody asked for):
class LegacyAuthenticator:
    def authenticate(self, user: str, pwd: str) -> bool:
        if not self._is_valid_input(user, pwd):
            return False
        return self._verify_credentials(user, pwd)
    
    def _is_valid_input(self, user: str, pwd: str) -> bool:
        return user and pwd and len(pwd) > 5
    
    def _verify_credentials(self, user: str, pwd: str) -> bool:
        return self.check_db(user, pwd)

# Meanwhile, the actively developed payment module
# (modified 47 times this month) remains a mess
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c28e20de52eb4dea2f275ab4fd5df8b1) -->

```python
# You analyze git history first:
# git log --format=format: --name-only | 
# grep -E '\.py$' | sort | uniq -c | sort -rn

# Results show PaymentProcessor changed 47 times this month
# And it doesn't have good enough coverage
# LegacyAuthenticator: 0 changes in 3 years

# Focus on the actual hotspot:
class PaymentProcessor:
    # This gets modified constantly and is hard to change
    # REFACTOR THIS FIRST
    def process_payment(self, amount, card, user, promo_code,
                       installments, currency, gateway):
        # 500 lines of tangled logic here
        # Changed 47 times this month
        # Every change takes 2+ days due to complexity
        pass

# Ignore stable legacy code
# But you can use IA to cover existing functionality
# With acceptance tests validated by a human product owner

class LegacyAuthenticator:
    # Leave this ugly code alone
    # It works, it's stable, it's being deprecated
    # Your time is better spent elsewhere
    def authenticate(self, user, pwd):
        if user != None:
            if pwd != None:
                if len(pwd) > 5:
                    result = self.check_db(user, pwd)
                    if result == True:
                        return True
        return False
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell by analyzing your version control history.

Track which files change most frequently and correlate that with code quality metrics.

Tools like [CodeScene](https://codescene.com/), git log analysis, or custom scripts can show your actual hotspots.

Track your [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) to the code you change more often.

# Exceptions 🛑

Sometimes you must refactor stable code when:

- New feature development requires adaptive changes
- Security vulnerabilities require fixes
- Regulatory compliance demands changes
- You're about to reactivate dormant features

The key is intentional decision-making based on real data, not assumptions.

# Tags 🏷️

- Technical Debt

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

While you build a [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) between your code and real-world behavior, you will notice some parts of your system are more actively changed than others.

Your [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) should reflect this reality.

When you refactor stable code, you break the correspondence between development effort and actual business value.

You treat all code equally in your mental model, but the real world shows extreme usage patterns where a small percentage of code handles the vast majority of changes.

You optimize for an imaginary world where all code matters equally.

# AI Generation 🤖

Some code generators suggest refactorings without considering change frequency.

AI tools and linters analyze code statically and recommend improvements based on patterns alone, not usage.

They do not access your version control history to understand which improvements actually matter unless you *explicitly* tell them to do it.

AI might flag every long function or complex conditional, treating a dormant 500-line legacy method the same as an equally messy function you modify daily.

# AI Detection 🧲

AI can help you to fix this code smell if you provide it with proper context.

You need to give it version control data showing change frequencies. Without that information, AI will make the same mistakes humans do: recommending refactorings based purely on code structure.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Analyze this codebase's git history to identify files with high change frequency. Then review code quality metrics for those files. Recommend refactoring only the intersection of high-churn and low-quality code. Ignore stable low-quality code."

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) | [ChatGPT](https://chat.openai.com/?q=Analyze+this+codebase%27s+git+history+to+identify+files+with+high+change+frequency.+Then+review+code+quality+metrics+for+those+files.+Recommend+refactoring+only+the+intersection+of+high-churn+and+low-quality+code.+Ignore+stable+low-quality+code.%22%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) | [Claude](https://claude.ai/new?q=Analyze+this+codebase%27s+git+history+to+identify+files+with+high+change+frequency.+Then+review+code+quality+metrics+for+those+files.+Recommend+refactoring+only+the+intersection+of+high-churn+and+low-quality+code.+Ignore+stable+low-quality+code.%22%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) | [Perplexity](https://www.perplexity.ai/?q=Analyze+this+codebase%27s+git+history+to+identify+files+with+high+change+frequency.+Then+review+code+quality+metrics+for+those+files.+Recommend+refactoring+only+the+intersection+of+high-churn+and+low-quality+code.+Ignore+stable+low-quality+code.%22%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Analyze+this+codebase%27s+git+history+to+identify+files+with+high+change+frequency.+Then+review+code+quality+metrics+for+those+files.+Recommend+refactoring+only+the+intersection+of+high-churn+and+low-quality+code.+Ignore+stable+low-quality+code.%22%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) | [You](https://you.com/search?q=Analyze+this+codebase%27s+git+history+to+identify+files+with+high+change+frequency.+Then+review+code+quality+metrics+for+those+files.+Recommend+refactoring+only+the+intersection+of+high-churn+and+low-quality+code.+Ignore+stable+low-quality+code.%22%3A+%60%60%60python%0D%0A%23+This+authentication+module+hasn%27t+changed+in+3+years%0D%0A%23+It%27s+deprecated+and+will+be+removed+next+quarter%0D%0A%23+But+you+spend+a+week+%22improving%22+it%0D%0A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%2C+pwd%29%3A%0D%0A++++++++%23+Original+messy+code+from+2019%0D%0A++++++++if+user+%21%3D+None%3A%0D%0A++++++++++++if+pwd+%21%3D+None%3A%0D%0A++++++++++++++++if+len%28pwd%29+%3E+5%3A%0D%0A++++++++++++++++++++%23+Complex+nested+logic...%0D%0A++++++++++++++++++++result+%3D+self.check_db%28user%2C+pwd%29%0D%0A++++++++++++++++++++if+result+%3D%3D+True%3A%0D%0A++++++++++++++++++++++++return+True%0D%0A++++++++++++++++++++else%3A%0D%0A++++++++++++++++++++++++return+False%0D%0A++++++++return+False%0D%0A%0D%0A%23+After+your+%22refactoring%22+%28that+nobody+asked+for%29%3A%0D%0Aclass+LegacyAuthenticator%3A%0D%0A++++def+authenticate%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++if+not+self._is_valid_input%28user%2C+pwd%29%3A%0D%0A++++++++++++return+False%0D%0A++++++++return+self._verify_credentials%28user%2C+pwd%29%0D%0A++++%0D%0A++++def+_is_valid_input%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+user+and+pwd+and+len%28pwd%29+%3E+5%0D%0A++++%0D%0A++++def+_verify_credentials%28self%2C+user%3A+str%2C+pwd%3A+str%29+-%3E+bool%3A%0D%0A++++++++return+self.check_db%28user%2C+pwd%29%0D%0A%0D%0A%23+Meanwhile%2C+the+actively+developed+payment+module%0D%0A%23+%28modified+47+times+this+mon) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

You cannot improve productivity by polishing code that never changes.

[Technical debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md) only matters when it slows you down, which happens in code you actually modify.

Focus your refactoring efforts where they multiply your impact: the hotspots where poor quality meets frequent change.

Everything else is **procrastination** disguised as engineering excellence.

Let stable ugly code rest in peace.

Your human time is too valuable to waste on problems that don't exist.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

[Code Smell 148 - ToDos](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 60 - Global Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2060%20-%20Global%20Classes/readme.md)

# More Information 📕

[![Watch the video](https://img.youtube.com/vi/F5WkftHqexQ/sddefault.jpg)](https://youtu.be/F5WkftHqexQ) 

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Viktor Keri](https://unsplash.com/@viktorkeri) on [Unsplash](https://unsplash.com/photos/person-in-black-pants-and-black-hiking-shoes-mzfiko3Uehs)

* * *

> The first rule of optimization is: Don't do it. The second rule is: Don't do it yet.

_Michael A. Jackson_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)