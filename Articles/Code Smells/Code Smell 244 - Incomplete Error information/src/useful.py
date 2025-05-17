VALID_COLUMNS = ['name', 'gender', 'email']

def process_API_information(data):
  invalid_columns = [
    column for column in data.keys() if column not in VALID_COLUMNS
  ]
    
  if invalid_columns:
      raise ValueError(
          f"Invalid columns detected: {', '.join(invalid_columns)}"
      )  # Shows WHICH columns are invalid

data = {'name': 'John', 'gender': 'Pangender', 
      'age': 47, 'email': 'john@example.com'}
process_API_information(data)