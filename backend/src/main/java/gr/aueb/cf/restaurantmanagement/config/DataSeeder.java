package gr.aueb.cf.restaurantmanagement.config;

import gr.aueb.cf.restaurantmanagement.model.User;
import gr.aueb.cf.restaurantmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            log.info("Checking for seed data initialization...");

            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(User.UserRole.ADMIN);
                userRepository.save(admin);
                log.info("Created default ADMIN user: admin/admin123");
            } else {
                log.info("Admin user already exists, skipping creation");
            }

            if (!userRepository.existsByUsername("waiter")) {
                User waiter = new User();
                waiter.setUsername("waiter");
                waiter.setPassword(passwordEncoder.encode("waiter123"));
                waiter.setRole(User.UserRole.WAITER);
                userRepository.save(waiter);
                log.info("Created default WAITER user: waiter/waiter123");
            } else {
                log.info("Waiter user already exists, skipping creation");
            }

            log.info("Seed data initialization complete!");
        };
    }
}
