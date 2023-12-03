def is_warm():
    # This is a fast api call to our thermometer
    response = requests.get("https://iot-device-api.example.com/current_temperature")
    temperature_data = response.json()
    
    return temperature_data.get('temperature', 0) > 25  
    
def is_weekend():
    # This function checks if today is a weekend based on a slow calendar API call
    response = requests.get("https://calendar-api.example.com/today")
    calendar_data = response.json()
    
    return calendar_data.get('day_of_week', '').lower() in ['saturday', 'sunday']

def is_sunny():
    # Very slow function to a low performant weather API call
    response = requests.get("https://weather-api.example.com/current")
    weather_data = response.json()
    
    return weather_data.get('weather', '') == 'sunny'
  
if is_warm() and is_weekend() and is_sunny():
    # the 3 conditions are evaluated in short circuit 
    # and sorted from fastest to slowest
    # for a fast exit
    print("Let's go outside!")
else:
    print("Stay at home.")