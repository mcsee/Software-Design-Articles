// Simpler approach, without unnecessary factories and abstractions
public class DarkMatterCalculator {
    public double calculateDarkMatter(double mass) {
        return mass * 6.67430e-11 * 0.25; // Hypothetical calculation
    }
}

// Usage
DarkMatterCalculator calculator = new DarkMatterCalculator();
double darkMatter = calculator.calculateDarkMatter(1000);