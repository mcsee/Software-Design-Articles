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