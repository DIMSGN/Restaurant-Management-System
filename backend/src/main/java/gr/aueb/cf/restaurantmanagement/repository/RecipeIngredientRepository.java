package gr.aueb.cf.restaurantmanagement.repository;

import gr.aueb.cf.restaurantmanagement.model.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    
    @Query("SELECT ri FROM RecipeIngredient ri " +
           "LEFT JOIN FETCH ri.product " +
           "WHERE ri.recipe.id = :recipeId " +
           "ORDER BY ri.id ASC")
    List<RecipeIngredient> findByRecipeIdWithProduct(Long recipeId);
    
    @Query("SELECT ri FROM RecipeIngredient ri WHERE ri.recipe.id = :recipeId")
    List<RecipeIngredient> findByRecipeId(Long recipeId);
}
