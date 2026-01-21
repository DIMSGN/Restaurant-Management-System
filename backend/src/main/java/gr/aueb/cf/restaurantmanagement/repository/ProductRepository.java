package gr.aueb.cf.restaurantmanagement.repository;

import gr.aueb.cf.restaurantmanagement.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    
    @Query("SELECT p FROM Product p ORDER BY p.name ASC")
    List<Product> findAllOrderByName();
    
    @Query("SELECT p FROM Product p WHERE p.category = :category ORDER BY p.name ASC")
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE p.category = :category")
    Page<Product> findByCategoryPaged(String category, Pageable pageable);
}
