# Code Smell 226 - Mixed Priorities
            
![Code Smell 226 - Mixed Priorities](Code%20Smell%20226%20-%20Mixed%20Priorities.jpg)

*Another crashed spacecraft. Another software problem*

> TL;DR: Design and test the software. It is cheaper than the hardware

# Problems 😔 

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Unexpected Defects

# Solutions 😃

1. Create accurate simulations

2. Make [fault-tolerant](https://en.wikipedia.org/wiki/Fault_tolerance) software

# Context 💬

[Luna-25](https://en.wikipedia.org/wiki/Luna_25) crashed on the moon's surface on August 19, 2023. 

4 days before India's [Chandrayaan-3](https://en.wikipedia.org/wiki/Chandrayaan-3) soft landed on Moon's South Pole.

A [forensic analysis](https://t.me/roscosmos_gk/11053) revealed that the instructions shared a bus and were not prioritized correctly.

Spacecrafts have a [long history](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) of software faults.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/e828fb96c53f62f62b40dc70bc1b02ee) -->

```python
class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task, priority):
        self.tasks.append((task, priority))

    def execute_tasks(self):
        # No sorting

        for task, _ in self.tasks:
            task.execute()

class Task:
    def __init__(self, name):
        self.name = name

    def execute(self):
        print(f"Executing task: {self.name}")

task_manager = TaskManager()
highPriorityTask = Task("Slow down")
mediumPriorityTask = Task("Take Photos")
reviveKlaatu = Task("Klaatu barada nikto")

# unsorted
task_manager.add_task(mediumPriorityTask, 2)
task_manager.add_task(highPriorityTask, 1)
task_manager.add_task(reviveKlaatu, 3)

task_manager.execute_tasks()
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/eb49b855ffcefc372150228b9b9f0a70) -->

```python
class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task, priority):
        self.tasks.append((task, priority))

    def execute_tasks(self):
        # Sort tasks by priority (high to low)
        self.tasks.sort(key=lambda x: x[1], reverse=True)

        for task, _ in self.tasks:
            task.execute()

class Task:
    def __init__(self, name):
        self.name = name

    def execute(self):
        print(f"Executing task: {self.name}")

task_manager = TaskManager()
highPriorityTask = Task("Slow down")
mediumPriorityTask = Task("Take Photos")
reviveKlaatu = Task("Klaatu barada nikto")

# unsorted
task_manager.add_task(mediumPriorityTask, 2)
task_manager.add_task(highPriorityTask, 1)
task_manager.add_task(reviveKlaatu, 3)

task_manager.execute_tasks()
```

# Detection 🔍

[X] Manual

This is a design smell

# Tags 🏷️

- Testing

# Conclusion 🏁

Create software components and simulate real and not real conditions

# Relations 👩‍❤️‍💋‍👨

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

# More Information 📕

[Roscosmos Telegram](https://t.me/roscosmos_gk/11053)

[Asia Times](https://asiatimes.com/2023/08/luna-25-crash-lands-russia-china-space-ambitions/)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> The Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform� But it is likely to exert an indirect and reciprocal influence on science itself.

_Ada Lovelace_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)