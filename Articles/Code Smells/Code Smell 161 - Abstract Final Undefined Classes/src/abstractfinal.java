abstract public class Vehicle
{
  // class is not a leaf. Therefore it is be abstract  
 
  //an abstract method that only declares, but does not define the start 
  //functionality because each vehicle uses a different starting mechanism
  abstract void start();
}

final public class Car extends Vehicle
{
  // class is leaf. Therefore it is final
}

final public class Motorcycle extends Vehicle
{
  // class is leaf. Therefore it is final
}