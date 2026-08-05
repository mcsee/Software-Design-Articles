Stage: Plan
Model: Opus (strong reasoning)
Task: Scope the payment retry logic in read-only mode.
List files to touch and open questions. Don't write code.

Stage: Code
Model: Sonnet (fast, code-tuned)
Task: Implement the plan above. Keep the diff under 200 lines.

Stage: Review
Model: GPT-5.5 (didn't write this code)
Task: Review the diff for correctness and missed edge cases.
List every issue, even minor ones.

Stage: Test
Model: GPT-5.5
Task: Write tests for the edge cases found during review.
Don't just cover the happy path.
