public class Vehicle
{
  // class is not leaf. Therefore it should be abstract
  
  //variable that is used to declare the no. of wheels in a vehicle
  private int wheels;
  
  //Variable to define the type of motor used
  private Motor motor;
  
  //an abstract method that only declares, but does not define the start 
  //functionality because each vehicle uses a different starting mechanism
  abstract void start();
}

public class Car extends Vehicle
{
  // class is leaf. Therefore it should be final
}

public class Motorcycle extends Vehicle
{
  // class is leaf. Therefore it should be final
}