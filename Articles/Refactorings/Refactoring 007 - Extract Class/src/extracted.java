// 1. Extract the methods (and accidentally the properties) coupled into a new concept      
   public class TelephoneNumber {
   
      private String number;
      private String areaCode;
   
      public String telephoneNumber() {
          return ("(" + areaCode + ") " + number);
      }
      public String areaCode() {
          return areaCode;
      }
      public String number() {
          return number;
      }
   }
   
final class Person {

      private String name;
  
      // 2. Use the new concept
      private TelephoneNumber officeTelephone = new TelephoneNumber();
      
      public String name() {
          return name;
      }
      public String telephoneNumber() {
          return officeTelephone.getTelephoneNumber();
      }
     
  }

