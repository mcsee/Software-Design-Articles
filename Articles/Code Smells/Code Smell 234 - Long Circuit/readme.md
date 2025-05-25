# Code Smell 234 - Long Circuit
            
![Code Smell 234 - Long Circuit](Code%20Smell%20234%20-%20Long%20Circuit.jpg)

*Be smart (and lazy) with low performant conditions*

> TL;DR: Premature Optimization is Evil. Optimization is Good.

# Problems 😔 

- Low Performance

# Solutions 😃

1. Sort the conditions from faster to slower

# Context 💬

Readability is always essential and you should avoid premature optimization.

Non-premature optimization happens when you have actual evidence you can improve your code execution time without much readability penalizations.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ddef91c2fc31de6da80b8c5b244ff904) -->

```python
def is_warm():
    # This is a fast api call to your thermometer
    response = requests.get
        ("https://iot-device-api.example.com/current_temperature")
    temperature_data = response.json()
    
    return temperature_data.get('temperature', 0) > 25  
    
def is_weekend():
    # This function checks if today is a weekend
    # based on a slow calendar API call
    response = requests.get
        ("https://calendar-api.example.com/today")
    calendar_data = response.json()
    
    return calendar_data.get('day_of_week', '').lower() 
        in ['saturday', 'sunday']

def is_sunny():
    # Very slow function to a low performant weather API call
    response = requests.get
        ("https://weather-api.example.com/current")
    weather_data = response.json()
    
    return weather_data.get('weather', '') == 'sunny'

is_sunny_value = is_sunny()
is_warm_value = is_warm()
is_weekend_value = is_weekend()  
  
if is_sunny_value and is_warm_value and is_weekend_value:
    # the 3 conditions are always evaluated
    print("Let's go outside!")
else:
    print("Stay at home.")
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2d9bb0dcab1d80de01358e8259412cf4) -->

```python
if is_warm() and is_weekend() and is_sunny():
    # the 3 conditions are evaluated in short circuit 
    # and sorted from fastest to slowest
    # for a fast exit
    print("Let's go outside!")
else:
    print("Stay at home.")
```

# Detection 🔍

[X] Semi-Automatic 

You can detect slow calls using actual benchmarks.

Do not consider algorithm complexity since sometimes it is unrelated to actual data distribution. (for example, optimizing an array with a few elements).

# Tags 🏷️

- Performance

# Conclusion 🏁

Find bottlenecks using Pareto rules. 

Optimize your code-critical sections.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 140 - Short Circuit Evaluation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20140%20-%20Short%20Circuit%20Evaluation/readme.md)

[Code Smell 145 - Short Circuit Hack](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20145%20-%20Short%20Circuit%20Hack/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Nick Abrams](https://unsplash.com/@nbabrams) on [Unsplash](https://unsplash.com/photos/brown-tortoise-on-brown-sand-FTKfX3xZIcc)
    
* * *

> The key to performance is elegance, not battalions of special cases.

_Jon Bentley and Douglas McIlroy_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)