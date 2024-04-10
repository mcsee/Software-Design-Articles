class CreditCard {
  private String number;
  private MonthOfYear expiryDate;
  // expiryDate is the role
  // MonthOfYear is the type
}

class MonthOfYear {
  private Month month;  
  private Year year;
  // These are other small objects

  public MonthOfYear(Month month, Year year) {
    // You don't need to add validations since 
    // month is a valid month
    // year is a valid year
    this.month = month;
    this.year = year;
  } 
  
 public boolean isBeforeEndOfMonth(Date date) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    return calendar.get(Calendar.DAY_OF_MONTH) <= getDaysInMonth();
  }
  
  // This protocol is just for MonthOfYears  
  public Day[] getDaysInMonth() { }
  
  public boolean isLeapYear() { } // ...
  
  public void iterateDays() { } // ...
  
}