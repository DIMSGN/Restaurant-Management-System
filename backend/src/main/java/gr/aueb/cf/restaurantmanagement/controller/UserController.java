package gr.aueb.cf.restaurantmanagement.controller;

import gr.aueb.cf.restaurantmanagement.dto.UserDTO;
import gr.aueb.cf.restaurantmanagement.model.User;
import gr.aueb.cf.restaurantmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        log.info("Admin requested all users list");
        List<UserDTO> users = userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        log.info("Admin requested user with id={}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return ResponseEntity.ok(convertToDTO(user));
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> updateUserRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleRequest request) {
        
        log.info("Admin updating role for user id={} to role={}", id, request.role());
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        User.UserRole newRole;
        try {
            newRole = User.UserRole.valueOf(request.role().toUpperCase());
        } catch (IllegalArgumentException e) {
            log.error("Invalid role provided: {}", request.role());
            return ResponseEntity.badRequest().build();
        }

        user.setRole(newRole);
        User updatedUser = userRepository.save(user);
        
        log.info("Successfully updated user {} to role {}", user.getUsername(), newRole);
        return ResponseEntity.ok(convertToDTO(updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("Admin deleting user with id={}", id);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userRepository.delete(user);
        log.info("Successfully deleted user {}", user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/permissions/{role}")
    public ResponseEntity<PermissionsResponse> getPermissions(@PathVariable String role) {
        log.info("Requested permissions for role={}", role);
        
        User.UserRole userRole;
        try {
            userRole = User.UserRole.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        PermissionsResponse permissions = new PermissionsResponse(
                userRole.name(),
                getPermissionsForRole(userRole)
        );
        
        return ResponseEntity.ok(permissions);
    }

    private List<String> getPermissionsForRole(User.UserRole role) {
        return switch (role) {
            case ADMIN -> List.of(
                "Προβολή όλων των προϊόντων",
                "Δημιουργία νέων προϊόντων",
                "Επεξεργασία προϊόντων",
                "Διαγραφή προϊόντων",
                "Ενημέρωση stock",
                "Προβολή όλων των συνταγών",
                "Δημιουργία νέων συνταγών",
                "Επεξεργασία συνταγών",
                "Διαγραφή συνταγών",
                "Διαχείριση χρηστών",
                "Αλλαγή ρόλων χρηστών"
            );
            case WAITER -> List.of(
                "Προβολή όλων των προϊόντων (μόνο ανάγνωση)",
                "Προβολή όλων των συνταγών (μόνο ανάγνωση)",
                "Προβολή stock προϊόντων"
            );
        };
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public record UpdateRoleRequest(String role) {}
    
    public record PermissionsResponse(String role, List<String> permissions) {}
}
