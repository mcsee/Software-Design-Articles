public class ImmutablePerson {
  private final String name; 

  public ImmutablePerson(String name) {
    this.name = name; 
  } 
}

public ImmutablePerson withName(String newName) {
    return new ImmutablePerson(newName);
}

public static void main(String[] args) {
  ImmutablePerson p1 = new ImmutablePerson("Newman");
  ImmutablePerson p2 = p1; // p1 and p2 refer to the same object

  // Modifying p1 creates a new object
  ImmutablePerson p3 = p1.withName("Cosmo Kramer");
  // but this is a bad practice 
  // since only constructors should create new objects
  // A better option is
  ImmutablePerson p3 = new ImmutablePerson("Cosmo Kramer");

  System.out.println(p1.name()); // Output: Newman
  System.out.println(p2.name()); // Output: Newman
  System.out.println(p3.name()); // Output: Cosmo Kramer
}