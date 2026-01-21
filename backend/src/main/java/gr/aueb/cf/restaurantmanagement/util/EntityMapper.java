package gr.aueb.cf.restaurantmanagement.util;

import gr.aueb.cf.restaurantmanagement.dto.*;
import gr.aueb.cf.restaurantmanagement.model.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
public class EntityMapper {

    public ProductResponse mapProductToResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getCategory(),
            product.getUnit(),
            product.getStock(),
            product.getPurchasePrice(),
            product.getSalePrice()
        );
    }

    public RecipeResponse mapRecipeToResponse(Recipe recipe) {
        return new RecipeResponse(
            recipe.getId(),
            recipe.getName(),
            recipe.getSalePrice(),
            recipe.getDescription(),
            recipe.getIngredients() != null 
                ? recipe.getIngredients().stream()
                    .map(this::mapIngredientToResponse)
                    .collect(Collectors.toList())
                : Collections.emptyList()
        );
    }

    public RecipeIngredientResponse mapIngredientToResponse(RecipeIngredient ingredient) {
        return new RecipeIngredientResponse(
            ingredient.getId(),
            ingredient.getProduct().getId(),
            ingredient.getProduct().getName(),
            ingredient.getAmount(),
            ingredient.getUnit()
        );
    }
}
