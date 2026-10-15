# SKILL.md (800 tokens - Modular)

Validates DECLARE statements.
It also covers arrays, nested arrays, function calls, and loops.

Rules:
- DECLARE detected → load declaration.md
- Brackets detected → load array.md
- Parentheses detected → load function-call.md

Template: [input] valid?
[YES/NO]. Reason: [rule].

**declaration.md** (1,200 tokens):

First character must be uppercase.
Can't start with a number.
Examples: DECLARE x, DECLARE foo

**array.md** (1,500 tokens):

Must use brackets: [item]
References nested-array.md for [x]
Examples: [foo], [bar], [123]

5 Files total (could be more)