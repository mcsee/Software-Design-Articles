// File: Translator.java
// Step 2: Create a domain interface

public interface Translator {
    String translate(String key);
}

// File: NearEarthObject.java
public class NearEarthObject {
    private double energy;
    private double probability;

    // Step 3: Accept the interface as a parameter
    public String getStatusDescription(Translator translator) {
        int level = calculateTorinoLevel();
        String key = "LEVEL_" + level;
        // Step 4: Replace the global call with the parameter
        return translator.translate(key);
    }
}
