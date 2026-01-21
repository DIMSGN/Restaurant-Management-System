package gr.aueb.cf.restaurantmanagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "recipe_ingredients", indexes = {
    @Index(columnList = "recipe_id"),
    @Index(columnList = "product_id")
}, uniqueConstraints = {
    @UniqueConstraint(columnNames = {"recipe_id", "product_id"})
})
@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    public RecipeIngredient(Recipe recipe, Product product, BigDecimal amount) {
        this.recipe = recipe;
        this.product = product;
        this.amount = amount;
    }

    public String getUnit() {
        return product != null ? product.getUnit() : null;
    }

    @Override
    public String toString() {
        return "RecipeIngredient{" +
                "id=" + id +
                ", product=" + (product != null ? product.getName() : "null") +
                ", amount=" + amount +
                '}';
    }
}
