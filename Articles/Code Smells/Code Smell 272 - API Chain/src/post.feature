Feature: Movie Management
  Scenario: Create a movie and verify
    When I create a movie with the following details:
      | title      | director          | year |
      | Klendathu  | Christopher Nolan | 2010 |
    Then the movie "Klendathu" should exist in the system
    ## This is a low level existance postcondition
    ## Without relying on a GET request