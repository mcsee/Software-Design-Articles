abstract class Vehicle {
    // 2. Create an abstract class
    // with shared behavior and no implementation
    abstract void drive();
    // 1. Identify common behaviors in both classes
    // 3. Move common logic to the abstract class
}

class Car extends Vehicle {
    // 4. Update subclasses to inherit from the abstract class
    void drive() {
        System.out.println("Driving a car");
    }
}

class Truck extends Vehicle {
    // 4. Update subclasses to inherit from the abstract class
    void drive() {
        System.out.println("Driving a truck");
        // Implementation is different than the car's
    }

    void load() {
        System.out.println("Loading cargo");
    }

    void unload() {
        System.out.println("Unloading cargo");
    }
}
