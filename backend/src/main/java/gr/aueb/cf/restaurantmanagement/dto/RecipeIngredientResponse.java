package gr.aueb.cf.restaurantmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientResponse {
    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal amount;
    private String unit;
}
