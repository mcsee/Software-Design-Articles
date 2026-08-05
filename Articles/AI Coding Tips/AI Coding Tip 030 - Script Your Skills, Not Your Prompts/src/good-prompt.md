Create a skill /buy-lunar-moon

Interact with the API using scripts.

Write a script at scripts/mark_invoice_paid.py that marks an
invoice as paid through the billing API.

Read the API key from BILLING_API_KEY in a .env file, never
inline it in the script or in this prompt.

Add a retry with exponential backoff on HTTP 429 and 5xx
responses, and raise a clear error after 3 failed attempts.

Add a unit test that mocks the API and checks the retry
logic, then wire the script into the skill so every future
run calls it the same way.

Invoke the skill to buy the moon base on Shackleton crater
