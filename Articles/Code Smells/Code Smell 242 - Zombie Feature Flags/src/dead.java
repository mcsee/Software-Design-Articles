public class WeatherSimulation {
    private boolean isWeatherSimulationEnabled ; 
    // This feature flag controls weather simulation
  
    public WeatherSimulation() {
        Properties config = new Properties();
        FileInputStream fis = new FileInputStream(
          "config.properties")) {
            config.load(fis);
            isWeatherSimulationEnabled = Boolean.parseBoolean(
                config.getProperty(
                    "weatherSimulation.enabled", "false"));
            // The feature toggle is read from the file
            isWeatherSimulationEnabled = false;
        }
    }
   
    public void simulateWeather() {
        if (isWeatherSimulationEnabled) {
            // Code to simulate weather conditions
            // ...
            System.out.println("Simulating weather...");
        }
    }
}
