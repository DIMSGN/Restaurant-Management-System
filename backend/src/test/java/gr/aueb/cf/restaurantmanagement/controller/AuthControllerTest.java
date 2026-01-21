package gr.aueb.cf.restaurantmanagement.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.aueb.cf.restaurantmanagement.dto.AuthResponse;
import gr.aueb.cf.restaurantmanagement.dto.UserLoginRequest;
import gr.aueb.cf.restaurantmanagement.dto.UserRegisterRequest;
import gr.aueb.cf.restaurantmanagement.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @Test
    void register_shouldReturnCreated() throws Exception {
        UserRegisterRequest request = new UserRegisterRequest();
        request.setUsername("testuser");
        request.setPassword("password123");
        request.setEmail("test@example.com");

        AuthResponse response = new AuthResponse("dummy-token", "dummy-refresh-token", 
                "testuser", "test@example.com", "WAITER", "Registration successful");

        when(authService.register(any(UserRegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("dummy-token"));
    }

    @Test
    void login_shouldReturnOk() throws Exception {
        UserLoginRequest request = new UserLoginRequest();
        request.setUsername("admin");
        request.setPassword("admin123");

        AuthResponse response = new AuthResponse("valid-token", "valid-refresh-token",
                "admin", "admin@restaurant.com", "ADMIN", "Login successful");

        when(authService.login(any(UserLoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }
}
