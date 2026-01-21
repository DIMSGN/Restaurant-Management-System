package gr.aueb.cf.restaurantmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequest {

    @NotBlank(message = "Recipe name is required")
    private String name;

    @Positive(message = "Sale price must be positive")
    private BigDecimal salePrice;

    private String description;

    @NotEmpty(message = "Ingredients are required")
    @Valid
    private List<RecipeIngredientRequest> ingredients;
}
