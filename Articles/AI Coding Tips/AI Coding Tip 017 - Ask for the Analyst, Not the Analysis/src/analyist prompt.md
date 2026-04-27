I have a folder with multiple JSON files.
Each file represents one month of orders.

Each JSON has this structure:

{
  "month": "2024-07",
  "orders": [
    {
      "order_id": "ORD-001",
      "user": {
        "name": "Lio Messi",
        "country": "AR"
      },
      "items": [
        {
          "product_id": "PROD-7",
          "name": "Soccer Ball",
          "qty": 2,
          "unit_price": 49.99
        }
      ],
      "status": "completed",
      "created_at": "2022-12-18T12:30:00Z"
    }
  ]
}

Write a Python script that:
1. Reads all .json files from a given folder path
2. Filters orders from Q3 2024 (July, August, September)
3. Computes the total spent per user_id
   (sum of qty by unit_price for completed orders)
4. Prints users whose total exceeds $500, sorted descending
5. Exports the result to a CSV file named q3_top_users.csv

Use pathlib and the standard csv module. No dependencies.

# You describe the shape of the data, not the data itself.
# The AI writes a reliable, auditable, reusable program.
# You run it on your real files.