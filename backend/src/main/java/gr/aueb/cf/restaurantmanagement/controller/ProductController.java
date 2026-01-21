package gr.aueb.cf.restaurantmanagement.controller;

import gr.aueb.cf.restaurantmanagement.dto.ProductRequest;
import gr.aueb.cf.restaurantmanagement.dto.ProductResponse;
import gr.aueb.cf.restaurantmanagement.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Product management")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @Operation(summary = "Create product (Admin)")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        return new ResponseEntity<>(productService.createProduct(request), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/paged")
    @Operation(summary = "Get all products (paginated)")
    public ResponseEntity<Page<ProductResponse>> getAllProductsPaged(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProductsPaged(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update product (Admin)")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @PutMapping("/{id}/stock")
    @Operation(summary = "Update stock (Admin)")
    public ResponseEntity<ProductResponse> updateStock(@PathVariable Long id, @RequestParam BigDecimal quantity) {
        return ResponseEntity.ok(productService.updateStock(id, quantity));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product (Admin)")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
