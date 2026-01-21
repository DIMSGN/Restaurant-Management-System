package gr.aueb.cf.restaurantmanagement.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, 
                       AccessDeniedException accessDeniedException) throws IOException {

        String uri = request.getRequestURI();
        String method = request.getMethod();
        
        log.warn("Access denied for user to request={}, method={}, message={}", 
                uri, method, accessDeniedException.getMessage());

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json; charset=UTF-8");

        String action = getActionDescription(method, uri);
        String requiredRole = getRequiredRole(method, uri);

        String json = String.format("""
            {
                "code": "UserNotAuthorized",
                "description": "Δεν έχετε δικαίωμα να %s",
                "action": "%s",
                "requiredRole": "%s",
                "message": "Μόνο χρήστες με ρόλο %s μπορούν να εκτελέσουν αυτή την ενέργεια. Επικοινωνήστε με τον διαχειριστή για δικαιώματα."
            }
            """, action, action, requiredRole, requiredRole);
        
        response.getWriter().write(json);
    }

    private String getActionDescription(String method, String uri) {
        if (uri.contains("/api/products")) {
            return switch (method) {
                case "POST" -> "δημιουργήσετε νέο προϊόν";
                case "PUT", "PATCH" -> "επεξεργαστείτε προϊόν";
                case "DELETE" -> "διαγράψετε προϊόν";
                default -> "τροποποιήσετε προϊόντα";
            };
        } else if (uri.contains("/api/recipes")) {
            return switch (method) {
                case "POST" -> "δημιουργήσετε νέα συνταγή";
                case "PUT", "PATCH" -> "επεξεργαστείτε συνταγή";
                case "DELETE" -> "διαγράψετε συνταγή";
                default -> "τροποποιήσετε συνταγές";
            };
        } else if (uri.contains("/api/users")) {
            return switch (method) {
                case "POST" -> "δημιουργήσετε χρήστη";
                case "PUT", "PATCH" -> "επεξεργαστείτε χρήστη";
                case "DELETE" -> "διαγράψετε χρήστη";
                default -> "διαχειριστείτε χρήστες";
            };
        }
        return "εκτελέσετε αυτή την ενέργεια";
    }

    private String getRequiredRole(String method, String uri) {
        if (method.equals("POST") || method.equals("PUT") || 
            method.equals("PATCH") || method.equals("DELETE")) {
            return "ADMIN";
        }
        return "Authenticated User";
    }
}
