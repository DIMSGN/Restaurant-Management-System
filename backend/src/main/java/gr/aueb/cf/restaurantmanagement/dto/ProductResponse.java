package gr.aueb.cf.restaurantmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String category;
    private String unit;
    private BigDecimal stock;
    private BigDecimal purchasePrice;
    private BigDecimal salePrice;
}
