package gr.aueb.cf.restaurantmanagement.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegisterRequest {

    @NotBlank(message = "Το username είναι υποχρεωτικό")
    @Size(min = 3, max = 50, message = "Το username πρέπει να έχει από 3 έως 50 χαρακτήρες")
    private String username;

    @Email(message = "Το email πρέπει να είναι έγκυρο")
    private String email;

    @NotBlank(message = "Το password είναι υποχρεωτικό")
    @Size(min = 8, message = "Το password πρέπει να έχει τουλάχιστον 8 χαρακτήρες")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{8,}$", message = "Το password πρέπει να έχει τουλάχιστον ένα γράμμα και ένα αριθμό")
    private String password;

    @NotBlank(message = "Η επιβεβαίωση password είναι υποχρεωτική")
    private String confirmPassword;

    @AssertTrue(message = "Τα passwords πρέπει να ταιριάζουν")
    public boolean isPasswordConfirmed() {
        if (password == null || confirmPassword == null) return false;
        return password.equals(confirmPassword);
    }
}
