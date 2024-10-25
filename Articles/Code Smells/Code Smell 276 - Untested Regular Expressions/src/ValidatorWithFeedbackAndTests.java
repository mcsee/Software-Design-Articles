import java.util.ArrayList;
import java.util.List;

public class PasswordValidator {
    public static List<String> validatePassword(String password) {
        List<String> errors = new ArrayList<>();

        if (password.length() < 8) {
            errors.add(
                "Password must be at least 8 characters long.");
        }
        if (!password.matches(".*[A-Z].*")) {
            errors.add(
                "Password must contain at least one uppercase letter.");
        }
        if (!password.matches(".*[a-z].*")) {
            errors.add(
                "Password must contain at least one lowercase letter.");
        }
        if (!password.matches(".*\\d.*")) {
            errors.add(
                "Password must contain at least one digit.");
        }
        if (errors.isEmpty()) {
            errors.add(
                "Password is valid.");
        }
        return errors;
        // You no longer need a Regular Expression!!
    }
}

import static org.junit.Assert.*;
import org.junit.Test;

public class PasswordValidatorTest {
    // Now you have a lot of tests
    // You can use a Regular Expression,
    // a String Validator
    // an External Library
    // Whatever you want as long as it passes the tests!

    @Test
    public void testValidPassword() {
        List<String> result = 
            PasswordValidator.validatePassword(
            "StrongPass1");
        assertEquals("Password is valid.", result.get(0));
    }

    @Test
    public void testTooShortPassword() {
        List<String> result = PasswordValidator.validatePassword(
            "Short1");
        assertTrue(result.contains(
            "Password must be at least 8 characters long."));
    }

    @Test
    public void testNoUppercase() {
        List<String> result = PasswordValidator.validatePassword(
            "nouppercase1");
        assertTrue(
            result.contains(
                "Password must contain at least one uppercase letter."));
    }

    @Test
    public void testNoLowercase() {
        List<String> result = PasswordValidator.validatePassword(
            "NOLOWERCASE1");
        assertTrue(result.contains(
            "Password must contain at least one lowercase letter."));
    }

    @Test
    public void testNoNumber() {
        List<String> result = PasswordValidator.validatePassword(
            "NoNumberPass");
        assertTrue(result.contains(
            "Password must contain at least one digit."));
    }
}
