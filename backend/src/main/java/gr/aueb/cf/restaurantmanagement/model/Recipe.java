package gr.aueb.cf.restaurantmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "recipes", indexes = {
    @Index(columnList = "name")
})
@Getter
@Setter
@NoArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Column(name = "sale_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal salePrice;

    @Lob
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecipeIngredient> ingredients = new ArrayList<>();

    public Recipe(String name, BigDecimal salePrice, String description) {
        this.name = name;
        this.salePrice = salePrice;
        this.description = description;
    }

    public static Recipe create(String name, BigDecimal salePrice, String description) {
        return new Recipe(name, salePrice, description);
    }

    public void addIngredient(Product product, BigDecimal amount) {
        if (product == null) {
            throw new IllegalArgumentException("Το product δεν μπορεί να είναι null");
        }
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Η ποσότητα πρέπει να είναι θετική");
        }

        boolean exists = ingredients.stream()
            .anyMatch(i -> i.getProduct().getId().equals(product.getId()));
        if (exists) {
            throw new IllegalArgumentException("Το προϊόν '" + product.getName() + "' υπάρχει ήδη στη συνταγή");
        }

        RecipeIngredient ingredient = new RecipeIngredient(this, product, amount);
        ingredients.add(ingredient);
    }

    public void removeIngredient(Long productId) {
        ingredients.removeIf(i -> i.getProduct().getId().equals(productId));
    }

    public List<RecipeIngredient> getAllIngredients() {
        return Collections.unmodifiableList(ingredients);
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salePrice=" + salePrice +
                ", ingredientCount=" + ingredients.size() +
                '}';
    }
}
