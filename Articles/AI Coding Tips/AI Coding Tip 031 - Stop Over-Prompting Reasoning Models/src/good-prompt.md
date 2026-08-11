Role: Senior backend engineer refactoring a payment module.
Objective: Extract the retry logic in PaymentGateway into its
own class.
Success criteria: Existing tests pass. Retry behavior stays
the same. No new public methods on PaymentGateway.
Constraints: Don't touch the database schema. Don't add new
dependencies.
Output format: A diff, followed by a two-sentence summary of
what moved.
Stopping rules: If a test needs new mocking infrastructure to
pass, stop and ask before adding it. Otherwise proceed without
confirming each file.
Effort: medium.
