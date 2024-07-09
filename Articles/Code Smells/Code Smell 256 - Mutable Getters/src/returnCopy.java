public class Person {
    private List<String> hobbies;

    public Person(List<String> hobbies) {
        this.hobbies = new ArrayList<>(hobbies);
    }

    public List<String> hobbies() {
        // This returns a shallow copy
        // This is usually not a big performance issue
        return new ArrayList<>(hobbies);
    }
}
