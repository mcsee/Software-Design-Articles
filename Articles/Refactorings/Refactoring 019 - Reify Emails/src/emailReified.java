public class Email {
    // 2. Create an `Email` class to encapsulate validation rules.
    private final String value;

    public Email(String value) {
        // The rules are in a single place
        // And all objects are created valid
        if (!value.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.value = value;
    }
}

public class Person {
    private final Email email;

    public Person(Email email) {
        // 1. Identify where email validation logic is duplicated.
        // 3. Refactor code to use the `Email`
        // class instead of raw strings.
        // No validation is required
        this.email = email;
    } 
}

public class JobApplication {
    private Email applicantEmail;

    public JobApplication(Email applicantEmail) {
        this.applicantEmail = applicantEmail;
    }
}
