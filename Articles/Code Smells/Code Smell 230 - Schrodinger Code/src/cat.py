import threading

cats_alive = 0

def thread_1():
  cats_alive += 1

def thread_2():
  cats_alive -= 1

if cats_alive == 0:
  do_something()

# The value of cats_alive is indeterminate, 
# so the code can be in either of the two states:
#
# 1. cats_alive == 0 and feedThem() is called.
# 2. cats_alive != 0 and feedThem() is not called.
