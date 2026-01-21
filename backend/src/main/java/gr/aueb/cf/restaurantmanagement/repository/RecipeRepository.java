package gr.aueb.cf.restaurantmanagement.repository;

import gr.aueb.cf.restaurantmanagement.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Optional<Recipe> findByName(String name);
    
    @Query("SELECT DISTINCT r FROM Recipe r " +
           "LEFT JOIN FETCH r.ingredients i " +
           "LEFT JOIN FETCH i.product " +
           "ORDER BY r.name ASC")
    List<Recipe> findAllWithIngredientsEager();
    
    @Query(value = "SELECT r FROM Recipe r " +
                  "LEFT JOIN FETCH r.ingredients i " +
                  "LEFT JOIN FETCH i.product " +
                  "ORDER BY r.name ASC",
           countQuery = "SELECT COUNT(DISTINCT r) FROM Recipe r")
    Page<Recipe> findAllWithIngredientsEagerPaged(Pageable pageable);
    
    @Query("SELECT r FROM Recipe r " +
           "LEFT JOIN FETCH r.ingredients i " +
           "LEFT JOIN FETCH i.product " +
           "WHERE r.id = :id")
    Optional<Recipe> findByIdWithIngredientsEager(Long id);
}
