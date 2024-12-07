public class Person {
    private String emailAddress;
    // Primitive Obsession

    public void setEmailAddress(String emailAddress) {
        // Duplicated code
        if (!emailAddress.matches(
            "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.emailAddress = emailAddress;
    }
}

public class JobApplication {
    private String applicantEmailAddress;

    public void setApplicantEmailAddress(String emailAddress) {
        // Duplicated code
        if (!emailAddress.matches(
            "^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(
                "Invalid email address format");
        }
        this.applicantEmailAddress = emailAddress;
    }
}