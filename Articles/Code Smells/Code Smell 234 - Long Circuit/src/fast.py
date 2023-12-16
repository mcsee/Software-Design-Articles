if is_warm() and is_weekend() and is_sunny():
    # the 3 conditions are evaluated in short circuit 
    # and sorted from fastest to slowest
    # for a fast exit
    print("Let's go outside!")
else:
    print("Stay at home.")