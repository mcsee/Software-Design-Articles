// Overengineered approach 
// with unnecessary factory and abstract layers
public abstract class PlanetCalculator {
    public abstract double calculateDarkMatter(double mass);
}

public class TransneptunianCalculator extends PlanetCalculator {
    @Override
    public double calculateDarkMatter(double mass) {
        // Complex, unnecessary steps for a simple calculation
        double gravitationalConstant = 6.67430e-11;
        double darkMatter = mass * gravitationalConstant * 0.25; 
        // Hypothetical calculation
        return darkMatter;
    }
}

public class PlanetCalculatorFactory {
    public static PlanetCalculator getCalculator(String type) {
        if ("Transneptunian".equals(type)) {
            return new TransneptunianCalculator();
        }
        throw new IllegalArgumentException("Unknown calculator type");
    }
}

// Usage
PlanetCalculator calculator = 
    PlanetCalculatorFactory.getCalculator("Transneptunian");
double darkMatter = calculator.calculateDarkMatter(1000);
