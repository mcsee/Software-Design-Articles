# Code Smell 299 - Overloaded Test Setup

![Code Smell 299 - Overloaded Test Setup](Code%20Smell%20299%20-%20Overloaded%20Test%20Setup.jpg)

*When your test setup is bigger than the actual test*

> TL;DR: Bloated setup that's only partially used makes your tests more coupled and harder to understand.

# Problems 😔

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- [Readability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)
- Wasted execution time
- Misleading setup context
- Hidden test dependencies
- Harder maintenance
- Brittle test suite
- Confusing dependencies
- Slower execution
- Misleading context

# Solutions 😃

1. Create focused setup methods
2. Apply test-specific fixtures
3. Create minimal setups
4. Implement test factory methods

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# Context 💬

When you write tests, you might create a large setup method that initializes various objects

If only one test uses all these objects while other tests use just a small subset, you create unnecessary overhead.

This common issue happens when you expect that future tests might need an extensive setup, or when you keep adding to an existing setup without evaluating what's truly needed.

The tests are harder to understand since they contain irrelevant context, and slower to execute because you initialize objects that aren't used.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/1848c98ee95f64ea5029ccf6ee72c303) -->

```java
public class TVSeriesTest {
  private MovieSeries theEternaut;
  private List<Character> characters;
  private List<Episode> episodes;
  private User user;
  private UserPreferences preferences;
  private RatingSystem ratingSystem;
  private StreamingService streamingService;
  private List<Review> reviews;
  
  @BeforeEach
  public void setUp() {
    // Create a complex movie series with many characters
    characters = new ArrayList<>();
    characters.add(new Character("Juan Salvo", "Richard Darin"));
    characters.add(new Character("Helen", "Carla Peterson")); 
    characters.add(new Character("Favalli", "Cesar Troncoso")); 
    
    // Create episodes
    episodes = new ArrayList<>();
    episodes.add(
      new Episode("The Snow", 2025, 121));
    episodes.add(
      new Episode("The Hands Strikes Back", 2027, 124)); 
    
    // Create user with preferences
    preferences = new UserPreferences();
    preferences.setPreferredGenre("Science Fiction");
    preferences.setPreferredLanguage("English");
    preferences.setSubtitlesEnabled(true);
    user = new User("JohnDoe", "john@example.com", preferences);
    
    // Create rating system with reviews
    ratingSystem = new RatingSystem(10);
    reviews = new ArrayList<>();
    reviews.add(
      new Review(user, "The Snow", 9, "Classic!"));
    reviews.add(
      new Review(user, "The Hands Strikes Back", 10, "Best one!"));
    ratingSystem.addReviews(reviews);
    
    // Create streaming service
    streamingService = new StreamingService("Netflix");
    streamingService.addMovieSeries("The Eternaut");
    
    // Finally, create the movie series with all components
    theEternaut = 
      new TVSeries("The Eternaut", characters, episodes);
    theEternaut.setRatingSystem(ratingSystem);
    theEternaut.setAvailableOn(streamingService);
    
    // This method is too long. That is another smell
  }
  
  @Test
  public void testTVSeriesRecommendation() {
    // This test uses almost everything from the setup
    RecommendationEngine engine = new RecommendationEngine();
    List<Episode> recommended =
      engine.recommendations(user, theEternaut);
    
    assertEquals(2, recommended.size());
    assertEquals("The Hands Strikes Back",
      recommended.get(0).title());
    // You are testing the recommendation Engine
    // This is not this object's responsibility
  }
  
  @Test
  public void testEpisodeCount() {
    // This test only needs the episodes count
    assertEquals(2, theEternaut.episodes().size());
  }
  
  @Test
  public void testCharacterLookup() {
    // This test only needs the characters
    // And not the rest of the setup
    Character juan = theEternaut.findCharacterByName("Juan Salvo");
    assertNotNull(juan);
    assertEquals("Juan Salvo", juan.actor());
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/8b7fd816c7843aebf28865ae1007c341) -->

```java
public class TVSeriesTest {
  // No shared setup
  
  @Test
  public void testRecommendation() {
    // Create only what's needed for this specific test
    // And move this test with the behavior
    TVSeries theEternaut = createTheEternautSeries();
    User homer = createUserWithPreferences();
    addReviewsForUser(theEternaut, homer);
    
    RecommendationEngine engine = new RecommendationEngine();
    List<Episode> recommended =
      engine.recommendations(homer, theEternaut);
    
    assertEquals(2, recommended.size());
    assertEquals("The Hands Strikes Back", 
      recommended.get(0).title());
  }
  
  @Test
  public void testEpisodeCount() {
    // Only create what's needed - just the episodes
    TVSeries theEternaut = new TVSeries("The Ethernaut");
    theEternaut.addEpisode(
      new Episode("The Snow", 2025, 121));
    theEternaut.addEpisode(
      new Episode("The Hands Strikes Back", 2027, 124)); 
    
    assertEquals(2, theEternaut.episodes().size());
  }
  
  @Test
  public void testCharacterLookup() {
    // Only create what's needed - just the characters
    TVSeries theEternaut = new TVSeries("The Eternaut");
    theEternaut.addCharacter(
      new Character("Juan Salvo", "Richard Darin"));
    theEternaut.addCharacter(
      new Character("Helen", "Carla Peterson")); 
    
    Character juan = theEternaut.findCharacterByName("Juan Salvo");
    assertNotNull(juan);
    assertEquals("Richard Darin", juan.actor());
  }
  
  // Helper methods for specific test setup needs
  private TVSeries createTheEternautTVSeries() {
    TVSeries series = new TVSeries("The Eternaut");
    series.addEpisode(
      new Episode("The Snow", 2025, 121));
    series.addEpisode(
      new Episode("The Hands Strikes Back", 2027, 124)); 
    return series;
  }
  
  private User createUserWithPreferences() {
    UserPreferences preferences = new UserPreferences();
    preferences.setPreferredGenre("Science Fiction");
    preferences.setPreferredLanguage("English");
    return new User("JohnDoe", "john@example.com", preferences);
  }
  
  private void addReviewsForUser(TVSeries series, User user) {
    RatingSystem ratingSystem = new RatingSystem(10);
    ratingSystem.addReview(
      new Review(user, "The Snow", 9, "Classic!"));
    ratingSystem.addReview(
      new Review(user, "The Hands Strikes Back", 10, "Best one!"));
    series.setRatingSystem(ratingSystem);
  }
}
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell by comparing what's set up in the setup methods against what's used in each test.

Look for tests that use less than 50% of the initialized objects.

Code coverage tools can help identify unused setup objects by showing which parts of the setup aren't executed by certain tests.

If you find yourself writing conditionals in the setup to create different contexts, it's a clear sign you need a test-specific setup instead.

# Tags 🏷️

- Testing

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Each test should reflect a specific real-world scenario.

Bloated setups break this clarity, making it hard to see what’s being tested and increasing the chance of errors.

This broken [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) makes tests harder to understand because you can't determine which aspects of the setup are critical for the test and which are just noise.

When a test fails, you'll spend more time investigating dependencies that might not be relevant to the failure.

The test becomes more brittle since changes to unused objects can still break tests if those objects participate in the setup process.

# AI Generation 🤖

AI code generators often create this smell when they generate comprehensive test fixtures that try to cover all possible scenarios.

They prioritize completeness over focus, resulting in bloated setup methods that initialize more objects than needed for individual tests.

# AI Detection 🥃

AI can detect this smell with simple instructions like "Optimize my test setup only to include what's needed for each test."

Modern AI tools can compare setup code against test method usage and suggest targeted refactorings, separating shared setup from test-specific setup.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Break the tests and the setup

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) | [ChatGPT](https://chat.openai.com/?q=Break+the+tests+and+the+setup%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) | [Claude](https://claude.ai/new?q=Break+the+tests+and+the+setup%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) | [Perplexity](https://www.perplexity.ai/?q=Break+the+tests+and+the+setup%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Break+the+tests+and+the+setup%3A+%60%60%60java%0D%0Apublic+class+TVSeriesTest+%7B%0D%0A++private+MovieSeries+theEternaut%3B%0D%0A++private+List%3CCharacter%3E+characters%3B%0D%0A++private+List%3CEpisode%3E+episodes%3B%0D%0A++private+User+user%3B%0D%0A++private+UserPreferences+preferences%3B%0D%0A++private+RatingSystem+ratingSystem%3B%0D%0A++private+StreamingService+streamingService%3B%0D%0A++private+List%3CReview%3E+reviews%3B%0D%0A++%0D%0A++%40BeforeEach%0D%0A++public+void+setUp%28%29+%7B%0D%0A++++%2F%2F+Create+a+complex+movie+series+with+many+characters%0D%0A++++characters+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++characters.add%28new+Character%28%22Juan+Salvo%22%2C+%22Richard+Darin%22%29%29%3B%0D%0A++++characters.add%28new+Character%28%22Helen%22%2C+%22Carla+Peterson%22%29%29%3B+%0D%0A++++characters.add%28new+Character%28%22Favalli%22%2C+%22Cesar+Troncoso%22%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+episodes%0D%0A++++episodes+%3D+new+ArrayList%3C%3E%28%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Snow%22%2C+2025%2C+121%29%29%3B%0D%0A++++episodes.add%28%0D%0A++++++new+Episode%28%22The+Hands+Strikes+Back%22%2C+2027%2C+124%29%29%3B+%0D%0A++++%0D%0A++++%2F%2F+Create+user+with+preferences%0D%0A++++preferences+%3D+new+UserPreferences%28%29%3B%0D%0A++++preferences.setPreferredGenre%28%22Science+Fiction%22%29%3B%0D%0A++++preferences.setPreferredLanguage%28%22English%22%29%3B%0D%0A++++preferences.setSubtitlesEnabled%28true%29%3B%0D%0A++++user+%3D+new+User%28%22JohnDoe%22%2C+%22john%40example.com%22%2C+preferences%29%3B%0D%0A++++%0D%0A++++%2F%2F+Create+rating+sys) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Overloaded test setups that initialize objects only needed by a few tests make your test suite harder to understand and maintain.

When you create focused setups that contain only what each test needs, you improve the clarity, speed, and reliability of your tests.

Remember that tests aim to document behavior through examples and [replace comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md).

Too much irrelevant context makes those examples less readable. Clean tests tell a clear story without unnecessary distractions.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md)

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

[Code Smell 203 - Irrelevant Test Information](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20203%20-%20Irrelevant%20Test%20Information/readme.md)

[Code Smell 254 - Mystery Guest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20254%20-%20Mystery%20Guest/readme.md)

[Code Smell 259 - Testing with External Resources](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20259%20-%20Testing%20with%20External%20Resources/readme.md)

[Code Smell 275 - Missing Test Wrong Path](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20275%20-%20Missing%20Test%20Wrong%20Path/readme.md)

# More Information 📕

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Marcin Simonides](https://unsplash.com/en/@cinusek) on [Unsplash](https://unsplash.com/en/fotos/sedan-blanco-en-carretera-durante-el-dia-GYZ9F3U1gBk)

* * *

> If you have to create a lot of structure before a test, maybe you’re testing through too many layers

_James Shore_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)