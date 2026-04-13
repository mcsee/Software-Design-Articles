# SKILL.md (800 tokens - Modular)

Validates foo syntax: DECLARE, arrays,
nested arrays, function calls, loops.

Rules:
- DECLARE detected → load declaration.md
- detected → load array.md
- detected → load function-call.md

Template: [input] valid?
[YES/NO]. Reason: [rule].

**declaration.md** (1,200 tokens):

First character must be uppercase.
Cannot start with a number.
Examples: DECLARE x, DECLARE foo

**array.md** (1,500 tokens):

Must use brackets: [item]
References nested-array.md for [x]
Examples: [foo], [bar], [123]

3 Files total (could be more)