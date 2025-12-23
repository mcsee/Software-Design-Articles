# Code Smell 302 - Misleading Status Codes

![Code Smell 302 - Misleading Status Codes](Code%20Smell%20302%20-%20Misleading%20Status%20Codes.jpeg)

*When your API says "Everything is fine!" but returns errors*

> TL;DR: Returning a successful HTTP status when the actual result contains an error confuses the API consumers. 

# Problems 😔

- Status code confusion
- Debugging difficulty
- Client error handling
- API contract violation
- Human text parsing instead of code checking
- Inconsistent behavior
- The Least surprise principle violation

# Solutions 😃

1. Match status to content
2. Use proper error codes
3. Follow HTTP standards
4. Implement consistent responses
5. Test status codes
6. Separate metadata from payload
7. Avoid mixing [success and errors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)
8. Define a clear [contract](https://www.eiffel.com/values/design-by-contract/)

# Context 💬

You build an API that processes requests successfully at the HTTP transport level but encounters application-level errors.

Instead of returning appropriate HTTP error status codes such as 400 (Bad Request) or 500 (Internal Server Error), you return 200 OK with error information in the response body.

This creates a disconnect between what the HTTP status indicates and what happened, making it harder for clients to handle errors properly and for monitoring systems to detect issues.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/e64ea5a60fd91f56ca9feaa0b64c4db6) -->

```rust
use axum::{
  http::StatusCode,
  response::Json,
  routing::post,
  Router,
};
use serde_json::{json, Value};

async fn process_payment(
  Json(payload): Json<Value>
) -> (StatusCode, Json<Value>) {
  let amount = payload.get("amount")
    .and_then(|v| v.as_f64());
  
  if amount.is_none() || amount.unwrap() <= 0.0 {
    return (
      StatusCode::OK, // Wrong: returning 200 for error
      Json(json!({"error": true, "message": "Invalid amount"}))
    );
  }
  
  if amount.unwrap() > 10000.0 {
    return (
      StatusCode::OK, // Wrong: returning 200 for error 
      Json(json!({"error": true, "message": "Amount too large"}))
    );
  }
  
  // Simulate processing error
  if let Some(card) = payload.get("card_number") {
    if card.as_str().unwrap_or("").len() < 16 {
      return (
        StatusCode::OK, // Wrong: returning 200 for error
        Json(json!({"error": true, "message": "Invalid card"}))
      );
    }
  }
  
  (
    StatusCode::OK, // THIS the only real 200 Status
    Json(json!({"success": true, "transaction_id": "12345"}))
  )
}

pub fn create_router() -> Router {
  Router::new().route("/payment", post(process_payment))
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c4607080a7bd7abfd1ceeaed75aacab4) -->

```rust
use axum::{
  http::StatusCode,
  response::Json,
  routing::post,
  Router,
};
use serde_json::{json, Value};

async fn process_payment(
  Json(payload): Json<Value>
) -> (StatusCode, Json<Value>) {
  let amount = payload.get("amount")
    .and_then(|v| v.as_f64());
  
  if amount.is_none() || amount.unwrap() <= 0.0 {
    return (
      StatusCode::BAD_REQUEST, // Correct: 400 for bad input
      Json(json!({"error": "Invalid amount provided"}))
    );
  }
  
  if amount.unwrap() > 10000.0 {
    return (
      StatusCode::UNPROCESSABLE_ENTITY, 
      // Correct: 422 for business rule
      Json(json!({"error": "Amount exceeds transaction limit"}))
    );
  }
  
  // Validate card number
  if let Some(card) = payload.get("card_number") {
    if card.as_str().unwrap_or("").len() < 16 {
      return (
        StatusCode::BAD_REQUEST, 
        // Correct: 400 for validation error
        Json(json!({"error": "Invalid card number format"}))
      );
    }
  } else {
    return (
      StatusCode::BAD_REQUEST, 
      // Correct: 400 for missing field
      Json(json!({"error": "Card number is required"}))
    );
  }
  
  // successful processing
  (
    StatusCode::OK, 
    // Correct: 200 only for actual success
    Json(json!({"transaction_id": "12345", "status": "completed"}))
  )
}

pub fn create_router() -> Router {
  Router::new().route("/payment", post(process_payment))
}
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you see HTTP 200 responses that contain error fields, [boolean error flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20270%20-%20Boolean%20APIs/readme.md), or failure messages.

Look for APIs that always return 200 regardless of the actual outcome.

Check if your monitoring systems can properly detect failures and use mutation testing.

If they can't distinguish between success and failure based on status codes, you likely have this problem.

You can also watch client-side bugs caused by mismatched expectations.

# Exceptions 🛑

- Breaking Changes on existing API clients may require a breaking change to fix this smell.

# Tags 🏷️

- Exceptions

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

HTTP status codes exist to provide a standardized way to communicate the outcome of requests between *systems*.

When you break this correspondence by returning success codes for failures, you create a mismatch between the HTTP protocol's semantic meaning and your application's actual behavior.

This forces every client to parse response bodies to determine success or failure, making error handling inconsistent and unreliable.

Monitoring systems, load balancers, and proxies rely on status codes to make routing and health decisions - misleading codes can cause these systems to make incorrect assumptions about your API's health.

[Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) your decisions to an incorrect status code will break the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Modeling a one-to-one relationship between the HTTP status code and the actual business result ensures clarity and predictability. When a 200 OK returns an internal error, the client assumes everything is fine, leading to silent failures and incorrect behaviors downstream.

By maintaining this [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) , we ensure that developers and systems interacting with the API can trust the response without additional checks.

# AI Generation 🤖

AI code generators often create this smell when developers ask for "simple API examples" without specifying proper error handling.

The generators tend to focus on the happy path and return 200 for all responses to avoid complexity.

When you prompt AI to create REST APIs, you must explicitly request proper HTTP status code handling and verify the standards by yourself.

# AI Detection 🥃

Many AI assistants can detect this mismatch.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Correct bad HTTP codes behavior

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) | [ChatGPT](https://chat.openai.com/?q=Correct+bad+HTTP+codes+behavior%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) | [Claude](https://claude.ai/new?q=Correct+bad+HTTP+codes+behavior%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) | [Perplexity](https://www.perplexity.ai/?q=Correct+bad+HTTP+codes+behavior%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+bad+HTTP+codes+behavior%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) | [You](https://you.com/search?q=Correct+bad+HTTP+codes+behavior%3A+%60%60%60rust%0D%0Ause+axum%3A%3A%7B%0D%0A++http%3A%3AStatusCode%2C%0D%0A++response%3A%3AJson%2C%0D%0A++routing%3A%3Apost%2C%0D%0A++Router%2C%0D%0A%7D%3B%0D%0Ause+serde_json%3A%3A%7Bjson%2C+Value%7D%3B%0D%0A%0D%0Aasync+fn+process_payment%28%0D%0A++Json%28payload%29%3A+Json%3CValue%3E%0D%0A%29+-%3E+%28StatusCode%2C+Json%3CValue%3E%29+%7B%0D%0A++let+amount+%3D+payload.get%28%22amount%22%29%0D%0A++++.and_then%28%7Cv%7C+v.as_f64%28%29%29%3B%0D%0A++%0D%0A++if+amount.is_none%28%29+%7C%7C+amount.unwrap%28%29+%3C%3D+0.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+amount%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++if+amount.unwrap%28%29+%3E+10000.0+%7B%0D%0A++++return+%28%0D%0A++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error+%0D%0A++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Amount+too+large%22%7D%29%29%0D%0A++++%29%3B%0D%0A++%7D%0D%0A++%0D%0A++%2F%2F+Simulate+processing+error%0D%0A++if+let+Some%28card%29+%3D+payload.get%28%22card_number%22%29+%7B%0D%0A++++if+card.as_str%28%29.unwrap_or%28%22%22%29.len%28%29+%3C+16+%7B%0D%0A++++++return+%28%0D%0A++++++++StatusCode%3A%3AOK%2C+%2F%2F+Wrong%3A+returning+200+for+error%0D%0A++++++++Json%28json%21%28%7B%22error%22%3A+true%2C+%22message%22%3A+%22Invalid+card%22%7D%29%29%0D%0A++++++%29%3B%0D%0A++++%7D%0D%0A++%7D%0D%0A++%0D%0A++%28%0D%0A++++StatusCode%3A%3AOK%2C+%2F%2F+THIS+the+only+real+200+Status%0D%0A++++Json%28json%21%28%7B%22success%22%3A+true%2C+%22transaction_id%22%3A+%2212345%22%7D%29%29%0D%0A++%29%0D%0A%7D%0D%0A%0D%0Apub+fn+create_router%28%29+-%3E+Router+%7B%0D%0A++Router%3A%3Anew%28%29.route%28%22%2Fpayment%22%2C+post%28proces) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

HTTP status codes are an important part of API design that enable proper error handling, monitoring, and client behavior.

When you return misleading status codes, you break the implicit contract that HTTP provides making your API harder to integrate with and maintain.

Always ensure your status codes accurately reflect the actual outcome of the operation.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 270 - Boolean APIs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20270%20-%20Boolean%20APIs/readme.md)

[Code Smell 272 - API Chain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20272%20-%20API%20Chain/readme.md)

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

[Code Smell 244 - Incomplete Error information](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20244%20-%20Incomplete%20Error%20information/readme.md)

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

# More Information 📕

[Wikipedia HTTP Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> The best error message is the one that never shows up

_Thomas Fuchs_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)