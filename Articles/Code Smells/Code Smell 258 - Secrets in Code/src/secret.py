import requests

api_key = "LILAS_PASTIA"
response = requests.get("https://api.example.com", 
           headers={"Authorization": f"Bearer {api_key}"})