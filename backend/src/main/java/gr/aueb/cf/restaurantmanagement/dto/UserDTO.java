package gr.aueb.cf.restaurantmanagement.dto;

public record UserDTO(
        Long id,
        String username,
        String email,
        String role
) {}
