public class Car {
   protected int speed;
  
   public Car() {    
       this.speed = 0 km/h;
   }
    
   public void speed(Speed desiredSpeed) {
       this.speed = desiredSpeed;
   }   
}

// 1. Locate the setters usage
// (N/A) 2. If you are setting essential properties,
// move them to the constructor and remove the method
// 3. If you need to change an accidental property
// it is not a setter. Remove the setXXX prefix

Car tesla = new Car();
// The car is stopped

tesla.speed(100 km/h);
// You tell the desired speed. You don't set anything
// You don't care if the car stores its new speed.
// if it manages through the engine
// if the road is moving, etc