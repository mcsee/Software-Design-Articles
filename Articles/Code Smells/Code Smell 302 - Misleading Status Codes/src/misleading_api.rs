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