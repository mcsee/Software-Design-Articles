public class PasswordValidator {
    public static boolean isValidPassword(String password) {
        return password.matches(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        // This is a cryptic Regular Expression
    }
}