# Code Smell 242 - Zombie Feature Flags
            
![Code Smell 242 - Zombie Feature Flags](Code%20Smell%20242%20-%20Zombie%20Feature%20Flags.jpg)

*Feature flags are evil... and sometimes come back as zombies*

> TL;DR: Don't leave dead [unused code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md). Clean your flag mess.

# Problems 😔 

- [Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md)

- Maintainability

- Unnecessary complexity

# Solutions 😃

1. Clean up dead code

2. Set up a clear lifecycle for your Feature Flags

# Context 💬

[Feature flags](https://en.wikipedia.org/wiki/Feature_toggle) are often used to [toggle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md) certain functionalities or features on or off dynamically, allowing for controlled rollouts or [A/B testing](https://en.wikipedia.org/wiki/A/B_testing). 

However, if the code controlled by these flags becomes obsolete or is no longer needed, it can lead to dead code.

Dead code not only clutters the codebase, making it harder to understand and maintain, but it can also confuse developers.

It may give a false impression that certain functionalities are still active and supported when they are not. 

A notable example happened to the [Knight Capital Group](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/).

Old code left active under a feature flag alongside new code caused the system to send a massive volume of erroneous orders to the market. 

Within minutes, Knight Capital Group suffered losses of approximately $440 million, nearly bankrupting the firm. 

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ddc8429d93d44337a2721df438844c35) -->

```java
public class WeatherSimulation {
    private boolean isWeatherSimulationEnabled ; 
    // This feature flag controls weather simulation
  
    public WeatherSimulation() {
        Properties config = new Properties();
        FileInputStream fis = new FileInputStream(
          "config.properties")) {
            config.load(fis);
            isWeatherSimulationEnabled = Boolean.parseBoolean(
                config.getProperty(
                    "weatherSimulation.enabled", "false"));
            // The feature toggle is read from the file
            isWeatherSimulationEnabled = false;
        }
    }
   
    public void simulateWeather() {
        if (isWeatherSimulationEnabled) {
            // Code to simulate weather conditions
            // ...
            System.out.println("Simulating weather...");
        }
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ba73de8f56fa1b74e6d40fc9d3cb2266) -->

```java
public class WeatherSimulation {
  
  public WeatherSimulation() 
    Properties config = new Properties();
    FileInputStream fis =
      new FileInputStream("config.properties")) {
    config.load(fis);
    String weatherSimulationEnabledValue = 
      config.getProperty("weatherSimulation.enabled");
    if (weatherSimulationEnabledValue != null) {
      throw new IllegalStateException(
       "weatherSimulation.enabled property " + 
       "should not be present in configuration file.");
        // You follow the fail-fast principle. 
        // Feature is deprecated 
        // and users got a grace period notice
        // After that you should stop the execution              
        }
     }
  }
   
    public void simulateWeather() {
       // You remove the simulated code and simplify it
    }
}
```

# Detection 🔍

[X] Semi-Automatic 

You can use mutation testing and remove the potential dead code to see if your coverage net catches a defect.

# Tags 🏷️

- Bloaters

# Level 🔋

[X] Intermediate 

# AI Assistants

AI assistants don't usually add dead code or feature flags unless you tell them explicitly.

# Conclusion 🏁

You should regularly review and clean up feature flags and their associated code to remove any unnecessary or obsolete sections. 

This ensures that the code remains lean, understandable, and free from potential issues caused by dead code. 

Feature flags should be shortlived and the lifecycle must be supervised.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 09 - Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md)

[Code Smell 29 - Settings / Configs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md)

# More Information 📕

[A feature flag disaster](https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [the blowup](https://unsplash.com/@theblowup) on [Unsplash](https://unsplash.com/photos/person-in-white-dress-with-red-yellow-and-green-face-paint-km5_ZJThpMc)

* * *

> The software isn’t finished until the last user is dead.

_Sidney Markowitz_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)