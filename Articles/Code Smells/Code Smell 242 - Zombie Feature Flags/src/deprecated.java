public class WeatherSimulation {
  
  public WeatherSimulation() 
    Properties config = new Properties();
    FileInputStream fis =
      new FileInputStream("config.properties")) {
    config.load(fis);
    String weatherSimulationEnabledValue = 
      config.getProperty("weatherSimulation.enabled");
    if (weatherSimulationEnabledValue != null) {
      throw new IllegalStateException(
       "weatherSimulation.enabled property " + 
       "should not be present in configuration file.");
        // You follow the fail-fast principle. 
        // Feature is deprecated 
        // and users got a grace period notice
        // After that you should stop the execution              
        }
     }
  }
   
    public void simulateWeather() {
       // You remove the simulated code and simplify it
    }
}
