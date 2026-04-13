Fixed PaymentProcessor null check with Null Object pattern

**AI Context**
Tool    : Claude Code (claude-sonnet-4-20250514)
Skill   : /skills/php-clean-code.md §3
Rules   : /AGENTS.md#error-handling
Workflow: /workflows/refactor-feature.md
Prompt  : "Refactor PaymentProcessor using the
           Null Object pattern instead of null
           checks. Follow AGENTS.md conventions."

**What the AI tried first**
Inline null guard. Rejected — violates AGENTS.md
rule on conditionals.

**Manual correction applied**
Renamed NullPayment to NullPaymentMethod to match
domain vocabulary. Added to AGENTS.md#naming.

payment.ts
```
 - if ($payment !== null) {
 -     $payment->process();
 - }
 + $payment->process();
```

AGENTS.md

```
  ## error-handling
  - Don't use null checks inline.
  - Use guard clauses only at system boundaries.
 + - Replace null checks with Null Object pattern.
 + - Null Objects live in /src/NullObjects/.
 + - Null Object class names follow NullX convention.
```

skills/clean-code.md
```
## §3 Null Handling
- - Avoid null returns when possible.
+ - Never check for null inside domain logic.
+ - Inject a Null Object instead.
+ - Example: NullPaymentMethod implements PaymentMethod.
+ - Prompt: "Replace null check in X with a Null Object
+    that implements the same interface."
```