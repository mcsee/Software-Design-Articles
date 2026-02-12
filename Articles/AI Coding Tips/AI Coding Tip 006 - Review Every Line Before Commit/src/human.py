from typing import Optional
import sqlite3

class DatabaseManager:
  def __init__(self, db_path: str):
    self.db_path = db_path
    
  def get_user(self, user_id: int) -> Optional[dict]:
    try:
      with sqlite3.connect(self.db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        return dict(row) if row else None
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return None
 
db = DatabaseManager("app.db")
user = db.get_user(123)