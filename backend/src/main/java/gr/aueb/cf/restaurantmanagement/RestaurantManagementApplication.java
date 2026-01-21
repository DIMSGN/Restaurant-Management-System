package gr.aueb.cf.restaurantmanagement;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Restaurant Management API",
                version = "1.0",
                description = "REST API για τη διαχείριση εστιατορίου - προϊόντα, συνταγές, πωλήσεις"
        )
)
@SecurityScheme(
        name = "bearer-jwt",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class RestaurantManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestaurantManagementApplication.class, args);
    }
}
