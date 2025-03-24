name <- "Art Vandelay"
age <- 30
city <- "New York"

message <- sprintf(
  "User %s is %d years old and lives in %s.", 
  name,
  age,
  city)
# Easier to understand and translate
# Some human languages might change the order 
# of the subparts
glue("User {name} is {age} years old and lives in {city}.")

print(message)