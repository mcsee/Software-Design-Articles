public class MutableExample {
  public static void main(String[] args) {
    List<Integer> numbers = List.of(1, 2, 3);
    List<Integer> otherNumbers = numbers; // Aliasing
    otherNumbers.add(4);
    System.out.println(numbers); // Output: [1, 2, 3, 4]
  }
}