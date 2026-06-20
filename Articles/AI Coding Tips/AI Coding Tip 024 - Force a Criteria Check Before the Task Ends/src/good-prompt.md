Refactor the SingletonController following all rules in AGENTS.md.

After you finish, spawn a subagent with this task:

"Read the modified file at src/Controller.php.

Read every rule marked MANDATORY, CRITICAL, or REQUIRED

from AGENTS.md.

For each rule, verify the file directly. Don't rely on memory.

Produce a table with one row per rule:
| # | Rule | Status | Evidence |
|---|------|--------|----------|

Mark PASS with the exact line you found as proof.
Mark FAIL with the exact violation.

Only use Read, Grep, and Glob tools.
Don't change any files."

Block completion until the subagent reports all PASS.