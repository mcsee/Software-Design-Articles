public class Person {
  private String name; 
}

public void modifyPerson(Person person) {
  person.setName("Cosmo Kramer");
}

public static void main(String[] args) {
  Person p1 = new Person("Newman");
  Person p2 = p1; // p1 and p2 refer to the same object

  modifyPerson(p1);

  System.out.println(p1.name()); // Output: Cosmo Kramer
  System.out.println(p2.name()); // Output: Cosmo Kramer (unexpected)
}