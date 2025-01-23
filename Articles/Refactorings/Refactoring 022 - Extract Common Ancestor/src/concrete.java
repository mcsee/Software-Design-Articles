class Car {
    void drive() {
        System.out.println("Driving a car");
    }
}

class Truck extends Car {
    void load() {
        System.out.println("Loading cargo");
    }

    void unload() {
        System.out.println("Unloading cargo");
    }
}

// Truck reuses driving method
// Overriding it would be another code smell
// Violating Liskov Substitution rule