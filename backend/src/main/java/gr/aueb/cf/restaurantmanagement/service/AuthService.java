package gr.aueb.cf.restaurantmanagement.service;

import gr.aueb.cf.restaurantmanagement.dto.UserLoginRequest;
import gr.aueb.cf.restaurantmanagement.dto.UserRegisterRequest;
import gr.aueb.cf.restaurantmanagement.dto.AuthResponse;
import gr.aueb.cf.restaurantmanagement.exception.InvalidCredentialsException;
import gr.aueb.cf.restaurantmanagement.exception.ResourceAlreadyExistsException;
import gr.aueb.cf.restaurantmanagement.model.User;
import gr.aueb.cf.restaurantmanagement.repository.UserRepository;
import gr.aueb.cf.restaurantmanagement.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ResourceAlreadyExistsException("Registration failed");
        }

        if (request.getEmail() != null && !request.getEmail().isBlank() 
                && userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Registration failed");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.UserRole.WAITER);

        userRepository.save(user);
        String token = jwtService.generateToken(user.getUsername(), user.getRole().toString());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        return new AuthResponse(token, refreshToken, "User registered successfully");
    }

    public AuthResponse login(UserLoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user.getUsername(), user.getRole().toString());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        return new AuthResponse(token, refreshToken, "Login successful");
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtService.validateToken(refreshToken)) {
            throw new InvalidCredentialsException("Invalid or expired refresh token");
        }

        String username = jwtService.getUsernameFromToken(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        String newAccessToken = jwtService.generateToken(user.getUsername(), user.getRole().toString());

        return new AuthResponse(newAccessToken, refreshToken, "Token refreshed successfully");
    }
}
