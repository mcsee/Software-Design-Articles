# Code Smell 306 - AI External Comments

![Code Smell 306 - AI External Comments](Code%20Smell%20306%20-%20AI%20External%20Comments.jpg)

*New tech, new smells – Your future job won’t be writing code but understanding and fixing code, often written by AI*

> TL;DR: You reference external AI conversations to explain code instead of writing declarative tests

# Problems 😔

- [Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)
- External dependencies
- [Broken links](https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90)
- Unverified behavior
- Knowledge fragmentation
- Maintenance burden
- Lost context
- [Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)
- Misleading explanation  

# Solutions 😃

1. Write [executable tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)
2. Remove external references
3. Do not blindly trust the AI
4. Describe with inline examples  
5. Keep tests local 
6. Remove [all comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)
7. Replace [Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md) with constants.

# Refactorings ⚙️

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# Context 💬

If you add comments that reference external AI conversations, Stack Overflow posts, or online resources to explain how your functions work, you are not thinking about your reader.

These references create dangerous external dependencies that break over time. 

Links become dead, conversations get deleted, and future maintainers cannot access the context they need to understand your code. 

When you rely on external AI advice instead of writing proper tests, you create code that appears documented but lacks verification and local understanding.

The moment you rely on an external AI chat to explain what your code does, you make your codebase dependent on a conversation that might disappear, change, or get outdated.  

A unit test is more effective than any link. It defines what the code does and what you expect it to do. No need to click or guess.  

Comments and documentation often lie. Code never does.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/678984d90ee84b3657ea1f9f26b7ae6e) -->

```python
def calculate_starship_trajectory(initial_velocity, fuel_mass, 
                                burn_rate, gravity=9.81):
    """
        
    See explanation at
    https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
         
    """
    # AI suggested this approach
    burn_time = fuel_mass / burn_rate
    
    # Physics formula from Claude conversation
    # https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
    delta_v = gravity * burn_time * 0.85  
    # 0.85 explanation 
    # https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
    final_velocity = initial_velocity + delta_v
    
    # Return format suggested by GPT 
    return {
        'burn_time': burn_time,
        'final_velocity': final_velocity,
        'delta_v': delta_v
    }

def calculate_orbit_insertion(velocity, altitude):
    """
       
    Algorithm explanation available at:
    https://claude.ai/chat/orbit-insertion-help-session
    """
    # See AI conversation for why we use this formula
    orbital_velocity = (velocity * 1.1) + (altitude * 0.002)
    return orbital_velocity
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/71def0bc5f1d4d71760872814e0fc850) -->

```python
def calculate_starship_trajectory(initial_velocity, fuel_mass, 
                                burn_rate, gravity=9.81):
  
    THRUST_EFFICIENCY = 0.85
    
    burn_time = fuel_mass / burn_rate
    delta_v = gravity * burn_time * THRUST_EFFICIENCY
    # You replace the magic number
    final_velocity = initial_velocity + delta_v
    
    return {
        'burn_time': burn_time,
        'final_velocity': final_velocity,
        'delta_v': delta_v
    }

def calculate_orbit_insertion(velocity, altitude):
    """Calculate orbit insertion velocity."""
    
    VELOCITY_BOOST_FACTOR = 1.1
    ALTITUDE_ADJUSTMENT_RATE = 0.002

    orbital_velocity = (velocity * VELOCITY_BOOST_FACTOR) +
      (altitude * ALTITUDE_ADJUSTMENT_RATE)
    return orbital_velocity    

import unittest
from starship_trajectory_calculator import (
    calculate_starship_trajectory, calculate_orbit_insertion
)

class TestStarshipTrajectoryCalculator(unittest.TestCase):
    
    def test_basic_trajectory_calculation(self):
        result = calculate_starship_trajectory(100, 1000, 10)
        
        self.assertEqual(result['burn_time'], 100.0)
        self.assertEqual(result['delta_v'], 833.85)
        self.assertEqual(result['final_velocity'], 933.85)
    
    def test_zero_fuel_scenario(self):
        result = calculate_starship_trajectory(200, 0, 10)
        
        self.assertEqual(result['burn_time'], 0.0)
        self.assertEqual(result['delta_v'], 0.0)
        self.assertEqual(result['final_velocity'], 200.0)
    
    def test_high_burn_rate(self):
        result = calculate_starship_trajectory(150, 500, 100)
        
        self.assertEqual(result['burn_time'], 5.0)
        self.assertAlmostEqual(result['delta_v'], 41.69, places=2)
        self.assertAlmostEqual(result['final_velocity'], 191.69, 
                             places=2)
    
    def test_custom_gravity(self):
        result = calculate_starship_trajectory(100, 600, 20, 
                                             gravity=3.71)  # Mars
        
        self.assertEqual(result['burn_time'], 30.0)
        self.assertAlmostEqual(result['delta_v'], 94.76, places=2)
        self.assertAlmostEqual(result['final_velocity'], 194.76, 
                             places=2)
    
    def test_orbit_insertion_basic(self):
        orbital_velocity = calculate_orbit_insertion(7800, 400000)
        
        self.assertEqual(orbital_velocity, 9380.0)
    
    def test_orbit_insertion_low_altitude(self):
        orbital_velocity = calculate_orbit_insertion(7500, 200000)
        
        self.assertEqual(orbital_velocity, 8650.0)
    
    def test_orbit_insertion_zero_altitude(self):
        orbital_velocity = calculate_orbit_insertion(8000, 0)
        
        self.assertEqual(orbital_velocity, 8800.0)
```

# Detection 🔍

[X] Automatic 

You can detect this smell by searching for comments containing URLs to AI chat platforms, external forums, or references to "AI suggested" or "according to conversation". 

Look for functions that have detailed external references but lack corresponding unit tests.

# Exceptions 🛑

Academic or research code might legitimately reference published papers or established algorithms. 

However, these should point to stable, citable sources and permanent links rather than ephemeral AI conversations, and should still include comprehensive tests.

# Tags 🏷️

- Comments

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

In the real world, you don't rely on external authorities to validate your understanding of critical processes.

You develop internal knowledge and verification systems. 

Your code should reflect this reality by containing all necessary understanding within itself through tests and clear implementation. 

When you break this [correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by depending on external AI conversations, you create fragile knowledge that disappears when links break or platforms change, leaving future maintainers without the context they need.

Links are not behavior.

Tests are.

# AI Generation 🤖

AI generators sometimes create this smell because they frequently suggest adding references to the conversation or external sources where the solution was previously discussed. 

They tend to generate excessive comments that point back to their explanations rather than creating self-contained, testable code.

# AI Detection 🧲

AI can detect this smell when you ask it to identify external references in comments, especially URLs pointing to AI chat platforms. 

Most AI tools can help convert the external explanations into proper unit tests when given clear instructions.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace this external reference and comments with coverage and unit tests

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+this+external+reference+and+comments+with+coverage+and+unit+tests%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+this+external+reference+and+comments+with+coverage+and+unit+tests%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+this+external+reference+and+comments+with+coverage+and+unit+tests%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+this+external+reference+and+comments+with+coverage+and+unit+tests%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+this+external+reference+and+comments+with+coverage+and+unit+tests%3A+%60%60%60python%0D%0Adef+calculate_starship_trajectory%28initial_velocity%2C+fuel_mass%2C+%0D%0A++++++++++++++++++++++++++++++++burn_rate%2C+gravity%3D9.81%29%3A%0D%0A++++%22%22%22%0D%0A++++++++%0D%0A++++See+explanation+at%0D%0A++++https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A+++++++++%0D%0A++++%22%22%22%0D%0A++++%23+AI+suggested+this+approach%0D%0A++++burn_time+%3D+fuel_mass+%2F+burn_rate%0D%0A++++%0D%0A++++%23+Physics+formula+from+Claude+conversation%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++delta_v+%3D+gravity+%2A+burn_time+%2A+0.85++%0D%0A++++%23+0.85+explanation+%0D%0A++++%23+https%3A%2F%2Fclaude.ai%2Fshare%2F5769fdd1-46e3-40f4-b9c6-49efbee93b90%0D%0A++++final_velocity+%3D+initial_velocity+%2B+delta_v%0D%0A++++%0D%0A++++%23+Return+format+suggested+by+GPT+%0D%0A++++return+%7B%0D%0A++++++++%27burn_time%27%3A+burn_time%2C%0D%0A++++++++%27final_velocity%27%3A+final_velocity%2C%0D%0A++++++++%27delta_v%27%3A+delta_v%0D%0A++++%7D%0D%0A%0D%0Adef+calculate_orbit_insertion%28velocity%2C+altitude%29%3A%0D%0A++++%22%22%22%0D%0A+++++++%0D%0A++++Algorithm+explanation+available+at%3A%0D%0A++++https%3A%2F%2Fclaude.ai%2Fchat%2Forbit-insertion-help-session%0D%0A++++%22%22%22%0D%0A++++%23+See+AI+conversation+for+why+we+use+this+formula%0D%0A++++orbital_velocity+%3D+%28velocity+%2A+1.1%29+%2B+%28altitude+%2A+0.002%29%0D%0A++++return+orbital_velocity%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

External references to AI conversations create fragile documentation that breaks over time and fragments your codebase's knowledge. 

You should replace these external dependencies with self-contained unit tests that both document and verify behavior locally, ensuring your code remains understandable and maintainable without relying on external resources.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)
 
[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

[Code Smell 259 - Testing with External Resources](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20259%20-%20Testing%20with%20External%20Resources/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [julien Tromeur](https://unsplash.com/@julientromeur) on [Unsplash](https://unsplash.com/photos/a-white-toy-with-a-black-nose-6UDansS-rPI)
        
* * *

> The best documentation is code that doesn't need documentation

_Steve McConnell_
  
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)