package gr.aueb.cf.restaurantmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponse {
    private Long id;
    private String name;
    private BigDecimal salePrice;
    private String description;
    private List<RecipeIngredientResponse> ingredients;
}
