import os
import requests

api_key = os.environ.get("API_KEY")
# This is just an example. Might also be not as secure

response = requests.get("https://api.example.com", 
           headers={"Authorization": f"Bearer {api_key}"})