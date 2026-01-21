package gr.aueb.cf.restaurantmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    private String category;
    private String unit;

    @Positive(message = "Stock must be positive")
    private BigDecimal stock;

    @Positive(message = "Purchase price must be positive")
    private BigDecimal purchasePrice;

    @Positive(message = "Sale price must be positive")
    private BigDecimal salePrice;
}
