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