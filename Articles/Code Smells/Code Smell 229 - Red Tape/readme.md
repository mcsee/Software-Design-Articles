# Code Smell 229 - Red Tape
            
![Code Smell 229 - Red Tape](Code%20Smell%20229%20-%20Red%20Tape.jpg)

*You overcomplicate your code*

> TL;DR: Avoid Accidental complexity and bureaucracy

# Problems

- Accidental Complexity

- Readability

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

# Solutions

1. Asign the responsibilities to real-world objects using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Context

A "red tape" code smell could relate to unnecessary complexity, bureaucracy, or excessive configuration that makes the codebase harder to understand or maintain. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/682cf5073e3fc55ae45f6e45c960e010)

```python
class VotingSystem:
    def __init__(self, config):
        self.config = config

    def validate_voter(self, voter_id):
        if self.config['voter_verification_enabled']:
            # Code to verify the voter's identity goes here

    def cast_vote(self, voter_id, candidate):
        if self.config['voting_enabled']:
            # Code to record the vote goes here

    def generate_vote_report(self):
        if self.config['generate_report']:
            # Code to generate a voting report goes here

    def audit_voting_system(self):
        if self.config['audit_enabled']:
            # Code to perform an audit of the voting system goes here

    # ... other voting-related methods ...

# Usage
config = {
    'voter_verification_enabled': True,
    'voting_enabled': False,
    'generate_report': False,
    'audit_enabled': True
}

voting_system = VotingSystem(config)

# Voter validation, voting, report generation, 
# and auditing are handled based on the configuration.
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9bf78bef70aa93c82a3f77fb1d30e1e2)

```python
class VoterVerification:
    def verify_voter(self, voter_id):
        # Code to verify the voter's identity goes here

class VotingMachine:
    def cast_vote(self, voter_id, candidate):
        # Code to record the vote goes here

class VoteReporter:
    def generate_report(self):
        # Code to generate a voting report goes here

class VotingAuditor:
    def audit_voting_system(self):
        # Code to perform an audit of the voting system goes here

# Usage
voter_verification = VoterVerification()
voting_machine = VotingMachine()
vote_reporter = VoteReporter()
voting_auditor = VotingAuditor()

# Voter verification, vote casting, report generation, 
# and auditing are handled separately.
```

# Detection

[X] Semi-Automatic 

Some tools can guess you are bloating your objects with unnecessary responsibilities.

# Tags

- Bloaters

# Conclusion

The red tape code smell is evident as developers need to navigate the complex configuration to determine which features are active. 

This not only adds unnecessary complexity but also increases the likelihood of misconfigurations that could impact the integrity of your system.

# Relations

[Code Smell 54 - Anchor Boats](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2054%20-%20Anchor%20Boats/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [the blowup](https://unsplash.com/@theblowup) on [Unsplash](https://unsplash.com/photos/ZrwLQZ7GUxs)  
  
* * *

> A Fallacy of Software: If it works, and we don't change anything, it will keep working.

_Jessica Kerr_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)