import random
import time

# Function without side effects
def increment_counter(counter):
    return counter + 1

# Function without side effects (but not deterministic)
def get_random_number():
    return random.randint(1, 100)

# Function without side effects (can also be injected)
def get_current_time(timesource):
    return timesource.time()