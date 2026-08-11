Rewrite the prompt below for a reasoning model.

Remove: forced verification lines ("double-check your work",
"review before answering"), "think deeply" or "think hard"
phrasing, SIEMPRE/NUNCA rules written for judgment calls
instead of real invariants, a bare "be concise" with no
specifics, and any rule that's stated more than once.

Add: an explicit effort level (low, medium, high, or max),
an explicit scope boundary, an explicit output length, and
an explicit autonomy policy (act without asking, confirm
first, or inspect and report only).

Keep every real business rule, security limit, and data
boundary from the original prompt untouched. Don't invent
new constraints that weren't already there.

Output using this structure: Role, Objective, Success
criteria, Constraints, Output format, Stopping rules.

Old prompt:
<PASTE THE OLD PROMPT HERE>
