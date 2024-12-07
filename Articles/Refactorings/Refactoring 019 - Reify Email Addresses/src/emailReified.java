public class EmailAddress {
    // 2. Create an `EmailAddress` class to encapsulate validation rules.
    private final String value;

    public EmailAddress(String value) {
        // The rules are in a single place
        // And all objects are created valid
        if (!value.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.value = value;
    }
}

public class Person {
    private final EmailAddress emailAddress;

    public Person(EmailAddress emailAddress) {
        // 1. Identify where email validation logic is duplicated.
        // 3. Refactor code to use the `Email Address`
        // class instead of raw strings.
        // No validation is required
        this.emailAddress = emailAddress;
    } 
}

public class JobApplication {
    private EmailAddress applicantEmailAddress;

    public JobApplication(EmailAddress applicantEmailAddress) {
        this.applicantEmailAddress = applicantEmailAddress;
    }
}
