import threading

lock = threading.Lock()
cats_alive = 0

def thread_1():
  with lock:
    cats_alive += 1

def thread_2():
  with lock:
    cats_alive -= 1

if cats_alive == 0:
  feedThem()

# With the lock, the two threads cannot access 
# the `cats_alive` variable at the same time.
# This means that the value of `cats_alive` is always determined, 
# and the program will not exhibit Schrödinger code behavior.
