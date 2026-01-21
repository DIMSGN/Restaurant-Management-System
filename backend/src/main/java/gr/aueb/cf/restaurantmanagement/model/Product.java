package gr.aueb.cf.restaurantmanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "products", indexes = {
    @Index(columnList = "category"),
    @Index(columnList = "name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Column(length = 255)
    private String category;

    @Column(name = "stock", precision = 10, scale = 2)
    private BigDecimal stock;

    @Column(name = "unit", length = 50)
    private String unit;

    @Column(name = "purchase_price", precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(name = "sale_price", precision = 10, scale = 2)
    private BigDecimal salePrice;

    public Product(String name, String category, BigDecimal stock, String unit, 
                   BigDecimal purchasePrice, BigDecimal salePrice) {
        this.name = name;
        this.category = category;
        this.stock = stock != null ? stock : BigDecimal.ZERO;
        this.unit = unit != null ? unit : "τεμ";
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
    }

    public static Product create(String name, String category, String unit,
                                  BigDecimal stock, BigDecimal purchasePrice, BigDecimal salePrice) {
        return new Product(name, category, stock, unit, purchasePrice, salePrice);
    }

    @PrePersist
    protected void initializeDefaults() {
        if (stock == null) stock = BigDecimal.ZERO;
        if (unit == null) unit = "τεμ";
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", stock=" + stock + " " + unit +
                '}';
    }
}
