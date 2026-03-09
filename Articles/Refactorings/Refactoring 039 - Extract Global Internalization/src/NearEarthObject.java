public class NearEarthObject {
    private double energy;
    private double probability;

    public String getStatusDescription() {
        int level = calculateTorinoLevel();
        String key = "LEVEL_" + level;
        // You are calling a global static function
        // This makes the object hard to test
        return GlobalTranslator.translate(key);
    }
}