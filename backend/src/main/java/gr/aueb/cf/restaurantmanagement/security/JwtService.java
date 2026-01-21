package gr.aueb.cf.restaurantmanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.security.secret-key}")
    private String secretKey;

    @Value("${app.security.jwt-expiration}")
    private long jwtExpiration;

    @Value("${app.security.jwt-refresh-expiration}")
    private long jwtRefreshExpiration;

    public String generateToken(String username, String role) {
        var claims = new HashMap<String, Object>();
        claims.put("role", role);
        return Jwts
                .builder()
                .issuer("restaurant-management-api")
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    public String generateRefreshToken(String username) {
        var claims = new HashMap<String, Object>();
        claims.put("type", "refresh");
        return Jwts
                .builder()
                .issuer("restaurant-management-api")
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtRefreshExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String subject = extractSubject(token);
        return (subject.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public String getStringClaim(String token, String claim) {
        return extractAllClaims(token).get(claim, String.class);
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        if (secretKey == null || secretKey.isBlank()) {
            throw new IllegalStateException(
                "JWT secret key is not configured. Set 'app.security.secret-key' property or JWT_SECRET_KEY environment variable."
            );
        }
        
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        
        if (keyBytes.length < 32) {
            throw new IllegalStateException(
                "JWT secret key must be at least 32 bytes long (256-bit). Current length: " + keyBytes.length + " bytes."
            );
        }
        
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsernameFromToken(String token) {
        return extractSubject(token);
    }

    public String getRoleFromToken(String token) {
        return getStringClaim(token, "role");
    }

    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }

        try {
            Jwts
                    .parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
