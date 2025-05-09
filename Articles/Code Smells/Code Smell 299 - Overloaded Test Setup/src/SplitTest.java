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