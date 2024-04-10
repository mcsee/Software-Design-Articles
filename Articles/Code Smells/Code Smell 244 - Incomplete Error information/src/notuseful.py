VALID_COLUMNS = ['name', 'gender', 'email']

def process_API_information(data):
    invalid_columns = []
    for column in data.keys():
        if column not in VALID_COLUMNS:
            invalid_columns.append(column)
    
    assert not invalid_columns, "Invalid columns detected."  
    # No details were provided about which columns are invalid
     
 
data = {'name': 'John', 'gender': 'Pangender', 
        'age': 47, 'email': 'john@example.com'}
process_API_information(data)