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
// 3. If you need to change an accidental property
// it is not a setter. Remove the setXXX prefix

Car tesla = new Car();
// Our car is stopped

tesla.speed(100 km/h);
// We tell the desired speed. We don't set anything
// We don't care if the car stores its new speed.
// if it manages through the engine
// if the road is moving etc