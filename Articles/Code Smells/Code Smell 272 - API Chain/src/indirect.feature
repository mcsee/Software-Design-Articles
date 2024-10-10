Feature: Movie Management
  Scenario: Create a movie and verify
    When I send a POST request to "/movies" with the following data:
      | title     | director          | year |
      | Klendathu | Christopher Nolan | 2010 |
    When I send a GET request to "/movies/Klendathu"
    Then the response status should be 200
    And the response should contain:
      | title     | director          | year |
      | Klendathu | Christopher Nolan | 2010 | 