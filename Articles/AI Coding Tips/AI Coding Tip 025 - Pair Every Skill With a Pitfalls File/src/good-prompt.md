Write a SKILL.md for validating markdown articles.
Check for required sections and formatting rules.

Also create a PITFALLS.md in the same folder.
Add this first entry:

## Don't use regex to count H2 sections
Trigger: counting sections by heading level
Wrong: regex-based heading detection (/^##/m)
Correct: match section names explicitly by string
Reason: code blocks with # fool regex heading counters

Reference PITFALLS.md at the top of your SKILL.md.
The AI loads it at the start of every session.
