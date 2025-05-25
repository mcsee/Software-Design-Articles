# Code Smell 203 - Irrelevant Test Information
            
![Code Smell 203 - Irrelevant Test Information](Code%20Smell%20203%20-%20Irrelevant%20Test%20Information.jpg)

*Irrelevant data distract the reader's attention*

> TL;DR: Don't add unnecessary information to your assertions

# Problems 😔 

- Readability 

- Maintainability

# Solutions 😃

1. Remove irrelevant data 

2. Leave only the needed assertions

# Context 💬

Tests should be minimal and follow the SetUp/Exercise/Assert pattern

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/913c97719a02e75721ea53d8e4e674c7) -->

```python
def test_formula_1_race():
    # Setup
    racers = [
        {"name": "Lewis Hamilton", 
         "team": "Mercedes", 
         "starting_position": 1, 
         "car_color": "Silver", 
         "car_model": "W12"},
        {"name": "Max Verstappen", 
         "team": "Red Bull",
         "starting_position": 2,
         "car_color": "Red Bull", 
         "car_model": "RB16B"},
        {"name": "Sergio Perez",
         "team": "Red Bull", 
         "starting_position": 3, 
         "car_color": "Red Bull", 
         "car_model": "RB16B"},
        {"name": "Lando Norris",
         "team": "McLaren", "starting_position": 4,
         "car_color": "Papaya Orange",
         "car_model": "MCL35M"},
        {"name": "Valtteri Bottas", 
         "team": "Mercedes", 
         "starting_position": 5, 
         "car_color": "Silver",
         "car_model": "W12"},
    ]

    # Exercise
    winner = simulate_formula_1_race(racers)

    # Test
    assert winner == "Lewis Hamilton"
    
    # This is all irrelevant to winner asserting
    assert racers[0]["car_color"] == "Silver"
    assert racers[1]["car_color"] == "Red Bull"
    assert racers[2]["car_color"] == "Red Bull"
    assert racers[3]["car_color"] == "Papaya Orange"
    assert racers[4]["car_color"] == "Silver"
    assert racers[0]["car_model"] == "W12"
    assert racers[1]["car_model"] == "RB16B"
    assert racers[2]["car_model"] == "RB16B"
    assert racers[3]["car_model"] == "MCL35M"
    assert racers[4]["car_model"] == "W12"
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ce5da0101b5e9eb72af22c12d6338f6a) -->

```python
def test_formula_1_race():
    # Setup
    racers = [
        {"name": "Lewis Hamilton", "starting_position": 1},
        {"name": "Max Verstappen", "starting_position": 2},
        {"name": "Sergio Perez", "starting_position": 3},
        {"name": "Lando Norris", "starting_position": 4},
        {"name": "Valtteri Bottas" "starting_position": 5},
    ]

    # Exercise
    winner = simulate_formula_1_race(racers)

    # Test
    assert winner == "Lewis Hamilton"
```

# Detection 🔍

[X] Semi-Automatic 

We can find some patterns in not needed assertions.

# Tags 🏷️

- Testing

# Conclusion 🏁

Tests should be prose. Always focus on the reader. It might be you a couple of months from now.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 76 - Generic Assertions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2076%20-%20Generic%20Assertions/readme.md)

# More Information 📕

[xUnit Test Patterns: Refactoring Test Code](https://amzn.to/40z6atJ)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Evan Demicoli](https://unsplash.com/@evandemicoli) on [Unsplash](https://unsplash.com/photos/HGCqL-tRcac)
    
* * *

> Take reasonable steps to test, document, and otherwise draw attention to the assumptions made in every module and routine.

_Daniel Read_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)