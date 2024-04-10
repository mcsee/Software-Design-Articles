# Global mutable variable
counter = 0

# Function with side effect
def increment_counter():
    global counter
    counter += 1
    return counter

# Function with implicit dependency and non-deterministic
def get_random_number():
    import random
    return random.randint(1, 100)

# Function with non-deterministic behavior
def get_current_time():
    import time
    return time.time()