public class Person {
    private String email;
    // Primitive Obsession

    public void setEmail(String email) {
        // Duplicated code
        if (!email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.email = email;
    }
}

public class JobApplication {
    private String applicantEmail;

    public void setApplicantEmail(String email) {
        // Duplicated code
        if (!email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.applicantEmail = email;
    }
}