package gr.aueb.cf.restaurantmanagement.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7).trim();

        try {
            username = jwtService.getUsernameFromToken(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (!jwtService.validateToken(jwt)) {
                    throw new BadCredentialsException("Invalid Token");
                }

                String role = jwtService.getRoleFromToken(jwt);
                GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                JwtAuthenticationToken authToken = new JwtAuthenticationToken(
                        username,
                        null,
                        Collections.singleton(authority)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (ExpiredJwtException e) {
            throw new AuthenticationCredentialsNotFoundException("Token has expired", e);
        } catch (JwtException | IllegalArgumentException e) {
            throw new BadCredentialsException("Invalid token", e);
        } catch (Exception e) {
            throw new AccessDeniedException("Token validation failed", e);
        }

        filterChain.doFilter(request, response);
    }
}
