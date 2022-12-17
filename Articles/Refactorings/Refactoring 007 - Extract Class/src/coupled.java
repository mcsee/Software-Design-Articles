 final class Person {
 
      private String name;
   
      // Below cohesive properties
      private String homeAreaCode;
      private String homeNumber;
      
      public String name() {
          return name;
      }
   
      // Below cohesive behavior
      public String telephoneNumber() {
          return ("(" + homeAreaCode + ") " + homeNumber);
      }
      String areaCode() {
          return homeAreaCode;
      }
      String officeNumber() {
          return officeNumber;
      } 
 }
 