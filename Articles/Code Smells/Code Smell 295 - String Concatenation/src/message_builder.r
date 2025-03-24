name <- 'Art Vandelay'
age <- 30
city <- 'New York'

message <- paste0('User ', 
  name,
  ' is ',
  age,
  ' years old and lives in ', 
  city, 
  '.')

# Same problem
message <- "User 
  " %<% name %>
  " is " %<% age %>
  " years old and lives in "
  %<% city %> 
  "."

print(message)